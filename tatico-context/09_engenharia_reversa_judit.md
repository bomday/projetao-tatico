# Engenharia Reversa: JUDIT
**Benchmark competitivo lido a partir da tese atual do TÁTICO**

---

## Objetivo deste documento

Este arquivo resume o que importa da análise competitiva da JUDIT para a estratégia atual do TÁTICO.

O ponto principal é este:

> a JUDIT ajuda a mostrar que existe demanda por um MCP jurídico no Brasil, mas a proposta atual do TÁTICO não deve copiar uma lógica de base própria e ingestão manual como centro do produto.

---

## O que a JUDIT valida

1. Existe interesse real em consulta processual integrada à IA.
2. Existe espaço de mercado para um produto jurídico orientado a MCP.
3. O advogado valoriza acesso rápido a contexto e fontes externas.

---

## O que a JUDIT não define para o TÁTICO

Ela não deve definir automaticamente:

- o fluxo de onboarding
- a arquitetura de dados do produto
- a necessidade de banco próprio como núcleo
- a decisão de criar um software paralelo de gestão

---

## Leitura estratégica para o TÁTICO

### Tese antiga que precisa ser evitada

"Vamos construir uma base interna de clientes, processos e notas e depois expor isso via MCP."

### Tese atual recomendada

"Vamos conectar a IA às ferramentas reais já usadas pelo advogado e trazer contexto sob demanda."

---

## Comparação de posicionamento

### JUDIT

- puxa para consulta processual e camada jurídica especializada
- sugere valor em centralização e produto próprio

### TÁTICO

- deve puxar para integração
- deve ficar acima das ferramentas já usadas
- deve ganhar por conectar agenda, documentos, sistema jurídico e fontes públicas

---

## Diferença prática de arquitetura

### Arquitetura centrada em base própria

- exige ingestão
- cria retrabalho
- aumenta atrito de adoção
- desloca o produto para "mais um sistema"

### Arquitetura centrada em integração

- conecta fontes já existentes
- reduz fricção
- aproveita os dados no lugar onde eles já vivem
- transforma a IA em interface do workspace jurídico

---

## Roadmap recomendado após essa leitura competitiva

### MVP

1. `list_connected_sources`
2. `get_calendar_events`
3. `search_drive_documents`
4. `get_drive_document_content`
5. `search_matters`
6. `get_matter_context`
7. `get_case_status`

### MVP+

1. `create_calendar_event`
2. `append_matter_note`
3. `schedule_deadline`
4. monitoramento de parte
5. briefing multi-fonte

---

## Conclusão

A utilidade principal da análise da JUDIT hoje é competitiva, não arquitetural.

Ela reforça que há espaço para um MCP jurídico no Brasil, mas o TÁTICO deve ocupar esse espaço com uma tese mais leve e mais aderente ao comportamento real do advogado:

> conectar o ecossistema já usado pelo escritório e permitir que a IA navegue por ele, em vez de pedir que o escritório reconstrua esse ecossistema dentro do produto.
