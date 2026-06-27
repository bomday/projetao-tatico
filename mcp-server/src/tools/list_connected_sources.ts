import type { OfficeContext } from "../db.js";

export async function listConnectedSources(office: OfficeContext) {
  const sources = [
    {
      id: "google_calendar",
      connected: Boolean(office.googleCalendarAccessToken),
      capabilities: ["read_events"],
      details: office.googleCalendarAccessToken ? `calendar_id=${office.googleCalendarId ?? "primary"}` : "token nao configurado",
    },
    {
      id: "google_drive",
      connected: Boolean(office.googleDriveAccessToken),
      capabilities: ["search_documents", "read_document_content"],
      details: office.googleDriveAccessToken
        ? office.googleDriveRootFolderId ? `root_folder_id=${office.googleDriveRootFolderId}` : "sem pasta raiz especifica"
        : "token nao configurado",
    },
    {
      id: "advbox",
      connected: Boolean(office.advboxToken),
      capabilities: ["search_matters", "read_matter_context"],
      details: office.advboxToken ? "token configurado" : "token nao configurado",
    },
    {
      id: "escavador",
      connected: Boolean(office.escavadorToken),
      capabilities: ["public_case_fallback"],
      details: office.escavadorToken ? "token configurado" : "opcional - nao configurado",
    },
    {
      id: "brasilapi_cnpj",
      connected: true,
      capabilities: ["company_info"],
      details: "fonte publica sem autenticacao",
    },
    {
      id: "datajud",
      connected: true,
      capabilities: ["public_case_status"],
      details: "fonte publica para consulta processual",
    },
  ];

  const text = sources.map((source) => {
    const status = source.connected ? "conectado" : "nao conectado";
    return [
      `- ${source.id}: ${status}`,
      `  capacidades: ${source.capabilities.join(", ")}`,
      `  detalhes: ${source.details}`,
    ].join("\n");
  }).join("\n");

  return {
    content: [{
      type: "text" as const,
      text: `Fontes disponiveis para este escritorio:\n\n${text}`,
    }],
  };
}
