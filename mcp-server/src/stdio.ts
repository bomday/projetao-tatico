import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { validateApiKey } from "./db.js";
import { registerTools } from "./register-tools.js";

async function main() {
  const apiKey = process.env.TATICO_API_KEY;
  if (!apiKey) {
    console.error("TATICO_API_KEY nao configurada. Defina a variavel de ambiente.");
    process.exit(1);
  }

  const office = await validateApiKey(apiKey);
  if (!office) {
    console.error("API key invalida.");
    process.exit(1);
  }

  const server = new McpServer({ name: "tatico-integrator", version: "2.0.0" });
  registerTools(server, office);

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
