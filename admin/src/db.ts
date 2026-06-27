const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY!;

export type OfficeRecord = {
  id: string;
  name: string;
  owner_id: string;
  api_key: string;
  google_calendar_access_token: string | null;
  google_calendar_refresh_token: string | null;
  google_calendar_id: string | null;
  google_drive_access_token: string | null;
  google_drive_refresh_token: string | null;
  google_drive_root_folder_id: string | null;
  advbox_token: string | null;
  escavador_token: string | null;
  zapsign_token: string | null;
  asaas_token: string | null;
  last_used_at: string | null;
  request_count: number;
  created_at: string;
  updated_at: string;
};

function serviceHeaders() {
  return {
    apikey: SUPABASE_SERVICE_KEY,
    Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };
}

export function getIntegrationStatuses(office: Partial<OfficeRecord>) {
  return [
    {
      id: "google_calendar",
      name: "Google Calendar",
      connected: Boolean(office.google_calendar_access_token),
      summary: office.google_calendar_access_token
        ? `Calendario ${office.google_calendar_id ?? "primary"} conectado`
        : "Sem token configurado",
    },
    {
      id: "google_drive",
      name: "Google Drive",
      connected: Boolean(office.google_drive_access_token),
      summary: office.google_drive_access_token
        ? `Drive conectado${office.google_drive_root_folder_id ? " com pasta raiz configurada" : ""}`
        : "Sem token configurado",
    },
    {
      id: "advbox",
      name: "ADVBox",
      connected: Boolean(office.advbox_token),
      summary: office.advbox_token ? "Token ADVBox configurado" : "Sem token configurado",
    },
    {
      id: "escavador",
      name: "Escavador",
      connected: Boolean(office.escavador_token),
      summary: office.escavador_token ? "Token Escavador configurado" : "Opcional - nao configurado",
    },
    {
      id: "zapsign",
      name: "ZapSign",
      connected: Boolean(office.zapsign_token),
      summary: office.zapsign_token ? "Token ZapSign configurado" : "Opcional - nao configurado",
    },
    {
      id: "asaas",
      name: "Asaas",
      connected: Boolean(office.asaas_token),
      summary: office.asaas_token ? "Token Asaas configurado" : "Opcional - nao configurado",
    },
  ];
}

export function getConnectedSources(office: Partial<OfficeRecord>) {
  return getIntegrationStatuses(office).filter((item) => item.connected);
}

export async function signIn(email: string, password: string) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: SUPABASE_ANON_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json() as any;
  if (!res.ok) return { error: data.error_description ?? data.msg ?? "Erro ao entrar" };
  return { token: data.access_token as string, userId: data.user.id as string };
}

export async function signUp(email: string, password: string) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: "POST",
    headers: { apikey: SUPABASE_ANON_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json() as any;
  if (!res.ok) return { error: data.error_description ?? data.msg ?? "Erro ao cadastrar" };

  const userId = (data.user?.id ?? data.id) as string;
  const token = (data.access_token ?? null) as string | null;
  return { token, userId };
}

export async function getUserFromToken(token: string) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  return res.json() as Promise<{ id: string; email: string }>;
}

async function dbFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: { ...serviceHeaders(), ...(options?.headers ?? {}) },
  });
  if (!res.ok) throw new Error(`DB error: ${res.status} ${await res.text()}`);
  return res.json();
}

export async function getOfficeByOwner(userId: string) {
  const rows = await dbFetch<OfficeRecord[]>(`offices?owner_id=eq.${userId}&select=*`);
  return rows[0] ?? null;
}

export async function createOffice(name: string, userId: string) {
  const rows = await dbFetch<OfficeRecord[]>("offices", {
    method: "POST",
    body: JSON.stringify({ name, owner_id: userId }),
  });
  return Array.isArray(rows) ? rows[0] : rows;
}

export async function saveIntegrations(
  officeId: string,
  payload: Partial<OfficeRecord>
) {
  return dbFetch<OfficeRecord[]>(`offices?id=eq.${officeId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function rpcRegenerateKey(officeId: string): Promise<string> {
  return dbFetch<string>("rpc/regenerate_api_key", {
    method: "POST",
    body: JSON.stringify({ office_id_input: officeId }),
  });
}
