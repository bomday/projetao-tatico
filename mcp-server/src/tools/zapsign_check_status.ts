const STATUS_PT: Record<string, string> = {
  draft: "Rascunho",
  pending: "Aguardando assinatura",
  signed: "Assinado",
  refused: "Recusado",
  canceled: "Cancelado",
};

const SIGNER_STATUS_PT: Record<string, string> = {
  pending: "Pendente",
  signed: "Assinou",
  refused: "Recusou",
};

export async function zapsignCheckStatus(token: string, documentToken: string) {
  if (!token) {
    return {
      content: [{ type: "text" as const, text: "ZapSign não configurado. Acesse Configurações → Integrações para adicionar o token." }],
      isError: true,
    };
  }

  try {
    const res = await fetch(`https://api.zapsign.com.br/api/v1/docs/${documentToken}/`, {
      headers: { "Authorization": `Bearer ${token}` },
      signal: AbortSignal.timeout(8000),
    });

    if (res.status === 404) {
      return { content: [{ type: "text" as const, text: `Documento ${documentToken} não encontrado no ZapSign.` }] };
    }
    if (!res.ok) {
      return {
        content: [{ type: "text" as const, text: `Erro ZapSign (${res.status}): ${await res.text()}` }],
        isError: true,
      };
    }

    const doc = await res.json() as any;
    const statusPt = STATUS_PT[doc.status] ?? doc.status;

    const signerLines = (doc.signers ?? []).map((s: any) => {
      const st = SIGNER_STATUS_PT[s.status] ?? s.status;
      const date = s.signed_at ? ` em ${new Date(s.signed_at).toLocaleDateString("pt-BR")}` : "";
      return `  • ${s.name} <${s.email}> — ${st}${date}`;
    }).join("\n");

    return {
      content: [{
        type: "text" as const,
        text: [
          `📄 ${doc.name}`,
          `Status: ${statusPt}`,
          `Criado em: ${new Date(doc.created_at).toLocaleDateString("pt-BR")}`,
          signerLines ? `\nSignatários:\n${signerLines}` : "",
        ].filter(Boolean).join("\n"),
      }],
    };
  } catch (err: any) {
    return {
      content: [{ type: "text" as const, text: `Erro ao consultar ZapSign: ${err.message}` }],
      isError: true,
    };
  }
}
