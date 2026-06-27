const BASE = "https://api.asaas.com/v3";

const BILLING_PT: Record<string, string> = {
  BOLETO: "Boleto",
  PIX: "PIX",
  CREDIT_CARD: "Cartão de crédito",
};

async function asaasFetch(apiKey: string, path: string, options?: RequestInit) {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "access_token": apiKey,
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    signal: AbortSignal.timeout(10000),
  });
  return res;
}

async function findOrCreateCustomer(
  apiKey: string,
  name: string,
  cpfCnpj: string,
  email?: string
): Promise<{ id: string } | { error: string }> {
  const clean = cpfCnpj.replace(/\D/g, "");

  // try to find existing customer
  const search = await asaasFetch(apiKey, `/customers?cpfCnpj=${clean}&limit=1`);
  if (search.ok) {
    const data = await search.json() as any;
    if (data.data?.length > 0) return { id: data.data[0].id };
  }

  // create new customer
  const body: any = { name, cpfCnpj: clean };
  if (email) body.email = email;

  const create = await asaasFetch(apiKey, "/customers", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!create.ok) {
    const err = await create.text();
    return { error: `Erro ao criar cliente Asaas (${create.status}): ${err}` };
  }

  const customer = await create.json() as any;
  return { id: customer.id };
}

export async function asaasCreateCharge(
  apiKey: string,
  customerName: string,
  customerCpfCnpj: string,
  value: number,
  dueDate: string,
  billingType: "PIX" | "BOLETO",
  description?: string,
  customerEmail?: string
) {
  if (!apiKey) {
    return {
      content: [{ type: "text" as const, text: "Asaas não configurado. Acesse Configurações → Integrações para adicionar a chave da API." }],
      isError: true,
    };
  }

  try {
    const customerResult = await findOrCreateCustomer(apiKey, customerName, customerCpfCnpj, customerEmail);
    if ("error" in customerResult) {
      return { content: [{ type: "text" as const, text: customerResult.error }], isError: true };
    }

    const body: any = {
      customer: customerResult.id,
      billingType,
      value,
      dueDate,
    };
    if (description) body.description = description;

    const res = await asaasFetch(apiKey, "/payments", {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      return { content: [{ type: "text" as const, text: `Erro Asaas (${res.status}): ${err}` }], isError: true };
    }

    const payment = await res.json() as any;
    const billingPt = BILLING_PT[billingType] ?? billingType;

    const lines = [
      `💳 Cobrança criada — ${billingPt}`,
      `ID: ${payment.id}`,
      `Cliente: ${customerName}`,
      `Valor: R$ ${Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
      `Vencimento: ${new Date(dueDate + "T12:00:00").toLocaleDateString("pt-BR")}`,
      `Status: ${payment.status}`,
    ];

    if (billingType === "PIX" && payment.pixQrCodeUrl) {
      lines.push(`QR Code PIX: ${payment.pixQrCodeUrl}`);
    }
    if (billingType === "BOLETO" && payment.bankSlipUrl) {
      lines.push(`Boleto: ${payment.bankSlipUrl}`);
    }
    if (payment.invoiceUrl) {
      lines.push(`Link de pagamento: ${payment.invoiceUrl}`);
    }

    return { content: [{ type: "text" as const, text: lines.join("\n") }] };
  } catch (err: any) {
    return {
      content: [{ type: "text" as const, text: `Erro ao chamar Asaas: ${err.message}` }],
      isError: true,
    };
  }
}
