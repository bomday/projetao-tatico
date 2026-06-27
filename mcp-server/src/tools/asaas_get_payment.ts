const BASE = "https://api.asaas.com/v3";

const STATUS_PT: Record<string, string> = {
  PENDING: "Pendente",
  RECEIVED: "Recebido",
  CONFIRMED: "Confirmado",
  OVERDUE: "Vencido",
  REFUNDED: "Estornado",
  RECEIVED_IN_CASH: "Recebido em dinheiro",
  REFUND_REQUESTED: "Estorno solicitado",
  CHARGEBACK_REQUESTED: "Chargeback solicitado",
  CHARGEBACK_DISPUTE: "Disputa de chargeback",
  DUNNING_REQUESTED: "Negativação solicitada",
  DUNNING_RECEIVED: "Negativação recebida",
  AWAITING_RISK_ANALYSIS: "Aguardando análise de risco",
};

export async function asaasGetPayment(apiKey: string, paymentId: string) {
  if (!apiKey) {
    return {
      content: [{ type: "text" as const, text: "Asaas não configurado. Acesse Configurações → Integrações para adicionar a chave da API." }],
      isError: true,
    };
  }

  try {
    const res = await fetch(`${BASE}/payments/${paymentId}`, {
      headers: { "access_token": apiKey },
      signal: AbortSignal.timeout(8000),
    });

    if (res.status === 404) {
      return { content: [{ type: "text" as const, text: `Cobrança ${paymentId} não encontrada no Asaas.` }] };
    }
    if (!res.ok) {
      return {
        content: [{ type: "text" as const, text: `Erro Asaas (${res.status}): ${await res.text()}` }],
        isError: true,
      };
    }

    const p = await res.json() as any;
    const statusPt = STATUS_PT[p.status] ?? p.status;
    const vencimento = p.dueDate ? new Date(p.dueDate + "T12:00:00").toLocaleDateString("pt-BR") : "—";
    const pagamento = p.paymentDate ? new Date(p.paymentDate + "T12:00:00").toLocaleDateString("pt-BR") : null;

    const lines = [
      `💰 Cobrança ${p.id}`,
      `Status: ${statusPt}`,
      `Valor: R$ ${Number(p.value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
      `Vencimento: ${vencimento}`,
      pagamento ? `Pago em: ${pagamento}` : "",
      p.description ? `Descrição: ${p.description}` : "",
      p.invoiceUrl ? `Link: ${p.invoiceUrl}` : "",
    ].filter(Boolean);

    return { content: [{ type: "text" as const, text: lines.join("\n") }] };
  } catch (err: any) {
    return {
      content: [{ type: "text" as const, text: `Erro ao consultar Asaas: ${err.message}` }],
      isError: true,
    };
  }
}
