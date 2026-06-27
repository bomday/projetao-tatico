import express from "express";
import {
  createOffice,
  getOfficeByOwner,
  getUserFromToken,
  rpcRegenerateKey,
  saveIntegrations,
  signIn,
  signUp,
} from "./db.js";
import { integrationsPage, loginPage, registerPage, settingsPage, MCP_URL } from "./views.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function getToken(req: express.Request): string | null {
  return req.headers.cookie
    ?.split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("tatico_token="))
    ?.split("=")[1] ?? null;
}

function setToken(res: express.Response, token: string) {
  const maxAge = 7 * 24 * 60 * 60;
  res.setHeader("Set-Cookie", `tatico_token=${token}; Path=/; HttpOnly; Max-Age=${maxAge}; SameSite=Lax`);
}

function clearToken(res: express.Response) {
  res.setHeader("Set-Cookie", "tatico_token=; Path=/; HttpOnly; Max-Age=0");
}

async function requireAuth(req: express.Request, res: express.Response) {
  const token = getToken(req);
  if (!token) {
    res.redirect("/login");
    return null;
  }

  const user = await getUserFromToken(token);
  if (!user) {
    clearToken(res);
    res.redirect("/login");
    return null;
  }

  let office = await getOfficeByOwner(user.id);
  if (!office) {
    try {
      office = await createOffice(`Escritorio de ${user.email.split("@")[0]}`, user.id);
    } catch {
      clearToken(res);
      res.redirect("/login?error=failed_to_create_office");
      return null;
    }
  }

  return { user, office };
}

app.get("/", (_req, res) => res.redirect("/integracoes"));

app.get("/login", (_req, res) => res.send(loginPage()));
app.get("/register", (_req, res) => res.send(registerPage()));

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await signIn(email, password);
  if (result.error) return res.send(loginPage(result.error));
  setToken(res, result.token!);
  res.redirect("/integracoes");
});

app.post("/auth/register", async (req, res) => {
  const { email, password, office_name } = req.body;
  const result = await signUp(email, password);
  if (result.error) return res.send(registerPage(result.error));
  setToken(res, result.token!);
  await createOffice(office_name, result.userId!);
  res.redirect("/integracoes");
});

app.post("/auth/logout", (_req, res) => {
  clearToken(res);
  res.redirect("/login");
});

app.get("/auth/google", async (req, res) => {
  const session = await requireAuth(req, res);
  if (!session) return;

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || `${req.protocol}://${req.get("host")}/auth/google/callback`;

  if (!clientId) {
    res.status(500).send("GOOGLE_CLIENT_ID nao configurado no servidor.");
    return;
  }

  const scopes = [
    "https://www.googleapis.com/auth/calendar.readonly",
    "https://www.googleapis.com/auth/drive.readonly"
  ];

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: scopes.join(" "),
    access_type: "offline",
    prompt: "consent",
    state: session.office.id,
  });

  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
});

app.get("/auth/google/callback", async (req, res) => {
  const session = await requireAuth(req, res);
  if (!session) return;

  const { code, state, error } = req.query;

  if (error) {
    res.redirect(`/integracoes?error=${encodeURIComponent(String(error))}`);
    return;
  }

  if (!code) {
    res.redirect("/integracoes?error=missing_code");
    return;
  }

  if (state !== session.office.id) {
    res.redirect("/integracoes?error=state_mismatch");
    return;
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || `${req.protocol}://${req.get("host")}/auth/google/callback`;

  if (!clientId || !clientSecret) {
    res.status(500).send("GOOGLE_CLIENT_ID ou GOOGLE_CLIENT_SECRET nao configurados.");
    return;
  }

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code: String(code),
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      const errBody = await tokenRes.text();
      console.error("Erro na troca do codigo de autorizacao:", errBody);
      res.redirect(`/integracoes?error=token_exchange_failed`);
      return;
    }

    const tokenData = await tokenRes.json() as any;
    const { access_token, refresh_token } = tokenData;

    const updatePayload: any = {
      google_calendar_access_token: access_token || null,
      google_drive_access_token: access_token || null,
    };

    if (refresh_token) {
      updatePayload.google_calendar_refresh_token = refresh_token;
      updatePayload.google_drive_refresh_token = refresh_token;
    }

    await saveIntegrations(session.office.id, updatePayload);

    res.redirect("/integracoes?success=1");
  } catch (err) {
    console.error("Erro no callback do Google OAuth:", err);
    res.redirect("/integracoes?error=callback_error");
  }
});

app.post("/auth/google/disconnect", async (req, res) => {
  const session = await requireAuth(req, res);
  if (!session) return;

  await saveIntegrations(session.office.id, {
    google_calendar_access_token: null,
    google_calendar_refresh_token: null,
    google_drive_access_token: null,
    google_drive_refresh_token: null,
  });

  res.redirect("/integracoes");
});


app.get("/integracoes", async (req, res) => {
  const session = await requireAuth(req, res);
  if (!session) return;
  const success = req.query.success === "1";
  res.send(integrationsPage(session.office, session.office.name, session.user.email, success));
});

app.post("/integracoes", async (req, res) => {
  const session = await requireAuth(req, res);
  if (!session) return;

  await saveIntegrations(session.office.id, {
    google_calendar_id: req.body.google_calendar_id || "primary",
    google_drive_root_folder_id: req.body.google_drive_root_folder_id || null,
    advbox_token: req.body.advbox_token || null,
    escavador_token: req.body.escavador_token || null,
    zapsign_token: req.body.zapsign_token || null,
    asaas_token: req.body.asaas_token || null,
  });

  res.redirect("/integracoes?success=1");
});

app.get("/configuracoes", async (req, res) => {
  const session = await requireAuth(req, res);
  if (!session) return;
  res.send(settingsPage(session.office, session.office.name, session.user.email, MCP_URL));
});

app.post("/configuracoes/regenerar", async (req, res) => {
  const session = await requireAuth(req, res);
  if (!session) return;
  await rpcRegenerateKey(session.office.id);
  res.redirect("/configuracoes");
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "tatico-admin", version: "2.0.0" });
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`TATICO Admin rodando na porta ${PORT}`);
});
