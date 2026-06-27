import type { OfficeContext } from "../db.js";
import { googleFetch } from "../db.js";

function buildTimeRange(dateFrom?: string, dateTo?: string) {
  const start = dateFrom ? new Date(`${dateFrom}T00:00:00Z`) : new Date();
  const end = dateTo ? new Date(`${dateTo}T23:59:59Z`) : new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000);
  return { start: start.toISOString(), end: end.toISOString() };
}

export async function getCalendarEvents(
  office: OfficeContext,
  dateFrom?: string,
  dateTo?: string,
  query?: string
) {
  if (!office.googleCalendarAccessToken) {
    return {
      content: [{
        type: "text" as const,
        text: "Google Calendar nao conectado. Configure um access token nas integracoes do TATICO.",
      }],
      isError: true,
    };
  }

  const { start, end } = buildTimeRange(dateFrom, dateTo);
  const calendarId = encodeURIComponent(office.googleCalendarId ?? "primary");
  const params = new URLSearchParams({
    singleEvents: "true",
    orderBy: "startTime",
    timeMin: start,
    timeMax: end,
    maxResults: "20",
  });

  if (query) params.set("q", query);

  const res = await googleFetch(
    office,
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?${params.toString()}`,
    {},
    "calendar"
  );

  if (!res.ok) {
    return {
      content: [{
        type: "text" as const,
        text: `Falha ao consultar Google Calendar: ${res.status}. Verifique token e permissoes.`,
      }],
      isError: true,
    };
  }

  const data = await res.json() as any;
  const items = (data.items ?? []) as any[];

  if (items.length === 0) {
    return {
      content: [{
        type: "text" as const,
        text: "Nenhum evento encontrado no periodo informado.",
      }],
    };
  }

  const text = items.map((item) => {
    const startValue = item.start?.dateTime ?? item.start?.date ?? "?";
    const endValue = item.end?.dateTime ?? item.end?.date ?? "?";
    const attendees = (item.attendees ?? []).map((a: any) => a.email).slice(0, 5).join(", ");
    return [
      `- ${item.summary ?? "Sem titulo"}`,
      `  inicio: ${startValue}`,
      `  fim: ${endValue}`,
      item.description ? `  descricao: ${String(item.description).slice(0, 240)}` : "",
      attendees ? `  participantes: ${attendees}` : "",
    ].filter(Boolean).join("\n");
  }).join("\n\n");

  return {
    content: [{
      type: "text" as const,
      text: `Eventos encontrados no Google Calendar:\n\n${text}`,
    }],
  };
}
