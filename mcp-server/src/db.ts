const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!;

export type OfficeContext = {
  officeId: string;
  googleCalendarAccessToken: string | null;
  googleCalendarRefreshToken: string | null;
  googleCalendarId: string | null;
  googleDriveAccessToken: string | null;
  googleDriveRefreshToken: string | null;
  googleDriveRootFolderId: string | null;
  advboxToken: string | null;
  escavadorToken: string | null;
  zapsignToken: string | null;
  asaasToken: string | null;
};

function serviceHeaders() {
  return {
    apikey: SUPABASE_SERVICE_KEY,
    Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };
}

export async function dbSelect<T>(table: string, query = ""): Promise<T[]> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}${query}`, {
    headers: serviceHeaders(),
  });
  if (!res.ok) throw new Error(`DB select error on ${table}: ${res.status} ${await res.text()}`);
  return res.json();
}

export async function dbSelectOne<T>(table: string, query = ""): Promise<T | null> {
  const rows = await dbSelect<T>(table, query);
  return rows[0] ?? null;
}

export async function dbInsert<T>(table: string, data: object): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: serviceHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`DB insert error on ${table}: ${res.status} ${await res.text()}`);
  const result = await res.json();
  return Array.isArray(result) ? result[0] : result;
}

export async function dbUpdate(table: string, filters: string, data: object): Promise<void> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${filters}`, {
    method: "PATCH",
    headers: serviceHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`DB update error on ${table}: ${res.status} ${await res.text()}`);
}

export async function dbRpc<T>(fn: string, params: object): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: serviceHeaders(),
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error(`DB RPC error on ${fn}: ${res.status} ${await res.text()}`);
  return res.json();
}

export async function validateApiKey(apiKey: string): Promise<OfficeContext | null> {
  const office = await dbSelectOne<any>(
    "offices",
    `?api_key=eq.${encodeURIComponent(apiKey)}&select=id,google_calendar_access_token,google_calendar_refresh_token,google_calendar_id,google_drive_access_token,google_drive_refresh_token,google_drive_root_folder_id,advbox_token,escavador_token,zapsign_token,asaas_token,request_count`
  );

  if (!office) return null;

  await dbUpdate("offices", `id=eq.${office.id}`, {
    last_used_at: new Date().toISOString(),
    request_count: (office.request_count ?? 0) + 1,
  });

  return {
    officeId: office.id,
    googleCalendarAccessToken: office.google_calendar_access_token,
    googleCalendarRefreshToken: office.google_calendar_refresh_token,
    googleCalendarId: office.google_calendar_id,
    googleDriveAccessToken: office.google_drive_access_token,
    googleDriveRefreshToken: office.google_drive_refresh_token,
    googleDriveRootFolderId: office.google_drive_root_folder_id,
    advboxToken: office.advbox_token,
    escavadorToken: office.escavador_token,
    zapsignToken: office.zapsign_token,
    asaasToken: office.asaas_token,
  };
}

export async function refreshGoogleToken(
  officeId: string,
  refreshToken: string,
  type: "calendar" | "drive"
): Promise<string> {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("GOOGLE_CLIENT_ID ou GOOGLE_CLIENT_SECRET nao configurados no servidor.");
  }

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Falha ao renovar token do Google (${res.status}): ${errText}`);
  }

  const data = await res.json() as any;
  const newAccessToken = data.access_token as string;

  const updatePayload: any = type === "calendar"
    ? { google_calendar_access_token: newAccessToken }
    : { google_drive_access_token: newAccessToken };

  if (data.refresh_token) {
    if (type === "calendar") {
      updatePayload.google_calendar_refresh_token = data.refresh_token;
    } else {
      updatePayload.google_drive_refresh_token = data.refresh_token;
    }
  }

  await dbUpdate("offices", `id=eq.${officeId}`, updatePayload);

  return newAccessToken;
}

export async function googleFetch(
  office: OfficeContext,
  url: string,
  options: RequestInit = {},
  type: "calendar" | "drive"
): Promise<Response> {
  const token = type === "calendar" ? office.googleCalendarAccessToken : office.googleDriveAccessToken;
  
  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let res = await fetch(url, { ...options, headers });

  if (res.status === 401) {
    const refreshToken = type === "calendar" ? office.googleCalendarRefreshToken : office.googleDriveRefreshToken;
    if (refreshToken) {
      try {
        console.log(`[Google OAuth] Token do ${type} expirou. Tentando renovar...`);
        const newAccessToken = await refreshGoogleToken(office.officeId, refreshToken, type);
        
        if (type === "calendar") {
          office.googleCalendarAccessToken = newAccessToken;
        } else {
          office.googleDriveAccessToken = newAccessToken;
        }

        const retryHeaders = new Headers(options.headers || {});
        retryHeaders.set("Authorization", `Bearer ${newAccessToken}`);
        res = await fetch(url, { ...options, headers: retryHeaders });
      } catch (err: any) {
        console.error(`[Google OAuth] Erro ao renovar token do Google (${type}):`, err);
      }
    }
  }

  return res;
}

