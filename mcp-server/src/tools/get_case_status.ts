import { dbSelectOne } from "../db.js";

const DATAJUD_BASE = "https://api-publica.datajud.cnj.jus.br";
const DATAJUD_KEY = "APIKey cDZHYzlZa0JadVREZDJCendQbXY6SkJlTzNjLV9TRENyQk1RdnFKZGRQdw==";

const TJ_SIGLA: Record<string, string> = {
  "01": "tjac", "02": "tjal", "03": "tjap", "04": "tjam", "05": "tjba",
  "06": "tjce", "07": "tjdf", "08": "tjes", "09": "tjgo", "10": "tjma",
  "11": "tjmt", "12": "tjms", "13": "tjmg", "14": "tjpa", "15": "tjpb",
  "16": "tjpr", "17": "tjpe", "18": "tjpi", "19": "tjrj", "20": "tjrn",
  "21": "tjrs", "22": "tjro", "23": "tjrr", "24": "tjsc", "25": "tjse",
  "26": "tjsp", "27": "tjto",
};

function parseCNJ(numero: string): { tribunal: string; numeroLimpo: string } {
  const limpo = numero.replace(/[.\-]/g, "");
  const match = numero.match(/^(\d{7})-(\d{2})\.(\d{4})\.(\d)\.(\d{2})\.(\d{4})$/);
  if (!match) throw new Error(`Número CNJ inválido. Use: NNNNNNN-DD.AAAA.J.TT.OOOO`);

  const [, , , , j, tt] = match;
  let tribunal: string;

  if (j === "8") tribunal = TJ_SIGLA[tt] ?? "tjsp";
  else if (j === "6") tribunal = `trt${parseInt(tt)}`;
  else if (j === "5") tribunal = `trf${parseInt(tt)}`;
  else if (j === "7") tribunal = `tre-${tt}`;
  else if (j === "2") tribunal = "stj";
  else if (j === "3") tribunal = "tst";
  else if (j === "4") tribunal = "tse";
  else if (j === "1") throw new Error("STF não está no DataJud. Configure o token Escavador nas configurações.");
  else throw new Error(`Ramo do judiciário não reconhecido (J=${j}).`);

  return { tribunal, numeroLimpo: limpo };
}

export async function getCaseStatus(numeroProcesso: string, officeId: string) {
  try {
    const { tribunal, numeroLimpo } = parseCNJ(numeroProcesso);

    const res = await fetch(`${DATAJUD_BASE}/api_publica_${tribunal}/_search`, {
      method: "POST",
      headers: { "Authorization": DATAJUD_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ query: { match: { numeroProcesso: numeroLimpo } } }),
      signal: AbortSignal.timeout(10000),
    });

    if (res.ok) {
      const json = await res.json() as any;
      const processo = json.hits?.hits?.[0]?._source;

      if (processo) {
        const movs = (processo.movimentos ?? [])
          .slice(0, 5)
          .map((m: any) => `  ${m.dataHora?.slice(0, 10) ?? "?"} — ${m.nome}`)
          .join("\n");

        return {
          content: [{
            type: "text" as const,
            text: [
              `📋 Processo ${processo.numeroProcesso}`,
              `🏛️  Tribunal: ${processo.tribunal ?? tribunal.toUpperCase()}`,
              `⚖️  Classe: ${processo.classe?.nome ?? "não informada"}`,
              `📍 Órgão: ${processo.orgaoJulgador?.nome ?? "não informado"}`,
              `📅 Ajuizamento: ${processo.dataAjuizamento ?? "não informado"}`,
              `🔄 Última atualização: ${processo.dataHoraUltimaAtualizacao?.slice(0, 10) ?? "?"}`,
              `\nÚltimas movimentações:\n${movs || "  Nenhuma movimentação registrada."}`,
              `\n📡 Fonte: DataJud CNJ (dados públicos)`,
            ].join("\n"),
          }],
        };
      }
    }

    const office = await dbSelectOne<any>(
      "offices",
      `?id=eq.${officeId}&select=escavador_token`
    );

    if (!office?.escavador_token) {
      return {
        content: [{
          type: "text" as const,
          text: `Processo não encontrado no DataJud (${tribunal.toUpperCase()}). Para cobertura do STF e dados mais ricos, configure o token Escavador nas configurações do TÁTICO.`,
        }],
      };
    }

    const esc = await fetch(
      `https://api.escavador.com/api/v2/processos/numero_cnj/${encodeURIComponent(numeroProcesso)}`,
      {
        headers: { "Authorization": `Bearer ${office.escavador_token}` },
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!esc.ok) throw new Error(`Escavador: ${esc.status}`);
    const escData = await esc.json();

    return {
      content: [{ type: "text" as const, text: JSON.stringify(escData, null, 2) + "\n\n📡 Fonte: Escavador API" }],
    };

  } catch (err: any) {
    return {
      content: [{ type: "text" as const, text: `Erro ao consultar processo: ${err.message}` }],
      isError: true,
    };
  }
}
