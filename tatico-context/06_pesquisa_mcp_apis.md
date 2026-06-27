# Relatório de Pesquisa — MCP e APIs para o TÁTICO
**Revisão alinhada ao modelo integrador · jun/2026**

---

## Pergunta central

Quais APIs e conectores fazem mais sentido para um produto cujo papel é:

> conectar a IA do advogado às ferramentas que ele já usa, em vez de pedir que ele replique tudo em um banco próprio?

---

## Conclusão executiva

O TÁTICO deve priorizar APIs que permitam:

1. **ler contexto real sob demanda**
2. **combinar múltiplas fontes**
3. **escrever de volta na fonte operacional**, quando necessário
4. **reduzir onboarding**, não aumentar

Isso muda a ordem de prioridade.

### Antes

- importar clientes
- criar memória interna
- estruturar banco próprio

### Agora

- conectar Google Calendar
- conectar Google Drive
- conectar sistema jurídico
- consultar fontes públicas
- permitir ações seguras sobre essas fontes

---

## Transport e arquitetura MCP

### Recomendação

- `HTTP + SSE` como transporte principal do MCP remoto
- `stdio` para uso local em ambiente de desenvolvimento
- preparar evolução futura para `Streamable HTTP`

### Implicação de produto

O MCP Server é o núcleo do produto. O admin existe para:

- login
- OAuth
- conexão das fontes
- geração da configuração MCP
- observabilidade e troubleshooting

---

## APIs prioritárias no modelo integrador

## 1. Google Calendar

### Por que importa

Agenda é uma das fontes mais valiosas para contexto diário:

- reuniões
- audiências
- lembretes
- compromissos críticos

### Valor para o TÁTICO

Permite perguntas como:

- "Quais são minhas prioridades de hoje?"
- "Me prepara para a reunião das 15h."
- "Crie um evento para esse prazo."

### Tools candidatas

- `get_calendar_events`
- `create_calendar_event`
- `schedule_deadline`

### Recomendação

Conector obrigatório do MVP.

---

## 2. Google Drive

### Por que importa

Boa parte do material jurídico real está em:

- pastas
- contratos
- peças
- PDFs
- minutas
- checklists

### Valor para o TÁTICO

Permite perguntas como:

- "Ache os documentos da Empresa ABC."
- "Resuma a última sentença que está na pasta do caso."
- "Quais arquivos preciso revisar antes da audiência?"

### Tools candidatas

- `search_drive_documents`
- `get_drive_document_content`
- `create_drive_folder`

### Recomendação

Conector obrigatório do MVP.

---

## 3. ADVBox

### Status

API REST pública confirmada com Bearer token estático.

### O que muda com a nova visão

O melhor uso da API não é "importar tudo para dentro do TÁTICO".

O melhor uso é:

- ler casos
- ler tarefas
- ler histórico operacional
- localizar processos
- eventualmente escrever de volta na própria ferramenta

### Perguntas que o conector resolve

- "Busque esse cliente no ADVBox."
- "Qual o status desse caso?"
- "Quais tarefas estão abertas para esta semana?"
- "Registre essa atualização no caso."

### Tools candidatas

- `search_matters`
- `get_matter_context`
- `get_advbox_pending_tasks`
- `append_matter_note`

### Recomendação

Conector jurídico principal da Fase 1 ou início da Fase 2, dependendo do tempo de implementação.

---

## 4. DataJud / consulta processual pública

### Por que importa

Complementa o sistema jurídico com dados do tribunal e ajuda quando:

- o caso não está bem acessível na ferramenta principal
- é preciso conferir a última movimentação pública
- o advogado quer validação externa rápida

### Tools candidatas

- `get_case_status`

### Recomendação

Importante para o MVP como fonte pública jurídica.

---

## 5. BrasilAPI CNPJ

### Por que importa

É simples, barata e útil para enriquecer contexto empresarial.

### Perguntas que resolve

- "Qual a situação cadastral da empresa?"
- "Esse CNPJ está ativo?"

### Tools candidatas

- `get_company_info`

### Recomendação

Quick win claro. Deve entrar cedo.

---

## 6. Escavador

### Por que importa

Ajuda a monitorar parte adversa e ampliar cobertura processual.

### Tools candidatas

- `monitor_party`
- fallback para `get_case_status`

### Recomendação

Fase 2. Muito útil, mas não é a primeira conexão essencial do MVP.

---

## Ranking de prioridade corrigido

| Prioridade | Integração | Papel no produto |
|:---:|---|---|
| 1 | Google Calendar | contexto do dia e agenda real |
| 2 | Google Drive | contexto documental |
| 3 | ADVBox | contexto jurídico operacional |
| 4 | DataJud | contexto processual público |
| 5 | BrasilAPI CNPJ | enriquecimento rápido |
| 6 | Escavador | monitoramento e cobertura ampliada |

---

## Tools mais coerentes com a tese integradora

### MVP

- `list_connected_sources`
- `get_calendar_events`
- `search_drive_documents`
- `get_drive_document_content`
- `search_matters`
- `get_matter_context`
- `get_case_status`
- `get_company_info`

### Fase 2

- `create_calendar_event`
- `schedule_deadline`
- `append_matter_note`
- `create_drive_folder`
- `monitor_party`

---

## O que evitar

### Evitar como núcleo do produto

- `sync_from_advbox()` como importação massiva para banco interno
- espelhamento completo de clientes, notas e processos
- onboarding baseado em migração de dados

### Pode existir apenas como apoio técnico

- cache leve
- índice auxiliar
- logs de uso
- estado de integração

---

## Implicações para o admin

O painel web deve ser desenhado para:

1. conectar contas
2. exibir status das integrações
3. regenerar ou revisar credenciais
4. mostrar configuração MCP pronta
5. ajudar em troubleshooting

Não deve ser desenhado como:

- CRM jurídico
- sistema de notas
- repositório manual principal

---

## Conclusão

As APIs certas para o TÁTICO são aquelas que tornam a IA útil sem duplicar trabalho do advogado.

A prioridade correta não é "guardar mais dados". É:

> conectar agenda, documentos, operação jurídica e dados públicos para que a IA consiga navegar por esse ambiente real em tempo de conversa.
