# Plano de Implementação — 3 Semanas
**TÁTICO v5.0 — MCP integrador | 1 desenvolvedora**

---

## Premissas

- o MCP Server é o produto principal
- o Admin Web existe para conexão, OAuth e observabilidade
- a prioridade é leitura multi-fonte, não banco interno
- o MVP deve provar integração útil, não construir um software paralelo de gestão

---

## Visão geral

```text
SEMANA 1 — FUNDAÇÃO
auth, conexões, modelo de integrações

SEMANA 2 — CONECTORES CORE
Google Calendar + Google Drive + fonte jurídica

SEMANA 3 — ORQUESTRAÇÃO E DEMO
prompts, testes end-to-end, demo com perguntas reais
```

---

## Semana 1 — Fundação

**Objetivo:** usuário autentica, conecta contas e copia a configuração MCP.

### Entregas

1. Autenticação básica do escritório.
2. Modelo de dados mínimo para:
   - usuários
   - escritórios
   - integrações conectadas
   - tokens e credenciais
   - logs
3. Tela de conexões.
4. Geração do JSON de configuração MCP.

### Modelo de dados mínimo

```text
offices
users
integrations
integration_credentials
tool_logs
cache_entries
```

### Resultado esperado

O advogado entra no admin e enxerga:

- quais fontes pode conectar
- quais já estão conectadas
- se o escopo está correto
- como ativar o MCP na IA

---

## Semana 2 — Conectores core

**Objetivo:** fazer a IA enxergar fontes reais.

### Prioridade 1 — Google Calendar

- OAuth web-server
- leitura de eventos
- filtro por data e busca simples

### Prioridade 2 — Google Drive

- OAuth web-server
- busca de arquivos e pastas
- leitura de metadados e conteúdo básico

### Prioridade 3 — Fonte jurídica principal

Escolher uma fonte inicial:

1. ADVBox
2. consulta pública processual

### Tools mínimas da semana

- `list_connected_sources`
- `get_calendar_events`
- `search_drive_documents`
- `get_drive_document_content`
- `search_matters`
- `get_matter_context`
- `get_case_status`
- `get_company_info`

### Resultado esperado

Já é possível fazer perguntas como:

- "O que tenho hoje à tarde?"
- "Encontre os documentos da Empresa ABC."
- "Me atualiza sobre esse processo."

---

## Semana 3 — Orquestração e demo

**Objetivo:** mostrar valor com perguntas reais do advogado.

### Trabalho principal

1. Melhorar descrições das tools para uso pelo modelo.
2. Testar perguntas que dependam de mais de uma fonte.
3. Criar roteiro de demo baseado em workflow real.
4. Ajustar mensagens de erro e fallback.

### Perguntas de validação

1. "Quais compromissos tenho hoje?"
2. "Encontre os documentos da Empresa ABC."
3. "Me prepare para a reunião de hoje à tarde."
4. "Qual a última movimentação desse processo?"
5. "O que está espalhado entre agenda, drive e sistema sobre esse cliente?"

### Resultado esperado

A demo precisa deixar claro:

- não houve cadastro manual de cliente
- a IA consultou fontes reais
- o valor veio da integração entre ferramentas

---

## Arquitetura alvo do MVP

```text
IA do advogado
  ↓
MCP Server TÁTICO
  ↓
Conectores
  - Google Calendar
  - Google Drive
  - sistema jurídico
  - fonte pública processual
  - BrasilAPI
  ↓
Cache técnico + logs + credenciais
```

---

## O que cortar se o tempo apertar

1. escrita em conectores
2. automações
3. polimento visual do admin
4. múltiplas fontes jurídicas ao mesmo tempo

### Nunca cortar

1. conexão MCP funcional
2. Google Calendar
3. Google Drive
4. ao menos uma fonte jurídica
5. pergunta multi-fonte demonstrável

---

## Riscos principais

| Risco | Mitigação |
|---|---|
| OAuth do Google atrasar | implementar primeiro leitura básica e limitar escopo |
| conector jurídico ser instável | começar com fallback público simples |
| querer modelar tudo em banco | manter a regra: banco só para apoio técnico |
| demo virar "mais um dashboard" | forçar roteiro centrado na conversa com IA |

---

## Critério de sucesso

Em até 3 semanas, o TÁTICO precisa demonstrar isto:

> uma IA conectada consegue buscar contexto real em mais de uma ferramenta do advogado sem exigir migração ou alimentação manual de dados.
