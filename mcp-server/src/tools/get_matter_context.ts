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

export async function getMatterContext(office: OfficeContext, matterId: string) {
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
    const [lawsuit, tasks, movements] = await Promise.all([
      advboxFetch(`/lawsuits/${encodeURIComponent(matterId)}`, office.advboxToken),
      advboxFetch(`/tasks?lawsuit=${encodeURIComponent(matterId)}`, office.advboxToken).catch(() => null),
      advboxFetch(`/movements?lawsuit=${encodeURIComponent(matterId)}`, office.advboxToken).catch(() => null),
    ]);

    const taskItems = tasks?.data ?? tasks ?? [];
    const movementItems = movements?.data ?? movements ?? [];

    const taskText = taskItems.slice(0, 5).map((item: any) => {
      return `- ${item.description ?? item.title ?? "tarefa"}${item.deadline ? ` | prazo: ${item.deadline}` : ""}${item.status ? ` | status: ${item.status}` : ""}`;
    }).join("\n");

    const movementText = movementItems.slice(0, 5).map((item: any) => {
      return `- ${item.description ?? item.name ?? "movimentacao"}${item.created_at ? ` | data: ${item.created_at}` : ""}`;
    }).join("\n");

    const data = lawsuit?.data ?? lawsuit;

    return {
      content: [{
        type: "text" as const,
        text: [
          `Contexto do caso ${matterId} no ADVBox:`,
          `Cliente: ${data?.customer?.name ?? data?.customer_name ?? "nao informado"}`,
          `Processo: ${data?.process_number ?? data?.number ?? "nao informado"}`,
          `Fase: ${data?.stage ?? "nao informada"}`,
          `Responsavel: ${data?.responsible?.name ?? data?.responsible_name ?? "nao informado"}`,
          "",
          "Tarefas:",
          taskText || "- nenhuma tarefa encontrada",
          "",
          "Movimentacoes:",
          movementText || "- nenhuma movimentacao encontrada",
        ].join("\n"),
      }],
    };
  } catch (error: any) {
    return {
      content: [{
        type: "text" as const,
        text: `Falha ao obter contexto do caso no ADVBox: ${error.message}`,
      }],
      isError: true,
    };
  }
}
