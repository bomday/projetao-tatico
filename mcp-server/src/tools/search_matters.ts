import type { OfficeContext } from "../db.js";

async function advboxFetch(path: string, token: string) {
  const res = await fetch(`https://app.advbox.com.br/api/v1${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error(`ADVBox ${res.status}`);
  return res.json() as Promise<any>;
}

export async function searchMatters(office: OfficeContext, query: string) {
  if (!office.advboxToken) {
    return {
      content: [{
        type: "text" as const,
        text: "ADVBox nao conectado. Configure um token nas integracoes do TATICO.",
      }],
      isError: true,
    };
  }

  try {
    const [customers, lawsuits] = await Promise.all([
      advboxFetch(`/customers?search=${encodeURIComponent(query)}`, office.advboxToken),
      advboxFetch(`/lawsuits?search=${encodeURIComponent(query)}`, office.advboxToken),
    ]);

    const customerItems = customers?.data ?? customers ?? [];
    const lawsuitItems = lawsuits?.data ?? lawsuits ?? [];

    const customerText = customerItems.slice(0, 5).map((item: any) =>
      `- cliente: ${item.name ?? item.full_name ?? "?"} | id: ${item.id ?? "?"}`
    ).join("\n");

    const lawsuitText = lawsuitItems.slice(0, 5).map((item: any) =>
      `- processo: ${item.process_number ?? item.number ?? "?"} | id: ${item.id ?? "?"} | fase: ${item.stage ?? "?"}`
    ).join("\n");

    return {
      content: [{
        type: "text" as const,
        text: [
          `Resultados do ADVBox para "${query}":`,
          "",
          "Clientes:",
          customerText || "- nenhum cliente encontrado",
          "",
          "Processos:",
          lawsuitText || "- nenhum processo encontrado",
        ].join("\n"),
      }],
    };
  } catch (error: any) {
    return {
      content: [{
        type: "text" as const,
        text: `Falha ao consultar ADVBox: ${error.message}`,
      }],
      isError: true,
    };
  }
}
