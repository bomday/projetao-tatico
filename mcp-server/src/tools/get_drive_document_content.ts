import type { OfficeContext } from "../db.js";
import { googleFetch } from "../db.js";

async function fetchMetadata(office: OfficeContext, fileId: string) {
  const params = new URLSearchParams({
    fields: "id,name,mimeType,webViewLink,modifiedTime,size",
    supportsAllDrives: "true",
  });

  const res = await googleFetch(
    office,
    `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}?${params.toString()}`,
    {},
    "drive"
  );

  if (!res.ok) throw new Error(`metadata ${res.status}`);
  return res.json() as Promise<any>;
}

export async function getDriveDocumentContent(office: OfficeContext, fileId: string) {
  if (!office.googleDriveAccessToken) {
    return {
      content: [{
        type: "text" as const,
        text: "Google Drive nao conectado. Configure um access token nas integracoes do TATICO.",
      }],
      isError: true,
    };
  }

  try {
    const metadata = await fetchMetadata(office, fileId);
    let contentPreview = "";

    if (metadata.mimeType === "application/vnd.google-apps.document") {
      const exportRes = await googleFetch(
        office,
        `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}/export?mimeType=text/plain`,
        {},
        "drive"
      );
      if (exportRes.ok) contentPreview = (await exportRes.text()).slice(0, 4000);
    } else if (String(metadata.mimeType ?? "").startsWith("text/")) {
      const rawRes = await googleFetch(
        office,
        `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}?alt=media`,
        {},
        "drive"
      );
      if (rawRes.ok) contentPreview = (await rawRes.text()).slice(0, 4000);
    }

    const text = [
      `Arquivo: ${metadata.name}`,
      `ID: ${metadata.id}`,
      `Tipo: ${metadata.mimeType}`,
      `Modificado em: ${metadata.modifiedTime ?? "?"}`,
      metadata.webViewLink ? `Link: ${metadata.webViewLink}` : "",
      "",
      contentPreview
        ? `Conteudo extraido:\n${contentPreview}`
        : "Conteudo textual nao disponivel para extracao automatica neste tipo de arquivo. Use o link para abrir o arquivo original.",
    ].filter(Boolean).join("\n");

    return {
      content: [{
        type: "text" as const,
        text,
      }],
    };
  } catch (error: any) {
    return {
      content: [{
        type: "text" as const,
        text: `Falha ao obter documento do Google Drive: ${error.message}`,
      }],
      isError: true,
    };
  }
}
