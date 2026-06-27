# TATICO - MCP Integrador para Advocacia

Camada MCP para conectar a IA do advogado as ferramentas que ele ja usa.

## 🚀 Plataforma Online (Deploy)
Acesse a plataforma de administração do TATICO em: **[tatico-admin-dayanecamile.fly.dev](https://tatico-admin-dayanecamile.fly.dev)**

## 🎥 Vídeos de Demonstração
Confira as gravações de demonstração do projeto:
- **[Demo - Parte 1 (Assistir)](videos/Demo%20-%20Parte%201.mp4)**
- **[Demo - Parte 2 (Assistir)](videos/Demo%20-%20Parte%202.mp4)**

## O que o projeto faz

O TATICO nao tenta ser mais um sistema de gestao juridica. O foco atual e:

- conectar Google Calendar
- conectar Google Drive
- conectar uma fonte juridica principal, como ADVBox
- consultar fontes publicas juridicas
- expor tudo isso para Claude, ChatGPT e outros clientes MCP

## Estrutura

```text
tatico/
  admin/        painel web para login, conexoes e configuracao MCP
  mcp-server/   servidor MCP remoto e modo stdio
  supabase/     schema do banco para escritorios, credenciais e logs
```

## Setup rapido

### 1. Banco de dados

1. Crie um projeto no Supabase
2. Execute `supabase/schema.sql` no SQL Editor
3. Guarde:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_KEY`

### 2. Admin

```bash
cd admin
npm install
npm run dev
```

Variaveis esperadas:

```text
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=
MCP_URL=http://localhost:3001
```

### 3. MCP Server

```bash
cd mcp-server
npm install
npm run dev
```

Variaveis esperadas:

```text
SUPABASE_URL=
SUPABASE_SERVICE_KEY=
```

### 4. Modo stdio

```bash
cd mcp-server
TATICO_API_KEY=sk-tatico-xxx npm run dev:stdio
```

## Fluxo do produto

1. O escritorio cria conta no admin.
2. Conecta fontes como Google Calendar, Google Drive e ADVBox.
3. Copia a configuracao MCP.
4. Conecta a IA.
5. A IA passa a consultar essas fontes sob demanda.

## Tools MCP atuais

| Tool | Papel |
|---|---|
| `list_connected_sources` | mostra quais fontes estao disponiveis |
| `get_calendar_events` | consulta agenda do escritorio |
| `search_drive_documents` | busca documentos no Drive |
| `get_drive_document_content` | le arquivo ou metadados no Drive |
| `search_matters` | busca casos na fonte juridica conectada |
| `get_matter_context` | retorna contexto operacional do caso |
| `get_company_info` | consulta CNPJ via BrasilAPI |
| `get_case_status` | consulta processo via DataJud |

## Observacao importante

Nesta refatoracao, o banco deixou de ser a fonte principal de contexto do escritorio. Ele agora serve para:

- autenticacao
- API keys
- credenciais das integracoes
- logs

O contexto principal deve vir das ferramentas conectadas.
