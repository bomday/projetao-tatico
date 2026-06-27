import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import type { OfficeContext } from "./db.js";
import { validateApiKey } from "./db.js";
import { registerTools } from "./register-tools.js";

const app = express();
app.use(express.json());

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
  next();
});

function buildMcpServer(office: OfficeContext) {
  const server = new McpServer({
    name: "tatico-integrator",
    version: "2.0.0",
  });

  registerTools(server, office);
  return server;
}

const transports = new Map<string, SSEServerTransport>();

app.get("/sse", async (req, res) => {
  const apiKey = req.headers.authorization?.replace("Bearer ", "").trim();
  if (!apiKey) {
    res.status(401).json({ error: "Authorization header com API key e obrigatorio." });
    return;
  }

  const office = await validateApiKey(apiKey);
  if (!office) {
    res.status(403).json({ error: "API key invalida ou expirada." });
    return;
  }

  const server = buildMcpServer(office);
  const transport = new SSEServerTransport("/message", res);
  transports.set(transport.sessionId, transport);

  res.on("close", () => {
    transports.delete(transport.sessionId);
  });

  await server.connect(transport);
});

app.post("/message", async (req, res) => {
  const sessionId = req.query.sessionId as string;
  const transport = transports.get(sessionId);

  if (!transport) {
    res.status(404).json({ error: "Sessao nao encontrada." });
    return;
  }

  await transport.handlePostMessage(req, res);
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "tatico-mcp", version: "2.0.0" });
});

const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => {
  console.log(`TATICO MCP Server rodando na porta ${PORT}`);
});
