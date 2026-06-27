import type { OfficeContext } from "../db.js";
import { googleFetch } from "../db.js";

export async function searchDriveDocuments(
  office: OfficeContext,
  query: string,
  folderId?: string,
  mimeType?: string
) {
  if (!office.googleDriveAccessToken) {
    return {
      content: [{
        type: "text" as const,
        text: "Google Drive nao conectado. Configure um access token nas integracoes do TATICO.",
      }],
      isError: true,
    };
  }

  const clauses = ["trashed = false"];
  if (query) clauses.push(`fullText contains '${query.replace(/'/g, "\\'")}'`);
  if (folderId || office.googleDriveRootFolderId) clauses.push(`'${folderId ?? office.googleDriveRootFolderId}' in parents`);
  if (mimeType) clauses.push(`mimeType = '${mimeType}'`);

  const params = new URLSearchParams({
    q: clauses.join(" and "),
    pageSize: "15",
    fields: "files(id,name,mimeType,webViewLink,modifiedTime,parents)",
    supportsAllDrives: "true",
    includeItemsFromAllDrives: "true",
  });

  const res = await googleFetch(
    office,
    `https://www.googleapis.com/drive/v3/files?${params.toString()}`,
    {},
    "drive"
  );

  if (!res.ok) {
    return {
      content: [{
        type: "text" as const,
        text: `Falha ao consultar Google Drive: ${res.status}. Verifique token e permissoes.`,
      }],
      isError: true,
    };
  }

  const data = await res.json() as any;
  const files = (data.files ?? []) as any[];

  if (files.length === 0) {
    return {
      content: [{
        type: "text" as const,
        text: `Nenhum documento encontrado para "${query}".`,
      }],
    };
  }

  const text = files.map((file) => [
    `- ${file.name}`,
    `  id: ${file.id}`,
    `  tipo: ${file.mimeType}`,
    `  modificado em: ${file.modifiedTime ?? "?"}`,
    file.webViewLink ? `  link: ${file.webViewLink}` : "",
  ].filter(Boolean).join("\n")).join("\n\n");

  return {
    content: [{
      type: "text" as const,
      text: `Documentos encontrados no Google Drive:\n\n${text}`,
    }],
  };
}
