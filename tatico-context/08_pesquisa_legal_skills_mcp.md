# Legal Skills para o TÁTICO MCP — Pesquisa de Mercado
**Skills jurídicas orientadas a contexto conectado · revisão alinhada ao modelo integrador**

> **Pergunta central:** O que os advogados já fazem com IA hoje que o TÁTICO pode fazer melhor ao conectar agenda, documentos, sistema jurídico e fontes públicas?

---

## Princípio desta revisão

As versões anteriores deste material assumiam que as skills dependiam de:

- banco interno do escritório
- notas salvas no TÁTICO
- contexto mantido manualmente no produto

Na visão atual, isso muda.

### Novo princípio

As legal skills do TÁTICO devem depender principalmente de:

1. `fontes conectadas`
2. `consulta sob demanda`
3. `orquestração entre ferramentas`
4. `ações seguras nas próprias fontes`, quando necessário

O valor não é "ter memória própria". O valor é fazer a IA **ler o workspace real do advogado**.

---

## O que é o "Legal Claude" da Anthropic

Legal Claude não é um modelo separado. É Claude aplicado ao setor jurídico com:

- análise de contratos
- resumo de decisões
- redação assistida
- due diligence
- pesquisa jurídica

Implicação para o TÁTICO:

> o Claude genérico já faz bastante coisa; o TÁTICO entra para dar acesso ao contexto real do escritório.

---

## Categorias de skills no modelo integrador

### 1. Skills de preparação

Usadas antes de reunião, audiência, ligação ou entrega.

### 2. Skills de leitura e síntese

Usadas para resumir documentos, decisões e materiais espalhados.

### 3. Skills de organização operacional

Usadas para transformar contexto em próximos passos, agenda e follow-up.

### 4. Skills de redação contextual

Usadas para redigir e-mails, mensagens e minutas com base nas fontes conectadas.

---

## Tier 1 — Skills de maior valor imediato

### `prepare_meeting_briefing`

```text
Descrição: prepara briefing para reunião ou audiência a partir de múltiplas fontes
Fontes: Google Calendar + Google Drive + sistema jurídico + consulta processual
Complexidade: baixa
Valor no TÁTICO: altíssimo, porque cruza agenda, documentos e caso em uma resposta só
Risco: baixo
```

Exemplo:

> "Me prepara para a reunião com a Empresa ABC hoje às 15h."

O TÁTICO:

- localiza o evento na agenda
- encontra a pasta ou documentos no Drive
- busca o caso ou processo na fonte jurídica
- entrega uma visão consolidada

---

### `draft_client_update`

```text
Descrição: redige atualização para cliente em linguagem simples
Fontes: documentos do Drive + contexto do caso na fonte jurídica + consulta processual
Complexidade: baixa
Valor no TÁTICO: evita que o advogado reexplique o caso do zero
Risco: baixo
```

Diferença do modelo antigo:

- antes dependia de histórico interno do TÁTICO
- agora depende do que a IA consegue ler nas fontes conectadas

---

### `summarize_ruling`

```text
Descrição: resume sentença ou acórdão, destacando dispositivo, fundamentos e pontos de atenção
Fontes: texto colado, PDF ou documento encontrado no Drive
Complexidade: baixa
Valor no TÁTICO: médio-alto; pode complementar com status do processo
Risco: médio
```

Melhor fluxo:

1. o advogado cola o texto ou manda localizar o PDF
2. a IA resume
3. opcionalmente sugere ação seguinte

---

### `find_case_material`

```text
Descrição: localiza rapidamente documentos relevantes de um caso ou cliente
Fontes: Google Drive + sistema jurídico
Complexidade: baixa
Valor no TÁTICO: muito alto
Risco: baixo
```

Essa skill não é glamourizada em marketing, mas tem grande valor prático:

> "Ache todos os documentos da Construtora Norte relacionados à rescisão."

---

### `check_today_priorities`

```text
Descrição: mostra compromissos, prazos e materiais do dia
Fontes: Google Calendar + sistema jurídico + fontes públicas, quando aplicável
Complexidade: baixa
Valor no TÁTICO: muito alto para hábito diário
Risco: baixo
```

---

## Tier 2 — Skills muito relevantes na Fase 2

### `organize_next_steps`

```text
Descrição: transforma uma conversa ou reunião em próximos passos estruturados
Fontes: entrada do advogado + ação opcional nas ferramentas conectadas
Complexidade: média
Valor no TÁTICO: alto
Risco: baixo
```

No novo modelo, essa skill não precisa salvar em banco interno. Ela pode:

- criar evento no Calendar
- sugerir atualização no sistema jurídico
- criar pasta ou documento no Drive

---

### `draft_extrajudicial_notice`

```text
Descrição: gera minuta de notificação extrajudicial contextualizada
Fontes: documentos do cliente + dados cadastrais + contexto do caso
Complexidade: baixa
Valor no TÁTICO: alto
Risco: médio
```

---

### `analyze_contract_risks`

```text
Descrição: destaca cláusulas e riscos de contrato
Fontes: documento do Drive ou texto colado + dados de contexto disponíveis
Complexidade: baixa
Valor no TÁTICO: alto
Risco: médio
```

---

### `draft_petition_outline`

```text
Descrição: gera outline de petição com base no contexto disponível
Fontes: documentos do caso + status processual + dados da fonte jurídica
Complexidade: média
Valor no TÁTICO: alto
Risco: alto
```

Regra:

> gerar estrutura, não texto final completo com jurisprudência inventada.

---

### `monitor_party`

```text
Descrição: verifica processos ou exposição pública de parte adversa
Fontes: Escavador, DataJud e outras fontes públicas
Complexidade: média
Valor no TÁTICO: alto
Risco: baixo
```

---

## Tier 3 — Skills mais potentes, mas dependentes de conectores maduros

### `schedule_deadline`

```text
Descrição: cria compromisso de prazo na agenda
Fontes: Calendar + interpretação do ato processual
Complexidade: média
Risco: alto
```

### `append_matter_note`

```text
Descrição: registra atualização no sistema jurídico conectado
Fontes: sistema jurídico da operação
Complexidade: média
Risco: baixo
```

### `create_case_workspace`

```text
Descrição: cria estrutura inicial de pasta e organização documental para novo caso
Fontes: Google Drive
Complexidade: média
Risco: baixo
```

---

## Top skills ranqueadas no modelo novo

| # | Skill | Valor com integração | Viabilidade no MVP | Risco |
|:---:|---|:---:|:---:|:---:|
| 1 | `prepare_meeting_briefing` | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Baixo |
| 2 | `check_today_priorities` | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Baixo |
| 3 | `find_case_material` | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Baixo |
| 4 | `draft_client_update` | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Baixo |
| 5 | `summarize_ruling` | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Médio |
| 6 | `organize_next_steps` | ⭐⭐⭐⭐ | ⭐⭐⭐ | Baixo |
| 7 | `analyze_contract_risks` | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Médio |
| 8 | `draft_extrajudicial_notice` | ⭐⭐⭐⭐ | ⭐⭐⭐ | Médio |
| 9 | `draft_petition_outline` | ⭐⭐⭐⭐ | ⭐⭐⭐ | Alto |
| 10 | `monitor_party` | ⭐⭐⭐⭐ | ⭐⭐⭐ | Baixo |

---

## 3 Quick Wins do modelo integrador

### Quick Win #1 — `prepare_meeting_briefing`

Pergunta:

> "Me prepara para a reunião com a Empresa ABC."

Leituras:

- agenda
- documentos
- sistema jurídico

Saída:

- objetivo da reunião
- materiais relevantes
- situação do caso
- pontos de atenção

---

### Quick Win #2 — `check_today_priorities`

Pergunta:

> "Quais são minhas prioridades de hoje?"

Leituras:

- eventos do dia
- tarefas ou compromissos na fonte jurídica
- eventual prazo ou movimentação relevante

Saída:

- lista organizada do que exige atenção

---

### Quick Win #3 — `find_case_material`

Pergunta:

> "Ache tudo sobre a rescisão da Construtora Norte."

Leituras:

- busca de arquivos no Drive
- busca de caso no sistema jurídico

Saída:

- pasta principal
- documentos correlatos
- contexto jurídico associado

---

## Mapa de dependências no modelo novo

```text
Google Calendar ───────┐
                       ├──► prepare_meeting_briefing
Google Drive ──────────┤
                       ├──► check_today_priorities
Sistema jurídico ──────┤
                       ├──► draft_client_update
Fonte processual ──────┘

Google Drive ─────────────► summarize_ruling
Google Drive ─────────────► analyze_contract_risks
Sistema jurídico ─────────► draft_petition_outline
Fonte pública ────────────► monitor_party

Fase 2:
Calendar write-back ─────► schedule_deadline
Sistema jurídico write-back ─► append_matter_note
Drive write-back ────────► create_case_workspace
```

---

## Alertas de risco

### Alto risco — prazo processual automático

Não transformar cálculo de prazo em verdade absoluta.

### Alto risco — peça pronta com jurisprudência

Não gerar documento final como se fosse definitivo.

### Médio risco — análise contratual como substituto de revisão

Sempre apresentar como apoio à revisão profissional.

---

## Conclusão

No modelo antigo, as legal skills eram extensões de uma base interna do TÁTICO.

No modelo atual, elas são melhores descritas assim:

> padrões de uso da IA que ficam muito mais valiosos quando a IA consegue navegar por agenda, documentos, sistema jurídico e fontes públicas conectadas.

Essa mudança deixa as skills mais coerentes com a tese principal do produto: integração primeiro, armazenamento próprio só quando realmente necessário.
