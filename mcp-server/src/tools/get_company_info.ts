export async function getCompanyInfo(cnpj: string) {
  const clean = cnpj.replace(/\D/g, "");

  if (clean.length !== 14) {
    return {
      content: [{ type: "text" as const, text: "CNPJ inválido — informe 14 dígitos (com ou sem pontuação)." }],
      isError: true,
    };
  }

  try {
    const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${clean}`, {
      headers: { "Accept": "application/json" },
      signal: AbortSignal.timeout(8000),
    });

    if (res.status === 404) {
      return { content: [{ type: "text" as const, text: `CNPJ ${cnpj} não encontrado na base da Receita Federal.` }] };
    }

    if (!res.ok) {
      return { content: [{ type: "text" as const, text: `Erro ao consultar CNPJ (${res.status}). Tente novamente.` }] };
    }

    const d = await res.json() as any;

    const socios = (d.qsa ?? []).map((s: any) => `  • ${s.nome_socio} (${s.qualificacao_socio})`).join("\n");

    return {
      content: [{
        type: "text" as const,
        text: [
          `🏢 ${d.razao_social}`,
          `CNPJ: ${d.cnpj}`,
          `Situação: ${d.descricao_situacao_cadastral}`,
          `Porte: ${d.porte ?? "não informado"}`,
          `Natureza Jurídica: ${d.natureza_juridica}`,
          `Atividade Principal: ${d.cnae_fiscal_descricao}`,
          `Endereço: ${d.logradouro}, ${d.numero}${d.complemento ? " " + d.complemento : ""} — ${d.municipio}/${d.uf}`,
          `Telefone: ${d.ddd_telefone_1 ? "(" + d.ddd_telefone_1 + ") " + d.telefone_1 : "não informado"}`,
          `E-mail: ${d.email ?? "não informado"}`,
          `Capital Social: R$ ${Number(d.capital_social ?? 0).toLocaleString("pt-BR")}`,
          `Optante SIMPLES: ${d.opcao_pelo_simples ? "Sim" : "Não"}`,
          d.qsa?.length ? `\nSócios:\n${socios}` : "",
        ].filter(Boolean).join("\n"),
      }],
    };
  } catch (err: any) {
    return {
      content: [{ type: "text" as const, text: `Erro ao consultar BrasilAPI: ${err.message}` }],
      isError: true,
    };
  }
}
