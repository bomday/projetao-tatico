import type { OfficeRecord } from "./db.js";
import { getConnectedSources, getIntegrationStatuses } from "./db.js";

const MCP_URL = process.env.MCP_URL ?? "https://tatico-mcp.fly.dev";

function layout(title: string, body: string, officeName = "", userEmail = "") {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - TATICO</title>
  <!-- Google Fonts: Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-page: #09090b;
      --bg-card: #18181b;
      --bg-sidebar: #0d0d0f;
      --border-color: #27272a;
      --border-hover: #3f3f46;
      --text-primary: #fafafa;
      --text-secondary: #a1a1aa;
      --text-muted: #71717a;
      --accent: #00d4ff;
      --accent-hover: #00f5ff;
      --error-color: #f87171;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    body {
      background: var(--bg-page);
      color: var(--text-primary);
      font-family: 'Inter', BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    a {
      color: var(--accent);
      text-decoration: none;
      transition: color 0.2s ease, text-decoration 0.2s ease;
      border-radius: 4px;
    }
    
    a:hover {
      color: var(--accent-hover);
      text-decoration: underline;
    }

    a:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }

    input, textarea {
      background: var(--bg-page);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      color: var(--text-primary);
      padding: 10px 14px;
      width: 100%;
      font-size: 14px;
      font-family: inherit;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    input:focus, textarea:focus {
      outline: none;
      border-color: var(--accent);
      box-shadow: 0 0 0 1px var(--accent);
    }

    input::placeholder {
      color: var(--text-muted);
    }

    button[type=submit], .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: var(--accent);
      border: none;
      border-radius: 8px;
      color: #000;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      padding: 10px 18px;
      transition: background 0.2s ease, transform 0.1s ease;
      font-family: inherit;
    }

    button[type=submit]:hover, .btn:hover {
      background: var(--accent-hover);
    }

    button[type=submit]:active, .btn:active {
      transform: scale(0.98);
    }

    .btn-ghost {
      background: transparent;
      border: 1px solid var(--border-color);
      color: var(--text-secondary);
      transition: border-color 0.2s, color 0.2s, background 0.2s;
    }

    .btn-ghost:hover {
      border-color: var(--text-primary);
      color: var(--text-primary);
      background: rgba(255, 255, 255, 0.03);
    }

    label {
      color: var(--text-secondary);
      font-size: 13px;
      font-weight: 500;
      display: block;
      margin-bottom: 6px;
    }

    .error {
      color: var(--error-color);
      font-size: 13px;
      margin-top: 8px;
    }

    code {
      font-family: monospace;
    }

    pre {
      white-space: pre-wrap;
      word-break: break-all;
      font-family: monospace;
      font-size: 12px;
      color: var(--text-secondary);
      background: var(--bg-page);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 16px;
    }

    /* Scrollbar Styling */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: var(--bg-page);
    }
    ::-webkit-scrollbar-thumb {
      background: var(--border-color);
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--border-hover);
    }
  </style>
</head>
<body>
  ${officeName ? sidebar(officeName, userEmail) : ""}
  <div style="${officeName ? "margin-left:248px;" : ""}">
    ${body}
  </div>
</body>
</html>`;
}

function sidebar(officeName: string, userEmail: string) {
  return `<aside style="position:fixed;left:0;top:0;width:248px;height:100vh;background:var(--bg-sidebar);border-right:1px solid var(--border-color);display:flex;flex-direction:column;z-index:50;">
  <div style="padding:24px 20px;border-bottom:1px solid var(--border-color);">
    <p style="font-size:18px;font-weight:700;color:var(--text-primary);letter-spacing:-0.025em;display:flex;align-items:center;gap:8px;">
      <span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:var(--accent);"></span>
      TATICO
    </p>
    <p style="font-size:12px;color:var(--text-muted);margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(officeName)}</p>
  </div>
  <nav style="flex:1;padding:16px 12px;">
    <a href="/integracoes" style="display:block;padding:10px 12px;border-radius:8px;color:var(--text-secondary);font-size:14px;margin-bottom:6px;font-weight:500;transition:all 0.2s;" onmouseover="this.style.color='var(--text-primary)';this.style.background='var(--bg-card)'" onmouseout="this.style.color='var(--text-secondary)';this.style.background='transparent'">Integrações</a>
    <a href="/configuracoes" style="display:block;padding:10px 12px;border-radius:8px;color:var(--text-secondary);font-size:14px;font-weight:500;transition:all 0.2s;" onmouseover="this.style.color='var(--text-primary)';this.style.background='var(--bg-card)'" onmouseout="this.style.color='var(--text-secondary)';this.style.background='transparent'">MCP E Acesso</a>
  </nav>
  <div style="padding:16px 20px;border-top:1px solid var(--border-color);">
    <p style="font-size:12px;color:var(--text-muted);overflow:hidden;text-overflow:ellipsis;font-weight:500;">${esc(userEmail)}</p>
  </div>
</aside>`;
}

export function esc(str: string) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function loginPage(error = "") {
  return layout("Login", `
    <main style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:16px;">
      <div style="width:100%;max-width:380px;">
        <div style="text-align:center;margin-bottom:32px;">
          <h1 style="font-size:28px;font-weight:700;letter-spacing:-0.035em;color:var(--text-primary);">TATICO</h1>
          <p style="color:var(--text-secondary);font-size:14px;margin-top:4px;">MCP Integrador Para O Workspace Jurídico</p>
        </div>
        <form method="POST" action="/auth/login" style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:12px;padding:28px;box-shadow:0 4px 12px rgba(0,0,0,0.5);">
          <div style="margin-bottom:20px;">
            <label for="email">E-mail</label>
            <input id="email" name="email" type="email" required placeholder="seu@email.com">
          </div>
          <div style="margin-bottom:20px;">
            <label for="password">Senha</label>
            <input id="password" name="password" type="password" required placeholder="••••••••">
          </div>
          ${error ? `<p class="error" role="alert">${esc(error)}</p>` : ""}
          <button type="submit" style="width:100%;margin-top:12px;">Entrar</button>
        </form>
        <p style="text-align:center;color:var(--text-muted);font-size:13px;margin-top:24px;">Sem Conta? <a href="/register" style="font-weight:500;">Criar Escritório</a></p>
      </div>
    </main>`);
}

export function registerPage(error = "") {
  return layout("Criar Conta", `
    <main style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:16px;">
      <div style="width:100%;max-width:380px;">
        <div style="text-align:center;margin-bottom:32px;">
          <h1 style="font-size:28px;font-weight:700;letter-spacing:-0.035em;color:var(--text-primary);">TATICO</h1>
          <p style="color:var(--text-secondary);font-size:14px;margin-top:4px;">Conecte Suas Ferramentas À Sua IA</p>
        </div>
        <form method="POST" action="/auth/register" style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:12px;padding:28px;box-shadow:0 4px 12px rgba(0,0,0,0.5);">
          <div style="margin-bottom:20px;">
            <label for="office_name">Nome Do Escritório</label>
            <input id="office_name" name="office_name" type="text" required placeholder="Oliveira e Mendes Advocacia">
          </div>
          <div style="margin-bottom:20px;">
            <label for="email">E-mail</label>
            <input id="email" name="email" type="email" required placeholder="seu@email.com">
          </div>
          <div style="margin-bottom:20px;">
            <label for="password">Senha (Mín. 6 Caracteres)</label>
            <input id="password" name="password" type="password" required minlength="6" placeholder="••••••••">
          </div>
          ${error ? `<p class="error" role="alert">${esc(error)}</p>` : ""}
          <button type="submit" style="width:100%;margin-top:12px;">Criar Escritório</button>
        </form>
        <p style="text-align:center;color:var(--text-muted);font-size:13px;margin-top:24px;">Já Tem Conta? <a href="/login" style="font-weight:500;">Entrar</a></p>
      </div>
    </main>`);
}

function statusBadge(connected: boolean) {
  const style = connected
    ? "background:rgba(16,185,129,0.1);color:#10b981;border:1px solid rgba(16,185,129,0.2);"
    : "background:rgba(113,113,122,0.1);color:#a1a1aa;border:1px solid rgba(113,113,122,0.2);";
  return `<span style="font-size:11px;font-weight:600;padding:3px 10px;border-radius:9999px;display:inline-flex;align-items:center;gap:4px;${style}">
    <span style="width:6px;height:6px;border-radius:50%;background:currentColor;"></span>
    ${connected ? "Conectado" : "Não Conectado"}
  </span>`;
}

function section(title: string, desc: string, body: string, extraStyle = "") {
  const containerStyle = extraStyle || "background:var(--bg-card);border:1px solid var(--border-color);";
  return `<section style="${containerStyle}border-radius:12px;padding:24px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,0.2);">
    <h2 style="font-size:16px;font-weight:600;margin-bottom:4px;letter-spacing:-0.010em;color:var(--text-primary);">${title}</h2>
    <p style="color:var(--text-secondary);font-size:13px;margin-bottom:20px;">${desc}</p>
    ${body}
  </section>`;
}

export function integrationsPage(office: OfficeRecord, officeName: string, userEmail: string, success = false) {
  const statuses = getIntegrationStatuses(office);
  const connected = getConnectedSources(office);

  const cards = statuses.map((item) => `
    <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:12px;padding:20px;box-shadow:0 2px 6px rgba(0,0,0,0.15);">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;">
        <div>
          <p style="font-weight:600;color:var(--text-primary);font-size:15px;">${esc(item.name)}</p>
          <p style="color:var(--text-secondary);font-size:13px;margin-top:6px;line-height:1.4;">${esc(item.summary)}</p>
        </div>
        ${statusBadge(item.connected)}
      </div>
    </div>`).join("");

  return layout("Integrações", `
    <main style="padding:40px;max-width:1000px;margin:0 auto;">
      <div style="margin-bottom:40px;">
        <h1 style="font-size:32px;font-weight:700;letter-spacing:-0.035em;color:var(--text-primary);">Integrações</h1>
        <p style="color:var(--text-secondary);font-size:14px;margin-top:6px;">Conecte as fontes reais do escritório. O TATICO usa essas conexões para expor contexto via MCP.</p>
      </div>

      ${section("Visão Geral", "O produto não depende de cadastro manual de clientes. O foco é conectar agenda, documentos, sistema jurídico e fontes públicas.",
        `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;">
          <div style="background:var(--bg-page);border:1px solid var(--border-color);border-radius:12px;padding:20px;box-shadow:inset 0 1px 3px rgba(0,0,0,0.2);">
            <p style="color:var(--text-secondary);font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:0.05em;">Fontes Conectadas</p>
            <p style="font-size:36px;font-weight:700;margin-top:8px;color:var(--text-primary);line-height:1;">${connected.length}</p>
          </div>
          <div style="background:var(--bg-page);border:1px solid var(--border-color);border-radius:12px;padding:20px;box-shadow:inset 0 1px 3px rgba(0,0,0,0.2);">
            <p style="color:var(--text-secondary);font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:0.05em;">Último Uso Do MCP</p>
            <p style="font-size:18px;font-weight:600;margin-top:16px;color:var(--text-primary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(office.last_used_at ? office.last_used_at.slice(0, 19).replace("T", " ") : "Ainda Não Usado")}</p>
          </div>
          <div style="background:var(--bg-page);border:1px solid var(--border-color);border-radius:12px;padding:20px;box-shadow:inset 0 1px 3px rgba(0,0,0,0.2);">
            <p style="color:var(--text-secondary);font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:0.05em;">Chamadas Registradas</p>
            <p style="font-size:36px;font-weight:700;margin-top:8px;color:var(--text-primary);line-height:1;">${office.request_count ?? 0}</p>
          </div>
        </div>`
      )}

      ${section("Status Das Conexões", "O ideal é ativar pelo menos Google Calendar, Google Drive e a principal fonte jurídica do escritório.",
        `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;">${cards}</div>`
      )}

      ${section("Configurar Conectores", "Preencha tokens de acesso ou credenciais técnicas temporárias.",
        `${success ? `<p style="color:#10b981;font-size:14px;font-weight:500;margin-bottom:20px;display:flex;align-items:center;gap:6px;"><span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#10b981;"></span>Integrações salvas com sucesso.</p>` : ""}
        <form method="POST" action="/integracoes">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:28px;">
            ${office.google_calendar_access_token || office.google_drive_access_token ? `
            <div style="grid-column: span 2; background: rgba(16,185,129,0.06); border: 1px solid rgba(16,185,129,0.3); border-radius: 8px; padding: 20px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
              <div>
                <p style="font-weight: 600; color: var(--text-primary); font-size: 14px;">Conta Google Conectada</p>
                <p style="color: #a7f3d0; font-size: 12px; margin-top: 2px;">Google Calendar e Google Drive ativos via OAuth</p>
              </div>
              <button type="button" class="btn" style="background: #ef4444; color: #fff; font-size: 13px; padding: 8px 14px;" onclick="if(confirm('Tem certeza que deseja desconectar sua conta Google?')){const f=document.createElement('form');f.method='POST';f.action='/auth/google/disconnect';document.body.appendChild(f);f.submit();}">Desconectar</button>
            </div>
            ` : `
            <div style="grid-column: span 2; background: rgba(255,255,255,0.01); border: 1px dashed var(--border-color); border-radius: 8px; padding: 28px; text-align: center; transition: border-color 0.2s;" onmouseover="this.style.borderColor='var(--border-hover)'" onmouseout="this.style.borderColor='var(--border-color)'">
              <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 16px;">Conecte sua conta do Google para ativar o Google Calendar e Google Drive no TATICO.</p>
              <a href="/auth/google" class="btn" style="display: inline-flex; background: #fafafa; color: #09090b; padding: 10px 22px; font-size: 14px; font-weight: 600; border-radius: 8px; text-decoration: none; transition: background 0.2s;" onmouseover="this.style.background='#e4e4e7'" onmouseout="this.style.background='#fafafa'">Conectar Conta Google</a>
            </div>
            `}
            
            <div>
              <label for="google_calendar_id">Google Calendar ID</label>
              <input id="google_calendar_id" name="google_calendar_id" type="text" value="${esc(office.google_calendar_id ?? "primary")}" placeholder="primary">
            </div>
            <div>
              <label for="google_drive_root_folder_id">Google Drive Root Folder ID</label>
              <input id="google_drive_root_folder_id" name="google_drive_root_folder_id" type="text" value="${esc(office.google_drive_root_folder_id ?? "")}" placeholder="Opcional">
            </div>
            <div>
              <label for="advbox_token">Token ADVBox</label>
              <input id="advbox_token" name="advbox_token" type="text" value="${esc(office.advbox_token ?? "")}" placeholder="Bearer token do ADVBox">
            </div>
            <div>
              <label for="escavador_token">Token Escavador</label>
              <input id="escavador_token" name="escavador_token" type="text" value="${esc(office.escavador_token ?? "")}" placeholder="PAT do Escavador">
            </div>
            <div>
              <label for="zapsign_token">Token ZapSign</label>
              <input id="zapsign_token" name="zapsign_token" type="text" value="${esc(office.zapsign_token ?? "")}" placeholder="Opcional">
            </div>
            <div>
              <label for="asaas_token">Token Asaas</label>
              <input id="asaas_token" name="asaas_token" type="text" value="${esc(office.asaas_token ?? "")}" placeholder="Opcional">
            </div>
          </div>
          <button type="submit">Salvar Integrações</button>
        </form>`
      )}
    </main>`, officeName, userEmail);
}

export function settingsPage(office: OfficeRecord, officeName: string, userEmail: string, mcpUrl: string) {
  const claudeConfig = JSON.stringify({
    mcpServers: {
      tatico: {
        url: `${mcpUrl}/sse`,
        headers: { Authorization: `Bearer ${office.api_key}` },
      },
    },
  }, null, 2);

  const systemPrompt = `Você é o assistente jurídico do escritório ${office.name}.

Você tem acesso às ferramentas do TATICO para consultar agenda, documentos, fontes jurídicas conectadas e dados públicos.

Diretrizes:
- descubra primeiro quais fontes estão conectadas com list_connected_sources
- use get_calendar_events para compromissos e contexto do dia
- use search_drive_documents e get_drive_document_content para localizar materiais do caso
- use search_matters e get_matter_context para consultar a ferramenta jurídica conectada
- use get_case_status para andamento processual público
- use get_company_info para dados de CNPJ
- responda sempre em português brasileiro
- não invente informações quando a fonte não estiver conectada ou não trouxer resultado`;

  const autoConfigPrompt = `Por favor, configure o servidor MCP do TATICO para mim no meu cliente MCP (como Claude Desktop ou Cursor).
Localize o arquivo de configuração \`claude_desktop_config.json\` ou o arquivo de configuração correspondente do seu app de IA no meu computador (para o Claude Desktop, geralmente fica em %APPDATA%\\Claude\\ no Windows ou ~/Library/Application Support/Claude/ no macOS) e adicione a seguinte configuração dentro do objeto \`mcpServers\`:

${claudeConfig}

Se o arquivo não existir, crie-o. Se o objeto \`mcpServers\` não existir, crie-o também. Salve o arquivo e me avise quando concluir.`;

  return layout("MCP E Acesso", `
    <main style="padding:40px;max-width:800px;margin:0 auto;">
      <div style="margin-bottom:40px;">
        <h1 style="font-size:32px;font-weight:700;letter-spacing:-0.035em;color:var(--text-primary);">Chave De API E Acesso</h1>
        <p style="color:var(--text-secondary);font-size:14px;margin-top:6px;">Conecte a IA do escritório ao TATICO e use as fontes reais do workspace jurídico.</p>
      </div>

      ${section("Configuração Automática <span style=\"background:#10b981;color:#000;font-size:10px;font-weight:700;padding:2px 6px;border-radius:4px;margin-left:8px;vertical-align:middle;\">RECOMENDADO</span>", "Copie este prompt e envie para a sua IA (caso ela tenha acesso aos seus arquivos locais) para ela realizar a configuração automática do seu servidor MCP.",
        `<div style="position:relative;">
          <pre style="background:var(--bg-page);border:1px solid rgba(16,185,129,0.2);border-radius:8px;padding:16px;max-height:200px;overflow-y:auto;white-space:pre-wrap;font-family:inherit;font-size:13px;color:var(--text-secondary);line-height:1.5;">${esc(autoConfigPrompt)}</pre>
          <button onclick="navigator.clipboard.writeText(\`${esc(autoConfigPrompt.replace(/`/g, '\\`').replace(/\$/g, '\\$'))}\`);this.textContent='Copiado';setTimeout(()=>this.textContent='Copiar',1500)" type="button" class="btn" style="position:absolute;top:12px;right:12px;font-size:12px;padding:6px 12px;background:var(--bg-card);border:1px solid rgba(16,185,129,0.3);color:var(--text-primary);">Copiar Prompt</button>
        </div>`,
        "background: linear-gradient(135deg, #0a1f18 0%, #06120e 100%); border: 1px solid #10b981;"
      )}

      ${section("Chave De API", "Use esta chave para autenticar o MCP do escritório.",
        `<div style="display:flex;gap:12px;align-items:center;">
          <code style="flex:1;background:var(--bg-page);border:1px solid var(--border-color);border-radius:8px;padding:10px 12px;color:var(--accent);font-size:13px;overflow:hidden;text-overflow:ellipsis;font-weight:500;">${esc(office.api_key)}</code>
          <button onclick="navigator.clipboard.writeText('${esc(office.api_key)}');this.textContent='Copiado';setTimeout(()=>this.textContent='Copiar',1500)" type="button" class="btn btn-ghost" style="padding:8px 14px;">Copiar</button>
        </div>
        <form method="POST" action="/configuracoes/regenerar" style="margin-top:14px;">
          <button type="submit" style="background:transparent;border:none;color:var(--error-color);font-size:12px;cursor:pointer;font-weight:500;">Regenerar Chave</button>
        </form>`
      )}

      ${section("Configurar No Claude.ai", "Cole este JSON em Settings > Integrations > Add MCP Server.",
        `<div style="position:relative;">
          <pre style="background:var(--bg-page);border:1px solid var(--border-color);border-radius:8px;padding:16px;color:var(--text-secondary);font-size:13px;line-height:1.5;">${esc(claudeConfig)}</pre>
          <button onclick="navigator.clipboard.writeText(\`${esc(claudeConfig)}\`);this.textContent='Copiado';setTimeout(()=>this.textContent='Copiar',1500)" type="button" class="btn" style="position:absolute;top:12px;right:12px;font-size:12px;padding:6px 12px;background:var(--bg-card);border:1px solid var(--border-color);color:var(--text-primary);">Copiar</button>
        </div>`
      )}

      ${section("Template Do Projeto", "Prompt de partida para orientar a IA a usar as fontes conectadas do escritório.",
        `<div style="position:relative;">
          <pre style="background:var(--bg-page);border:1px solid var(--border-color);border-radius:8px;padding:16px;max-height:240px;overflow-y:auto;color:var(--text-secondary);font-size:13px;line-height:1.5;">${esc(systemPrompt)}</pre>
          <button onclick="navigator.clipboard.writeText(\`${esc(systemPrompt)}\`);this.textContent='Copiado';setTimeout(()=>this.textContent='Copiar',1500)" type="button" class="btn" style="position:absolute;top:12px;right:12px;font-size:12px;padding:6px 12px;background:var(--bg-card);border:1px solid var(--border-color);color:var(--text-primary);">Copiar</button>
        </div>`
      )}

      <form method="POST" action="/auth/logout" style="margin-top:20px;">
        <button type="submit" style="background:transparent;border:none;color:var(--text-muted);font-size:14px;cursor:pointer;transition:color 0.2s;" onmouseover="this.style.color='var(--text-primary)'" onmouseout="this.style.color='var(--text-muted)'">Sair Da Conta</button>
      </form>
    </main>`, officeName, userEmail);
}

export { MCP_URL };
