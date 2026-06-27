---
name: analise-gap-lgpd
description: >
  Compara os requisitos da LGPD (e de normas setoriais aplicáveis) com a prática
  atual da organização — produz lista de lacunas e plano de remediação com
  responsáveis e prazos. Use quando o usuário pergunta "estamos conformes com a
  LGPD?", "o que precisamos ajustar para a LGPD?", "análise de gap de privacidade"
  ou cola texto de nova resolução da ANPD.
argument-hint: "[norma ou área específica, ou cole o texto da resolução/guia]"
---

# /analise-gap-lgpd

> **Aviso:** Este output é suporte a profissionais jurídicos. Não constitui
> assessoria jurídica. Verifique todas as citações no texto consolidado vigente
> em www.planalto.gov.br e nos atos normativos da ANPD.

1. Carregar perfil da prática (`CLAUDE.md` deste plugin) → compromissos de
   privacidade, footprint regulatório, sistemas de dados.
2. Escopo: a norma/requisito se aplica? (porte, setor, tipo de tratamento)
3. Extrair requisitos → comparar com estado atual → lista de lacunas.
4. Plano de remediação com responsáveis, prazos e priorização.
5. Salvar documento datado. Mesmo "sem lacunas" deve ser documentado.

---

# Análise de Lacunas LGPD

## Finalidade

Identificar o que a organização precisa mudar para estar — ou permanecer —
em conformidade com a LGPD (Lei 13.709/2018) e normas da ANPD.

Este workflow compara os requisitos normativos com o que o perfil da prática
documenta sobre o estado atual, e produz um plano de remediação acionável.

## Carregar estado atual

Ler `CLAUDE.md` deste plugin:
- `## Compromissos públicos de privacidade` — o que foi prometido publicamente
- `## Footprint regulatório` — o que já se aplica
- `## Processo de atendimento a titulares` → lista de sistemas

Se a norma não se aplica (porte, setor, tipo de dado), a análise é uma linha:
"Não se aplica. Motivo: [razão]. Nenhuma ação necessária."

## Workflow

### Passo 1: Escopo da norma

Antes de comparar, responder:

- **Aplica-se?** Porte da organização (Res. CD/ANPD nº 2/2022 tem tratamento
  diferenciado para agentes de pequeno porte), setor, tipo de dado tratado,
  localização dos titulares.
- **Quando?** Data de vigência, data de início da fiscalização (podem ser
  diferentes), fases de implementação.
- **O que é realmente novo?** Muitas resoluções da ANPD apenas regulamentam
  o que já está na LGPD. Identificar o delta.

### Passo 2: Extrair requisitos

| # | Requisito | Dispositivo | Categoria |
|---|---|---|---|
| 1 | [requisito conforme a norma] | [Art. X, LGPD / Res. ANPD nº Y/Z] | [ver abaixo] |

**Categorias:**
- **Aviso/Transparência** — o que informar aos titulares (política de privacidade,
  aviso de coleta, Art. 9º e 18, VI LGPD)
- **Direitos** — o que o titular pode requerer (Art. 18 LGPD)
- **Base legal** — adequação das bases legais usadas (Art. 7º e 11 LGPD)
- **Segurança** — medidas técnicas e organizacionais (Art. 46-49 LGPD)
- **Operadores/Fornecedores** — obrigações a repassar (Art. 37-39 LGPD)
- **Consentimento** — coleta, gestão, revogação (Art. 8º LGPD)
- **Governança** — encarregado, RIPD, registros (Art. 37-41 e 50 LGPD)
- **Transferência Internacional** — base para transferir (Art. 33-36 LGPD)
- **Incidentes** — comunicação à ANPD e aos titulares (Art. 48 LGPD)

### Passo 3: Comparação com estado atual

Para cada requisito:

```markdown
### [Requisito #N]: [nome curto]

**A norma exige:** [requisito citado ou parafraseado]
**Dispositivo:** [Art. X LGPD | Res. ANPD nº Y/Z, Art. X] `[modelo — verificar-pinpoint]`

**Atualmente fazemos:** [o que o CLAUDE.md / política / prática mostra]

**Lacuna:** [Nenhuma | Parcial | Total]

**Se parcial/total — o que falta:** [específico]

**Esforço para fechar:** [Atualização de política | Mudança de produto/sistema |
Renegociação com fornecedor | Novo processo | Treinamento]

**Risco de não-conformidade:** [sanção administrativa Art. 52 LGPD (até 2% do
faturamento, limitado a R$50M por infração) | risco reputacional | ação judicial
de titular]
```

> **Sobre sanções:** As sanções do Art. 52 LGPD incluem: advertência; publicização
> da infração; bloqueio ou eliminação dos dados; suspensão parcial do banco de dados;
> proibição parcial ou total da atividade de tratamento; multa simples de até 2% do
> faturamento do grupo econômico no Brasil no último exercício, limitada a R$50M
> por infração; multa diária. A ANPD segue Res. CD/ANPD nº 4/2023 para o processo
> administrativo sancionador. `[modelo — verificar]`

### Passo 4: Priorizar

1. **Prazo duro com fiscalização ativa** — prazos da ANPD com enforcement real
2. **Relação esforço-impacto** — atualização de texto de política é barata;
   redesign de sistema não é
3. **O que já está quase pronto** — se 80% do caminho já foi feito (ex.: para RGPD),
   o delta pode ser pequeno

### Passo 5: Plano de remediação

Incluir cabeçalho de trabalho jurídico do perfil da prática.

> **Pré-voo de pesquisa.** Antes de emitir o plano, verificar se há resolução ou
> guia da ANPD atualizado para os requisitos analisados. Registrar na nota do
> revisor: `não conectado — citações do conhecimento do modelo; datas de vigência
> e prazos de enforcement são os itens com maior risco de desatualização — verificar
> primeiro no portal da ANPD (www.gov.br/anpd)`.

```markdown
[CABEÇALHO DE TRABALHO JURÍDICO]

## Plano de Remediação LGPD: [Norma / Área]

**Vigência:** [data]
**Início da fiscalização:** [data, se diferente]

### Obrigatório antes do início da fiscalização

| Lacuna | Correção | Responsável | Prazo | Status |
|---|---|---|---|---|
| [lacuna] | [correção específica] | [nome/área] | [data] | [ ] |

### Recomendado (risco menor, não bloqueante)

[mesma tabela]

### Já conforme

[lista de requisitos sem lacuna — útil para evidenciar que o levantamento foi feito]

### Lacunas aceitas (risco aceito formalmente)

[se houver — com justificativa documentada e aprovador]
```

## Categorias comuns de requisitos LGPD

Ao escopar o delta, posicionar a norma/resolução em uma categoria e pesquisar
os requisitos específicos vigentes:

- **Bases legais de tratamento** — Art. 7º (dado comum) e Art. 11 (dado sensível).
  Dado sensível exige base mais restrita: consentimento específico e destacado, ou
  hipóteses do Art. 11, II sem consentimento. `[modelo — verificar]`
- **Direitos dos titulares** — Art. 18 (acesso, correção, eliminação, portabilidade,
  informação sobre compartilhamento, oposição, revogação do consentimento).
  Prazo: LGPD não fixa; ANPD orienta razoabilidade; boas práticas apontam 15 dias.
  `[modelo — verificar]`
- **Segurança e incidentes** — Art. 46-49 (medidas de segurança) e Art. 48
  (comunicação de incidentes à ANPD "em prazo razoável" — ANPD orienta 3 dias úteis
  para comunicação inicial, com complementação posterior). `[modelo — verificar]`
- **RIPD** — Art. 38 LGPD: ANPD pode solicitar. Guia ANPD de 2021 orienta casos
  de uso de alto risco. `[modelo — verificar]`
- **Encarregado (DPO)** — Art. 41 LGPD: indicação obrigatória, divulgação pública
  obrigatória. Res. CD/ANPD nº 2/2022: agentes de pequeno porte podem ser dispensados.
  `[modelo — verificar]`
- **Transferência Internacional** — Art. 33-36 LGPD: países com nível adequado
  (lista ANPD), cláusulas contratuais padrão, normas corporativas globais, outros
  mecanismos. ANPD ainda em processo de regulamentação detalhada. `[modelo — verificar]`
- **Registros de operações (Art. 37 LGPD)** — operadores devem manter registro
  das operações de tratamento realizadas. `[modelo — verificar]`

## Integração com outras skills

**De RIPD:** RIPDs sinalizam inconsistências com a política de privacidade →
alimentam esta análise como lacunas conhecidas.

**Para revisão de contratos de dados:** esta análise pode revelar lacunas em
contratos com operadores.

## Output

Salvar como documento markdown datado. O plano de remediação vira um tracker —
atualizar status conforme itens são fechados.

Se a análise concluir "sem lacunas", documentar mesmo assim — é evidência de que
o levantamento foi feito.

**Fechar com nota de verificação de citações:**

> As citações neste output foram geradas por modelo de IA e não foram verificadas
> contra fonte primária. Antes de usar qualquer artigo, resolução, prazo ou
> threshold, verifique no texto consolidado vigente em www.planalto.gov.br e no
> portal da ANPD (www.gov.br/anpd). Citações com `[modelo — verificar-pinpoint]`
> têm maior risco de imprecisão e devem ser verificadas com prioridade.

## O que esta skill não faz

- Não interpreta de forma autoritativa dispositivos ambíguos da LGPD. Quando
  a norma admite leitura A ou B, diz isso: "O Art. X pode ser lido como [A] ou
  [B]. [A] é a interpretação conservadora. Recomenda-se consulta jurídica se
  o ponto for material."
- Não monitora alterações normativas proativamente. Roda quando apontada a uma
  mudança.
- Não implementa as correções. Planeja-as.
