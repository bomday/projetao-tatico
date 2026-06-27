import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { OfficeContext } from "./db.js";
import { getCalendarEvents } from "./tools/get_calendar_events.js";
import { getCaseStatus } from "./tools/get_case_status.js";
import { getCompanyInfo } from "./tools/get_company_info.js";
import { getDriveDocumentContent } from "./tools/get_drive_document_content.js";
import { getMatterContext } from "./tools/get_matter_context.js";
import { listConnectedSources } from "./tools/list_connected_sources.js";
import { searchDriveDocuments } from "./tools/search_drive_documents.js";
import { searchMatters } from "./tools/search_matters.js";
import { zapsignCheckStatus } from "./tools/zapsign_check_status.js";
import { zapsignSendDocument } from "./tools/zapsign_send_document.js";
import { asaasCreateCharge } from "./tools/asaas_create_charge.js";
import { asaasGetPayment } from "./tools/asaas_get_payment.js";

export function registerTools(server: McpServer, office: OfficeContext) {
  server.tool(
    "list_connected_sources",
    "Lista quais fontes estao conectadas para este escritorio e quais capacidades o MCP pode usar.",
    {},
    async () => listConnectedSources(office)
  );

  server.tool(
    "get_calendar_events",
    "Consulta eventos do Google Calendar no periodo informado. Use para agenda, reunioes, audiencias e prioridades do dia.",
    {
      date_from: z.string().optional().describe("Data inicial no formato YYYY-MM-DD"),
      date_to: z.string().optional().describe("Data final no formato YYYY-MM-DD"),
      query: z.string().optional().describe("Filtro textual opcional"),
    },
    async ({ date_from, date_to, query }) => getCalendarEvents(office, date_from, date_to, query)
  );

  server.tool(
    "search_drive_documents",
    "Busca documentos no Google Drive por nome ou texto. Use para localizar contratos, pecas, PDFs e materiais do caso.",
    {
      query: z.string().describe("Termo de busca"),
      folder_id: z.string().optional().describe("ID da pasta, se quiser restringir a busca"),
      mime_type: z.string().optional().describe("Mime type opcional para filtrar"),
    },
    async ({ query, folder_id, mime_type }) => searchDriveDocuments(office, query, folder_id, mime_type)
  );

  server.tool(
    "get_drive_document_content",
    "Busca metadados e, quando possivel, extrai conteudo textual de um arquivo do Google Drive.",
    {
      file_id: z.string().describe("ID do arquivo no Google Drive"),
    },
    async ({ file_id }) => getDriveDocumentContent(office, file_id)
  );

  server.tool(
    "search_matters",
    "Busca clientes, processos ou assuntos na principal ferramenta juridica conectada ao escritorio.",
    {
      query: z.string().describe("Termo de busca para cliente, processo ou assunto"),
    },
    async ({ query }) => searchMatters(office, query)
  );

  server.tool(
    "get_matter_context",
    "Retorna contexto operacional de um caso diretamente da fonte juridica conectada, incluindo tarefas e movimentacoes quando disponiveis.",
    {
      matter_id: z.string().describe("ID do caso ou processo na ferramenta conectada"),
    },
    async ({ matter_id }) => getMatterContext(office, matter_id)
  );

  server.tool(
    "get_company_info",
    "Busca dados cadastrais de empresa pelo CNPJ via BrasilAPI.",
    {
      cnpj: z.string().describe("CNPJ com ou sem pontuacao"),
    },
    async ({ cnpj }) => getCompanyInfo(cnpj)
  );

  server.tool(
    "get_case_status",
    "Busca andamento processual publico pelo numero CNJ. Usa DataJud como fonte principal e Escavador como fallback quando configurado.",
    {
      numero_processo: z.string().describe("Numero do processo no formato CNJ"),
    },
    async ({ numero_processo }) => getCaseStatus(numero_processo, office.officeId)
  );

  server.tool(
    "zapsign_send_document",
    "Envia um documento PDF para assinatura eletrônica via ZapSign.",
    {
      document_name: z.string().describe("Nome do documento"),
      pdf_url: z.string().describe("URL publica do PDF"),
      signers: z.array(z.object({
        name: z.string(),
        email: z.string(),
        phone: z.string().optional(),
      })),
    },
    async ({ document_name, pdf_url, signers }) =>
      zapsignSendDocument(office.zapsignToken ?? "", document_name, pdf_url, signers)
  );

  server.tool(
    "zapsign_check_status",
    "Consulta o status de um documento enviado ao ZapSign.",
    {
      document_token: z.string().describe("Token do documento no ZapSign"),
    },
    async ({ document_token }) => zapsignCheckStatus(office.zapsignToken ?? "", document_token)
  );

  server.tool(
    "asaas_create_charge",
    "Cria uma cobranca de honorarios via Asaas.",
    {
      customer_name: z.string(),
      customer_cpf_cnpj: z.string(),
      value: z.number(),
      due_date: z.string(),
      billing_type: z.enum(["PIX", "BOLETO"]),
      description: z.string().optional(),
      customer_email: z.string().optional(),
    },
    async ({ customer_name, customer_cpf_cnpj, value, due_date, billing_type, description, customer_email }) =>
      asaasCreateCharge(
        office.asaasToken ?? "",
        customer_name,
        customer_cpf_cnpj,
        value,
        due_date,
        billing_type,
        description,
        customer_email
      )
  );

  server.tool(
    "asaas_get_payment",
    "Consulta o status de uma cobranca Asaas.",
    {
      payment_id: z.string(),
    },
    async ({ payment_id }) => asaasGetPayment(office.asaasToken ?? "", payment_id)
  );
}
