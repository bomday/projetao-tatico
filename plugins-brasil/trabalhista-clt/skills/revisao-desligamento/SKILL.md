---
name: revisao-desligamento
description: >
  Revisão de desligamento de empregado CLT — verificação de modalidade (sem
  justa causa, com justa causa, pedido de demissão, rescisão por acordo mútuo,
  aposentadoria), cálculo de verbas rescisórias, prazo de pagamento, documentação
  exigida e riscos. Use quando o usuário disser "vamos demitir", "o empregado
  pediu demissão", "como calcular as verbas", "revisão de rescisão".
argument-hint: "[modalidade de desligamento + dados básicos: tempo de serviço, salário, benefícios]"
---

# /revisao-desligamento

> **Aviso:** Este output é suporte a profissionais jurídicos. Não constitui
> assessoria jurídica. Rescisão contratual trabalhista tem prazo de pagamento
> exíguo (CLT Art. 477) e erros geram multa. Consulte advogado trabalhista
> habilitado pela OAB antes de executar qualquer desligamento, especialmente
> com justa causa. Verifique valores e prazos na tabela vigente.

---

# Revisão de Desligamento (CLT)

## Finalidade

Verificar a modalidade correta de desligamento, listar as verbas rescisórias
devidas, identificar prazos e documentação exigida, e sinalizar riscos.

**Base normativa principal:**
- CLT Art. 477-486 (rescisão do contrato de trabalho) `[modelo — verificar-pinpoint]`
- CLT Art. 9º (nulidade de atos que fraudam a lei)
- CF Art. 7º, I (proteção contra dispensa arbitrária ou sem justa causa)
- CF Art. 7º, III (FGTS)
- Lei 8.036/90 (FGTS) `[modelo — verificar]`
- Lei 12.506/2011 (aviso prévio proporcional) `[modelo — verificar]`
- Convenção coletiva da categoria (verificar `CLAUDE.md`)

## Passo 1: Identificar a modalidade de desligamento

| Modalidade | Iniciativa | Principais características |
|---|---|---|
| **Dispensa sem justa causa** | Empregador | Aviso prévio + FGTS + 40% multa FGTS + verbas proporcionais |
| **Dispensa com justa causa** | Empregador | Sem aviso prévio; sem saque do FGTS (exceto saldo); sem multa FGTS; sem 13º proporcional nem férias proporcionais (exceto vencidas) — **ALTO RISCO: reversão judicial frequente** |
| **Pedido de demissão** | Empregado | Aviso prévio (ou indenização); sem FGTS 40%; sem seguro-desemprego |
| **Rescisão por acordo mútuo** | Ambos | CLT Art. 484-A: metade do aviso prévio; 20% multa sobre FGTS (não 40%); saque de 80% do FGTS; sem seguro-desemprego `[modelo — verificar-pinpoint]` |
| **Término de contrato por prazo determinado** | — | Indenização de 50% dos salários devidos até o fim do prazo se o empregador rescinde; aviso prévio não obrigatório (verificar CCT) |
| **Aposentadoria espontânea** | Empregado | Extingue o contrato; novo vínculo pode ser criado após |

**Se a modalidade for JUSTA CAUSA:** parar imediatamente e escalar para advogado
trabalhista antes de qualquer ato. Justa causa (CLT Art. 482) exige fato grave,
comprovado, punido com proporcionalidade e sem demora (imediatidade da punição).
A reversão em reclamação trabalhista é frequente. Custos de uma justa causa revertida
incluem todas as verbas da dispensa sem justa causa + possível dano moral.
`[modelo — verificar]`

## Passo 2: Calcular verbas rescisórias

> **Aviso de cálculo:** Os valores abaixo são um guia conceitual. Para o cálculo
> preciso, use a folha de pagamento com os dados reais (salário base + adicionais
> habituais + médias de horas extras + médias de comissões + outros habitualmente
> pagos). Consultar contador/DP e advogado trabalhista.

### Dispensa sem justa causa (mais comum)

| Verba | Base de cálculo | Observação |
|---|---|---|
| **Aviso prévio** | 30 a 90 dias (Lei 12.506/2011: 3 dias por ano completado, máx. 90) | Trabalhado ou indenizado `[modelo — verificar]` |
| **Saldo de salário** | Dias trabalhados no mês da rescisão | |
| **13º salário proporcional** | 1/12 por mês ou fração ≥ 15 dias trabalhados | |
| **Férias vencidas** (se houver) | 30 dias + 1/3 constitucional (CF Art. 7º, XVII) | Se o período aquisitivo completou e não foram gozadas |
| **Férias proporcionais** | Meses do período aquisitivo em curso + 1/3 | |
| **Multa FGTS** | 40% sobre o saldo da conta FGTS (não sobre os depósitos do mês) | Lei 8.036/90 Art. 18, §1º `[modelo — verificar]` |
| **Liberação do saldo FGTS** | Saldo integral da conta | Guia GRFC para saque |

**Desoneração da multa:** a multa de 40% é calculada sobre todos os depósitos do
FGTS do período de vigência do contrato, incluindo depósitos sobre aviso prévio
indenizado. `[modelo — verificar — jurisprudência TST]`

**Habitualidade de parcelas:** Horas extras, comissões, gorjetas e benefícios
pagos habitualmente integram o salário para fins de cálculo das verbas rescisórias
(CLT Art. 457 + entendimento do TST). `[modelo — verificar — súmulas do TST]`

### Pedido de demissão

| Verba | Observação |
|---|---|
| Aviso prévio trabalhado ou descontado | Empregado deve trabalhar o aviso; se dispensado, valor pode ser descontado |
| Saldo de salário | |
| 13º proporcional | |
| Férias vencidas (se houver) | |
| Férias proporcionais | |
| **Sem** multa de 40% FGTS | |
| **Sem** saque do FGTS (salvo exceções legais) | |
| **Sem** seguro-desemprego | |

### Rescisão por acordo mútuo (CLT Art. 484-A)

- Aviso prévio: metade (não inferior a 15 dias)
- Multa FGTS: 20% (não 40%)
- Saque FGTS: 80% do saldo
- Seguro-desemprego: não tem direito `[modelo — verificar]`

## Passo 3: Prazo de pagamento das verbas (CLT Art. 477)

> ⚠️ PRAZO EXÍGUO — o não-pagamento no prazo gera multa.

**Prazo:** até o 10º dia corrido contado da data do desligamento. `[modelo — verificar-pinpoint]`

**Multa por atraso:** 1 salário do empregado (CLT Art. 477, §8º). `[modelo — verificar-pinpoint]`

**Forma de pagamento:** depósito bancário em conta do empregado ou pagamento em
dinheiro (vedado cheque para muitas situações — verificar CCT). `[modelo — verificar]`

## Passo 4: Documentação obrigatória

| Documento | Obrigação |
|---|---|
| **Termo de Rescisão do Contrato de Trabalho (TRCT)** | Documento formal de rescisão; gerado pelo eSocial |
| **CTPS** | Dar baixa na data correta |
| **Exame demissional** | Obrigatório (CLT Art. 168 — verificar prazo conforme NR-7 e se PCO dispensa) `[modelo — verificar]` |
| **Guia do Seguro-Desemprego** | Fornecer ao empregado se tiver direito (dispensa sem justa causa) |
| **Guia de Saque FGTS (GRFC)** | Para liberação do FGTS |
| **Comunicado de Demissão ao Sindicato** | Se previsto em CCT |
| **Extrato do FGTS** | Disponibilizar ao empregado |

**Homologação (CLT Art. 477, §1º):** Para empregados com mais de 1 ano de vínculo,
a rescisão deve ser assistida por advogado da parte ou sindicato da categoria
profissional. `[modelo — verificar — regras após Reforma Trabalhista]`

## Passo 5: Verificação de restrições ao desligamento

Verificar se o empregado tem estabilidade ou garantia de emprego que impede a
dispensa sem justa causa:

| Hipótese | Base legal | Período |
|---|---|---|
| Acidente de trabalho | CLT Art. 118 | 12 meses após alta médica |
| Doença ocupacional | CLT Art. 118 + Súmula 378 TST | Enquanto durar + 12 meses |
| Gravidez (gestante) | ADCT Art. 10, II, b (CF/88) | Desde a confirmação até 5 meses após parto |
| Membro de CIPA | CLT Art. 165 + ADCT | Durante mandato + 1 ano |
| Membro de comissão de negociação coletiva | CLT Art. 612 e ss. | Durante negociação + 3 meses |
| Dirigente sindical | CLT Art. 543, §3º | Registro até 1 ano após mandato |
| Candidato a dirigente sindical | CLT Art. 543, §3º | Desde registro + período pós |
| Vítima de doença grave | Súmula 443 TST (presume discriminação) | [verificar] |
| Portador de deficiência (cota) | Lei 8.213/91 Art. 93 | Reintegração obrigatória se cota não for mantida |

`[modelo — verificar — verificar se a lista está completa e atualizada com
jurisprudência do TST]`

Se qualquer hipótese de estabilidade for identificada: **parar e escalar para
advogado trabalhista imediatamente.**

## Passo 6: Output

```markdown
[CABEÇALHO DE TRABALHO JURÍDICO]

## Revisão de Desligamento
**Empregado:** [identificar sem expor dados desnecessários]
**Data do desligamento:** [data]
**Modalidade:** [identificada no Passo 1]

### Estabilidades verificadas
[🟢 Nenhuma identificada | 🔴 Identificada — ver detalhe abaixo]

### Verbas rescisórias (estimativa — verificar com DP/contador)

| Verba | Valor estimado | Observação |
|---|---|---|
[tabela do Passo 2]

### Prazo de pagamento
Até [data = desligamento + 10 dias corridos].
Multa por atraso: 1 salário (`[modelo — verificar]`).

### Documentação a providenciar
[lista do Passo 4 com status]

### Riscos identificados
[lista de sinalizações — ex.: "horas extras habituais devem ser incluídas nas
médias"; "exame demissional pendente de agendamento"]

### Próximos passos
1. [ação específica com responsável e prazo]
```

## O que esta skill não faz

- Não faz o cálculo numérico preciso das verbas — isso requer os dados reais da
  folha de pagamento e deve ser feito pelo DP ou contador.
- Não decide sobre justa causa. Apenas sinaliza o risco e escala ao advogado.
- Não substitui a assistência na homologação quando exigida.
