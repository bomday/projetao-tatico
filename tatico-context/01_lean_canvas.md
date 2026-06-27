# Lean Canvas — TÁTICO
**Versão 5.0 — MCP Integrador para Advocacia**

---

## A Evolução do Produto

```text
v3.0: memória interna + tools sobre banco próprio
v4.0: camada jurídica com banco, DataJud e integrações
v5.0: MCP integrador de ferramentas do advogado
       Fase 1 (MVP)  — conectores + leitura sob demanda
       Fase 2        — escrita assistida + automações
       Fase 3        — orquestração multi-fonte + workspace jurídico
```

O TÁTICO é uma **camada MCP de integração**. Ele não quer substituir ADVBox, Google Drive, Google Calendar, e-mail ou outras ferramentas do escritório. Ele conecta essas fontes à IA que o advogado já usa e traz contexto sob demanda, na hora da pergunta.

---

## Canvas

### Problema

1. A IA do advogado é boa, mas está cega: ela não enxerga ADVBox, Google Drive, Calendar, e-mail e tribunais ao mesmo tempo.
2. O contexto do caso está espalhado em várias ferramentas; o advogado perde tempo abrindo abas e montando briefing manualmente.
3. Pedir para o advogado cadastrar tudo de novo em outro sistema cria atrito e reduz adoção.
4. O valor está na integração e na orquestração, não em virar mais um software de gestão jurídica.

### Segmentos de clientes

- Primário: escritórios boutique que já usam Claude, ChatGPT ou Gemini e já operam em ferramentas como ADVBox, Google Workspace e WhatsApp.
- Secundário: advogados autônomos tech-savvy que organizam o trabalho em Drive, Calendar, e-mail e documentos soltos.
- Early adopters: quem já disse algo como "a IA é boa, mas não vê nada do meu escritório".

### Proposta de valor única

> "Conecte as ferramentas que você já usa. O TÁTICO faz sua IA enxergar agenda, documentos, processos e contexto sem pedir migração nem cadastro manual."

Versão curta:

> "O MCP que transforma ferramentas isoladas em contexto jurídico conversável."

### Solução

O TÁTICO expõe conectores MCP para as fontes reais do escritório:

- ADVBox e outros sistemas jurídicos
- Google Calendar
- Google Drive
- tribunais e bases públicas
- futuramente e-mail, assinatura e financeiro

O papel do produto é:

1. autenticar nas fontes certas
2. normalizar respostas
3. devolver contexto para a IA no momento da pergunta
4. permitir ações seguras quando fizer sentido

### Canais

- demo ao vivo com escritórios boutique
- LinkedIn LegalTech
- grupos de advogados e comunidades de IA aplicada
- conteúdo comparando "IA genérica" versus "IA com contexto conectado"
- piloto com 1 ou 2 escritórios parceiros

### Fontes de receita

- assinatura mensal por escritório
- preço baseado em número de conectores habilitados e volume de uso
- add-ons futuros para automações, monitoramento e integrações premium

### Estrutura de custos

- hosting do MCP server
- armazenamento mínimo para credenciais, logs e cache
- manutenção de conectores
- suporte de onboarding

Observação: o custo principal não é inferência de LLM, porque a IA continua sendo a do próprio advogado.

### Métricas-chave

- tempo até a primeira conexão útil
- número de conectores ativos por escritório
- perguntas respondidas usando mais de uma fonte
- frequência semanal de uso
- redução percebida de tempo para briefing e preparação

### Vantagem injusta

1. posicionamento claro: não compete com os sistemas existentes; conecta todos eles
2. arquitetura compatível com múltiplas IAs via MCP
3. foco em contexto jurídico brasileiro e workflow real do advogado
4. adoção mais fácil, porque não exige migrar carteira nem manter banco manual paralelo

---

## Mapa de dores × resposta do produto

| Dor | Como o TÁTICO responde | Fase |
|---|---|---|
| "Minha IA não vê meu escritório" | conecta Drive, Calendar, ADVBox e fontes públicas à mesma conversa | MVP |
| "Perco tempo abrindo cinco sistemas antes da audiência" | consulta multi-fonte sob demanda e devolve briefing em uma resposta | MVP |
| "Não quero alimentar outro software" | elimina cadastro manual como etapa principal | MVP |
| "Quero saber o que está na agenda e nos documentos do cliente" | `get_calendar_events` + `search_drive_documents` + `get_case_status` | MVP |
| "Quero que a IA registre algo por mim" | ações de escrita seguras e explícitas em sistemas conectados | Fase 2 |
| "Quero automatizar follow-ups e organização" | automações e rotinas sobre conectores | Fase 2 |

---

## Mudança central da tese

### Tese antiga

> "O TÁTICO guarda a memória do escritório e depois expõe essa memória para a IA."

### Nova tese

> "O TÁTICO conecta a IA às fontes onde o escritório já trabalha e monta o contexto em tempo real."

Consequência direta:

- o banco deixa de ser o centro do produto
- o onboarding deixa de ser "cadastre seus clientes"
- o admin deixa de ser CRUD e vira painel de conexões
- o valor passa a ser integração, autorização e orquestração

---

## Princípios de produto

1. Não pedir duplicação de trabalho.
2. Ler primeiro das fontes já existentes.
3. Escrever só quando houver ação clara e consentimento explícito.
4. Usar cache apenas como apoio técnico, não como fonte principal do negócio.
5. Fazer o advogado sentir que a IA finalmente "enxerga" seu ambiente real.
