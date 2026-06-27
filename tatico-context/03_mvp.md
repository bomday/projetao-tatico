# MVP — Especificação Completa
**TÁTICO v5.0 — MCP Integrador Jurídico**

---

## O que é o TÁTICO

O TÁTICO é uma **camada de integração MCP** para advogados. Ele conecta a IA do advogado às ferramentas onde o trabalho já acontece.

### O produto tem duas partes

| Parte | O que é | Para quem |
|---|---|---|
| **MCP Server** | servidor que expõe conectores e ações para a IA | Claude, ChatGPT, Gemini e outros clientes MCP |
| **Admin Web** | painel para conectar contas, gerenciar permissões e acompanhar status das integrações | advogado e escritório |

### O que o produto não é

- não é um chat próprio
- não é um novo sistema de gestão jurídica
- não depende de banco próprio como fonte principal do contexto
- não deve exigir cadastro manual de clientes como etapa central do onboarding

### A experiência em uma frase

> O advogado abre a IA que já usa, pergunta sobre um cliente ou caso, e o TÁTICO consulta agenda, documentos, sistema jurídico e fontes públicas para responder com contexto real.

---

## Princípio arquitetural

### Fonte principal

As ferramentas já usadas pelo advogado:

- sistema jurídico
- Google Drive
- Google Calendar
- e-mail
- bases públicas

### Papel do TÁTICO

1. autenticar nessas fontes
2. padronizar como a IA acessa cada uma
3. cruzar respostas quando necessário
4. registrar logs e cache técnico mínimo

### Papel do banco

O banco serve para:

- usuários e escritórios
- credenciais e tokens
- estado das conexões
- logs
- cache temporário

Ele **não** é o núcleo funcional do produto.

---

## Fluxo ideal do MVP

1. O advogado cria conta.
2. Ele conecta Google Calendar.
3. Ele conecta Google Drive.
4. Ele conecta ao menos uma fonte jurídica principal, como ADVBox.
5. O TÁTICO gera a configuração MCP.
6. O advogado conecta a IA.
7. A partir daí, pergunta em linguagem natural e o TÁTICO busca contexto nas fontes conectadas.

### Exemplo

> "Me prepara para a reunião com a Empresa ABC hoje à tarde."

O TÁTICO pode:

- consultar eventos do dia no Google Calendar
- localizar pasta e documentos relevantes no Google Drive
- consultar processo ou tarefa no sistema jurídico
- cruzar isso em uma resposta única

---

## Escopo do MVP

### Conectores prioritários

#### 1. `get_calendar_events`

```text
Descrição: lista eventos do período no Google Calendar do advogado
Input: { date_from, date_to, query? }
Output: eventos com título, horário, descrição e participantes
```

#### 2. `search_drive_documents`

```text
Descrição: busca arquivos e pastas no Google Drive por nome ou termo
Input: { query, folder_id?, mime_type? }
Output: lista de documentos relevantes com nome, link, pasta e data de modificação
```

#### 3. `get_drive_document_content`

```text
Descrição: recupera conteúdo ou metadados de um documento relevante
Input: { file_id }
Output: texto extraído ou resumo estrutural do arquivo
```

#### 4. `get_case_status`

```text
Descrição: consulta andamento processual em fonte pública ou integrada
Input: { numero_processo }
Output: tribunal, classe, última atualização e movimentações recentes
```

#### 5. `search_matters`

```text
Descrição: busca casos, clientes ou processos no sistema jurídico conectado
Input: { query }
Output: resultados compatíveis com nome, número ou assunto
```

#### 6. `get_matter_context`

```text
Descrição: retorna contexto consolidado de um caso no sistema jurídico
Input: { matter_id }
Output: partes, status, responsáveis, tarefas, prazos e observações disponíveis na fonte
```

#### 7. `list_connected_sources`

```text
Descrição: informa quais integrações estão ativas para o escritório
Input: nenhum
Output: fontes conectadas, status e escopo disponível
```

#### 8. `get_company_info`

```text
Descrição: busca dados cadastrais por CNPJ
Input: { cnpj }
Output: razão social, situação cadastral e dados básicos
```

---

## Fase 2 — escrita e automação

### Conectores e ações esperadas

#### `create_calendar_event`

```text
Descrição: cria evento no Google Calendar
Uso: agendar audiência, reunião ou prazo
```

#### `create_drive_folder`

```text
Descrição: cria pasta ou estrutura mínima no Drive
Uso: organizar novo cliente, diligência ou caso
```

#### `append_matter_note`

```text
Descrição: registra nota ou comentário na ferramenta jurídica conectada
Uso: atualização após reunião, audiência ou ligação
```

#### `schedule_deadline`

```text
Descrição: cria compromisso de prazo com descrição estruturada
Uso: transformar ato processual em agenda operacional
```

---

## Legal Skills no novo modelo

As skills deixam de depender de memória interna do TÁTICO e passam a depender da **orquestração entre fontes conectadas**.

| Skill | Como funciona |
|---|---|
| `prepare_meeting_briefing` | cruza agenda, documentos e sistema jurídico |
| `draft_client_update` | lê documentos e estado do caso antes de redigir |
| `summarize_case_material` | resume documento localizado no Drive |
| `organize_next_steps` | transforma contexto de reunião em ações ou eventos |
| `check_today_priorities` | lista compromissos e urgências do dia a partir das fontes conectadas |

---

## Requisitos funcionais

### MCP Server

| ID | Requisito | Prioridade |
|---|---|---|
| RF01 | autenticar por escritório e escopo de integração | Must Have |
| RF02 | expor conectores Google Calendar e Google Drive | Must Have |
| RF03 | expor ao menos uma fonte jurídica principal | Must Have |
| RF04 | consultar fonte pública processual | Must Have |
| RF05 | responder usando leitura sob demanda, sem depender de cadastro manual | Must Have |
| RF06 | registrar logs e observabilidade por tool | Should Have |
| RF07 | oferecer ações de escrita seguras nas fases seguintes | Should Have |

### Admin Web

| ID | Requisito | Prioridade |
|---|---|---|
| RF08 | autenticação de usuário | Must Have |
| RF09 | tela de conexões e status de integrações | Must Have |
| RF10 | fluxo OAuth para Google | Must Have |
| RF11 | armazenamento seguro de tokens e credenciais | Must Have |
| RF12 | geração de configuração MCP pronta para copiar | Must Have |
| RF13 | página de health e troubleshooting de conectores | Should Have |

---

## Requisitos não-funcionais

| ID | Requisito | Meta |
|---|---|---|
| RNF01 | tempo de resposta de conectores simples | < 2s |
| RNF02 | resposta consolidada multi-fonte | < 5s na maioria dos casos |
| RNF03 | idioma das descrições | português brasileiro |
| RNF04 | segurança | isolamento por escritório e escopo mínimo necessário |
| RNF05 | arquitetura | MCP remoto com suporte a SSE e evolução para Streamable HTTP |
| RNF06 | persistência | cache e logs, não banco como fonte principal |

---

## O que o MVP deliberadamente não inclui

| Feature | Por que não agora |
|---|---|
| CRUD completo de clientes | contradiz a tese de integrador como núcleo |
| timeline manual de notas como centro do produto | cria retrabalho e muda o foco |
| chat embutido próprio | a interface de conversa já existe |
| automações complexas de escrita | melhor validar primeiro a leitura multi-fonte |
| substituir software jurídico | não é a proposta |

---

## Critério de sucesso do MVP

O MVP valida quando o advogado consegue dizer algo como:

> "Eu não precisei abrir o Drive, a agenda e o sistema jurídico separadamente. A IA já me trouxe o contexto."

Hipótese central:

> o maior valor não está em armazenar mais dados, mas em **conectar e orquestrar os dados que já existem nas ferramentas do escritório**.
