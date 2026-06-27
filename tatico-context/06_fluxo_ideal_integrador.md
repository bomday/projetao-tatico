# Fluxo Ideal do Produto
**TÁTICO v5.0 — MCP integrador de ferramentas para advocacia**

---

## Ideia central

O fluxo ideal do TÁTICO parte de um princípio simples:

> o advogado não deve cadastrar tudo de novo em outro sistema; ele deve conectar as ferramentas que já usa e conversar com elas pela IA.

Nesse modelo:

- o **MCP Server** é a camada de integração
- o **Admin Web** é a camada de conexão, permissão e configuração
- as **fontes reais** continuam sendo Drive, Calendar, sistema jurídico, tribunais e outras ferramentas do escritório

---

## Fluxo ideal em uma frase

> Conectar fontes reais do escritório, ativar o MCP na IA e permitir que a IA consulte e combine essas fontes sob demanda.

---

## Fluxo ponta a ponta

### 1. Entrada no produto

O advogado ou escritório:

1. cria conta no TÁTICO
2. entra no painel web
3. vê uma tela simples de onboarding focada em conexões

O produto não começa com:

- cadastro de cliente
- criação manual de fichas
- preenchimento de histórico

O produto começa com:

- **"quais ferramentas você já usa?"**

---

### 2. Conexão das fontes

No onboarding, o usuário conecta as ferramentas principais do trabalho jurídico.

#### Conexões prioritárias

1. `Google Calendar`
2. `Google Drive`
3. `sistema jurídico principal` como ADVBox
4. `fontes públicas` como consulta processual e CNPJ

#### Resultado dessa etapa

O TÁTICO passa a saber:

- quais contas estão conectadas
- quais escopos foram autorizados
- quais conectores estão saudáveis
- quais ferramentas a IA pode consultar

---

### 3. Configuração do MCP

Depois de conectar as fontes, o painel mostra:

1. a configuração pronta do MCP
2. instruções para Claude, ChatGPT ou outro cliente compatível
3. um teste simples de conexão

Objetivo:

> em poucos minutos, a IA do advogado já consegue enxergar o ambiente conectado.

---

### 4. Primeiro momento de valor

O primeiro momento de valor não é "cadastrei tudo".

O primeiro momento de valor é:

> "Fiz uma pergunta real e a IA trouxe contexto que estava espalhado nas minhas ferramentas."

Exemplos de perguntas:

- "O que tenho hoje relacionado à Empresa ABC?"
- "Me prepara para a reunião das 15h."
- "Encontre os documentos do caso da Construtora Norte."
- "Qual a última movimentação desse processo?"

---

### 5. Orquestração pelo MCP

Quando o advogado faz uma pergunta, o TÁTICO atua como orquestrador.

#### Exemplo

Pergunta:

> "Me prepara para a reunião com a Empresa ABC hoje à tarde."

O MCP pode executar algo como:

1. consultar o `Google Calendar` para localizar o evento
2. consultar o `Google Drive` para localizar pasta, contrato, peças e anotações
3. consultar o `sistema jurídico` para localizar processo, tarefa ou status do caso
4. consultar `fonte pública processual`, se houver número de processo
5. devolver tudo isso para a IA em formato útil

A IA então responde com:

- horário e objetivo da reunião
- documentos relevantes
- situação processual ou operacional
- pontos de atenção
- próximos passos sugeridos

---

### 6. Uso diário

Depois do onboarding, o uso ideal é quase todo feito pela IA.

O advogado:

- continua usando Claude ou outra IA
- não precisa abrir o TÁTICO para toda interação
- abre o painel principalmente para conectar, revisar ou corrigir integrações

O TÁTICO vira infraestrutura invisível.

---

## Papel de cada camada

### IA

É a interface principal de conversa.

### TÁTICO MCP

É a camada que:

- autentica
- consulta fontes
- cruza resultados
- normaliza respostas
- executa ações seguras quando permitido

### Admin Web

É o painel de:

- login
- conexões
- escopos OAuth
- configuração MCP
- troubleshooting
- logs básicos

### Ferramentas conectadas

São as fontes reais de trabalho:

- agenda
- documentos
- sistema jurídico
- dados públicos

---

## Fluxo ideal do Admin Web

O painel ideal deve ser orientado a conexões, não a cadastros manuais.

### Tela 1 — Boas-vindas

- mensagem curta de proposta de valor
- lista de conectores recomendados
- botão "conectar minhas ferramentas"

### Tela 2 — Integrações

Cada integração mostra:

- status: conectada ou não
- escopo autorizado
- última sincronização ou última verificação
- botão de reconectar

### Tela 3 — Configuração MCP

- JSON pronto para copiar
- instruções por cliente de IA
- teste de conexão

### Tela 4 — Saúde e diagnóstico

- conectores com erro
- permissões expiradas
- falhas recentes

---

## Fluxo ideal das tools

As tools do MVP ideal devem seguir esta lógica:

### 1. Descobrir o que está conectado

- `list_connected_sources`

### 2. Ler contexto de agenda

- `get_calendar_events`

### 3. Ler contexto documental

- `search_drive_documents`
- `get_drive_document_content`

### 4. Ler contexto jurídico operacional

- `search_matters`
- `get_matter_context`

### 5. Ler contexto jurídico público

- `get_case_status`
- `get_company_info`

### 6. Fase seguinte: agir

- `create_calendar_event`
- `append_matter_note`
- `create_drive_folder`

---

## Diagrama resumido

```text
[Advogado]
    ↓
[Admin TÁTICO]
    ↓ conecta
[Google Calendar] [Google Drive] [Sistema Jurídico] [Fontes Públicas]
    ↓
[MCP Server TÁTICO]
    ↓
[Claude / ChatGPT / outra IA]
    ↓
Resposta consolidada com contexto real
```

---

## Jornada ideal do usuário

### Etapa 1 — Setup

> "Conectei minhas ferramentas."

### Etapa 2 — Ativação

> "A IA já consegue consultar minha agenda, meus documentos e meu sistema."

### Etapa 3 — Primeiro aha moment

> "Não precisei abrir cinco abas para montar contexto."

### Etapa 4 — Hábito

> "Sempre que preciso me preparar para uma reunião, audiência ou atualização, começo perguntando à IA."

---

## O que deve ser evitado no fluxo

1. pedir cadastro manual como requisito principal
2. obrigar o advogado a manter dados duplicados
3. transformar o TÁTICO em mais um software de gestão pesado
4. esconder o valor atrás de configuração longa demais
5. depender de banco interno como se fosse a verdade principal do escritório

---

## Critério de sucesso do fluxo ideal

O fluxo está correto quando acontece isto:

1. o usuário conecta ferramentas em poucos minutos
2. ativa o MCP sem fricção
3. faz uma pergunta real
4. recebe uma resposta montada a partir de múltiplas fontes reais
5. percebe que o ganho veio da integração, não do preenchimento manual

---

## Síntese final

O fluxo ideal do TÁTICO não é:

> cadastrar clientes, criar notas e depois consultar um banco próprio.

O fluxo ideal do TÁTICO é:

> conectar o ecossistema já usado pelo advogado e permitir que a IA navegue por esse ecossistema com contexto, segurança e utilidade jurídica.
