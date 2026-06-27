export async function zapsignSendDocument(
  token: string,
  documentName: string,
  pdfUrl: string,
  signers: Array<{ name: string; email: string; phone?: string }>
) {
  if (!token) {
    return {
      content: [{ type: "text" as const, text: "ZapSign não configurado. Acesse Configurações → Integrações para adicionar o token." }],
      isError: true,
    };
  }

  const body = {
    name: documentName,
    url_pdf: pdfUrl,
    signers: signers.map(s => ({
      name: s.name,
      email: s.email,
      ...(s.phone ? { phone_country: "55", phone_number: s.phone.replace(/\D/g, "") } : {}),
    })),
  };

  try {
    const res = await fetch("https://api.zapsign.com.br/api/v1/docs/", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      const err = await res.text();
      return {
        content: [{ type: "text" as const, text: `Erro ZapSign (${res.status}): ${err}` }],
        isError: true,
      };
    }

    const doc = await res.json() as any;
    const signerLinks = (doc.signers ?? [])
      .map((s: any) => `  • ${s.name} <${s.email}> — ${s.sign_url ?? "link não disponível"}`)
      .join("\n");

    return {
      content: [{
        type: "text" as const,
        text: [
          `✅ Documento enviado para assinatura`,
          `Nome: ${doc.name}`,
          `Token do documento: ${doc.token}`,
          `Status: ${doc.status}`,
          signerLinks ? `\nSignatários:\n${signerLinks}` : "",
        ].filter(Boolean).join("\n"),
      }],
    };
  } catch (err: any) {
    return {
      content: [{ type: "text" as const, text: `Erro ao chamar ZapSign: ${err.message}` }],
      isError: true,
    };
  }
}
