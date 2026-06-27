---
name: triagem-cliente
description: >
  Triagem estruturada de novo caso/cliente — identifica a área jurídica, avalia
  se está dentro do escopo da clínica, coleta fatos essenciais, sinaliza urgências
  e prazos, e prepara o resumo do caso para o advogado supervisor. Use quando um
  novo cliente chegar ou quando o usuário disser "triagem de cliente", "novo caso",
  "avaliar se atendemos".
argument-hint: "[descreva brevemente o caso ou deixe em branco para fazer a triagem interativa]"
---

# /triagem-cliente

> **Aviso:** Este output é suporte a profissionais jurídicos. Não constitui
> assessoria jurídica. A triagem identifica o problema e verifica o escopo;
> a orientação jurídica é dada pelo advogado supervisor habilitado pela OAB.
> Não prometa ao cliente qualquer resultado ou estratégia antes da revisão
> do supervisor.

1. Carregar `CLAUDE.md` → escopo da clínica, critérios de aceite, encaminhamentos.
2. Coletar fatos essenciais (interativo ou a partir da descrição fornecida).
3. Classificar a área jurídica e verificar se está no escopo.
4. Identificar urgências e prazos.
5. Produzir resumo do caso para o supervisor.

---

# Triagem de Caso

## Finalidade

Coletar as informações essenciais sobre o caso de forma estruturada, identificar
a área jurídica, verificar se está no escopo da clínica, sinalizar urgências e
preparar o resumo para o advogado supervisor.

**Regra de ouro:** A triagem coleta e organiza. Nenhuma orientação jurídica
substantiva é dada ao cliente durante a triagem — isso é feito pelo advogado
supervisor após análise do caso completo.

## Workflow

### Passo 1: Identificação (sem dados sensíveis desnecessários)

Coletar apenas o necessário para abertura do caso:

```
Nome: [apenas prenome para registro interno inicial]
Contato: [telefone ou e-mail]
Como chegou até nós: [indicação / busca / mutirão / outro]
Renda familiar aproximada: [para verificar critério de aceite]
```

### Passo 2: Descrição do problema

Deixar o cliente narrar o problema sem interrupções. Anotar:

- **O que aconteceu?** [fatos principais em ordem cronológica]
- **Quando aconteceu?** [datas relevantes — essencial para verificar prescrição/
  decadência]
- **Quem está envolvido?** [partes, sem dados desnecessários]
- **O que o cliente quer?** [resultado desejado — nem sempre corresponde ao
  pedido juridicamente viável]
- **Há documentos?** [listar o que o cliente tem]

### Passo 3: Classificar a área jurídica

Identificar a área principal e secundária:

| Área | Exemplos de problemas |
|---|---|
| **Direito do Consumidor** (CDC) | Cobrança indevida, produto com defeito, negativa de serviço, superendividamento |
| **Direito de Família** | Divórcio, guarda, alimentos, reconhecimento de paternidade |
| **Direito Previdenciário** | Benefício negado/cancelado pelo INSS, aposentadoria, BPC/LOAS |
| **Direito Trabalhista** | Verbas rescisórias, FGTS, assédio, acidente de trabalho |
| **Direito do Inquilinato** (Lei 8.245/91) | Despejo, renovação, revisão de aluguel |
| **Direito Penal** (se na área da clínica) | Boletim de ocorrência, ameaça, lesão corporal |
| **Registros/Documentação** | Retificação de registro, certidão, documentos civis |
| **Habitação / MPDV** | Regularização de imóvel, usucapião, conflito com construtora |

### Passo 4: Verificar escopo da clínica

Carregar `CLAUDE.md` → áreas de atuação e critérios de aceite.

**Resultado:**
- [ ] **Dentro do escopo** — prosseguir com triagem completa
- [ ] **Fora do escopo por área** — encaminhar para [serviço indicado no CLAUDE.md]
- [ ] **Fora do escopo por renda** — verificar outras opções de assistência
- [ ] **Capacidade esgotada** — lista de espera ou encaminhamento

Se fora do escopo, fornecer ao cliente o encaminhamento adequado de forma clara
e com os contatos necessários. Nenhum caso deve ser dispensado sem um encaminhamento.

### Passo 5: Verificar urgências e prazos

**Perguntar explicitamente:**
- "Já existe processo aberto?" [Sim → obter número, verificar próximo ato]
- "Você recebeu alguma citação, intimação ou mandado?" [Sim → URGENTE, ver prazos]
- "Há algum prazo que você conhece?" [anotar e verificar]
- "Algum bem está sendo penhorado ou contas foram bloqueadas?" [URGENTE]

**Prazos a verificar (estimativas — confirmar com advogado):**

| Situação | Prazo de atenção |
|---|---|
| Contestação em processo | 15 dias (rito comum CPC) ou 30 dias (Fazenda Pública) `[modelo — verificar]` |
| Recurso (apelação) | 15 dias `[modelo — verificar]` |
| Reclamação trabalhista | Prescrição 2 anos após término do vínculo `[modelo — verificar]` |
| Ação de consumidor | Prescrição 5 anos (CDC Art. 27 para reparação de dano por fato do produto/serviço); 1 ano para vícios `[modelo — verificar-pinpoint]` |
| INSS — recurso de negativa | 30 dias da ciência do indeferimento `[modelo — verificar]` |
| Prazo de defesa em processo administrativo | Verificar o ato |

**Se houver urgência:** sinalizar imediatamente ao supervisor antes de completar
a triagem.

### Passo 6: Resumo do caso para o supervisor

```markdown
[CABEÇALHO DE TRABALHO JURÍDICO]

## Triagem de Caso — [código interno, sem nome completo]
**Data:** [data]
**Triado por:** [nome do estagiário / responsável]
**Supervisor:** [nome]

### Elegibilidade
- Área coberta: [Sim / Não — se não, encaminhamento feito para: X]
- Critério de renda: [Aprovado / Não se aplica]
- Capacidade: [Caso aceito / Lista de espera]

### Resumo dos fatos
[3-5 linhas descrevendo o problema em ordem cronológica]

### Área jurídica identificada
[Principal]: [área]
[Secundária, se houver]: [área]

### O que o cliente quer
[resultado desejado pelo cliente, em suas palavras]

### Documentos disponíveis
| Documento | Tem? | Observação |
|---|---|---|
| [contrato / notificação / decisão / etc.] | [Sim/Não] | |

### Urgências e prazos
[🔴 URGENTE: descrição | 🟡 Prazo em X dias: descrição | 🟢 Sem urgência imediata]

### Perguntas para o supervisor
1. [pergunta específica]
2. [pergunta específica]

### Próximos passos sugeridos
- [ ] Supervisor revisar o caso
- [ ] [ação específica com responsável]
```

## O que esta skill não faz

- Não dá orientação jurídica ao cliente. Coleta fatos e organiza para o supervisor.
- Não calcula valores de pedidos. Isso é feito pelo advogado após análise.
- Não decide sobre aceitação do caso. A decisão final é do supervisor.
- Não verifica prescrição de forma definitiva — sinaliza o risco para que o
  supervisor confirme.
