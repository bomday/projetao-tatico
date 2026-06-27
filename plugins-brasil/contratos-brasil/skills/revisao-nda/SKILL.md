---
name: revisao-nda
description: >
  Triagem rápida de Acordos de Confidencialidade (NDA/ACC) inbound em
  VERDE / AMARELO / VERMELHO para que o time jurídico só gaste tempo nos que
  precisam. Construído para equipes de vendas e BD se auto-servirem antes de
  acionar o jurídico. Use quando chegar um acordo de confidencialidade para revisão.
argument-hint: "[arquivo | cole o texto do acordo]"
---

# /revisao-nda

> **Aviso:** Este output é suporte a profissionais jurídicos. Não constitui
> assessoria jurídica. Verifique a legislação aplicável e consulte advogado
> habilitado pela OAB antes de assinar qualquer instrumento.

1. Carregar `CLAUDE.md` → playbook de NDAs. Se não configurado, parar.
2. Obter o acordo. Determinar o lado (quem divulga, quem recebe).
3. Triagem cláusula a cláusula conforme playbook.
4. Output: VERDE / AMARELO / VERMELHO com itens específicos.

---

# Revisão de Acordo de Confidencialidade (NDA/ACC)

## Finalidade

A maioria dos acordos de confidencialidade que chegam está OK. Alguns têm
armadilhas. Esta skill os classifica em menos de um minuto para que o jurídico
só leia os que importam.

**Base normativa relevante:**
- CC Art. 421-422 (função social e boa-fé objetiva) `[modelo — verificar-pinpoint]`
- CC Art. 184 (manutenção da parte válida em caso de nulidade parcial)
  `[modelo — verificar-pinpoint]`
- CC Art. 189 e ss. (prescrição — prazo das obrigações de confidencialidade)
  `[modelo — verificar-pinpoint]`
- Lei 9.279/96 (Propriedade Industrial — segredo de negócio) se a confidencialidade
  envolver tecnologia/segredo industrial `[modelo — verificar]`
- CDC Art. 51 se uma das partes for consumidor (cláusulas abusivas)
  `[modelo — verificar]`

## Carregar o playbook primeiro

**Qual lado?** Determinar em qual posição a empresa está neste acordo. Geralmente
óbvio: se a contraparte é um fornecedor ou parceiro avaliando nosso produto, somos
o divulgador (lado vendedor); se estamos avaliando o produto deles, somos o receptor
(lado comprador). NDAs mútuos ainda têm um lado — de quem é o papel?

Ler a seção de playbook correspondente (`### Playbook — Lado Vendedor` ou
`### Playbook — Lado Comprador`) do `CLAUDE.md`.

**Antes de triar qualquer coisa, ler `CLAUDE.md` → playbook → seção de NDA.**
Esta skill não tem posições padrão hardcoded — o mercado, a lei e o apetite de
risco de cada equipe variam demais para padrões serem seguros.

Se o playbook não cobrir um termo que aparece no NDA, perguntar:

> Seu playbook não cobre [termo — ex.: "cláusula residuals", "prazo de sobrevivência",
> "NDAs unilaterais onde você é receptor"]. Qual é sua posição padrão — quando deve
> ser VERDE, quando AMARELO, quando VERMELHO? Vou adicionar ao `CLAUDE.md` para que
> a próxima revisão seja consistente.

## Verificação de escopo

**Antes de revisar as cláusulas de confidencialidade, verificar se o documento
faz mais do que o nome sugere.** NDAs comerciais mútuos podem esconder: standstill,
licenças, exclusividade, não-captação, não-concorrência, cessão de PI, direito de
preferência, MFN, cláusulas de arbitragem que governam muito mais do que disputas
de confidencialidade.

Se o NDA contiver obrigações além de confidencialidade: **auto-AMARELO independentemente
da análise dos termos de NDA.** Sinalizar as cláusulas extras:

> Este documento é rotulado como NDA mas contém [cláusula de não-concorrência /
> licença / exclusividade / cessão de PI / outro]. É mais do que um NDA.
> Encaminhar para revisão jurídica.

**Não-concorrência no Brasil:** cláusulas de não-concorrência em contratos
comerciais (não trabalhistas) são válidas se limitadas em tempo, território e
objeto; o CC não as proíbe expressamente, mas exigências excessivas podem ser
consideradas abusivas ou nulas por função social (Art. 421 CC). Prazo superior
a 2 anos tende a ser impugnado. `[modelo — verificar]`

## A triagem

Classificar o NDA em um de três buckets aplicando as posições do `CLAUDE.md`.

### VERDE — encaminhar para assinatura

O NDA satisfaz todas as posições do playbook e nenhum termo dispara flag VERMELHO.

**VERDE exige posições revisadas por advogado no playbook.** VERDE é o único
caminho para assinatura sem revisão jurídica. Não pode ser emitido contra posições
ausentes ou padrão.

```markdown
[CABEÇALHO DE TRABALHO JURÍDICO]

## Revisão de NDA: [Contraparte]

VERDE — encaminhar para assinatura

### Resumo executivo

Nenhum ponto crítico identificado sob o playbook. Encaminhar para assinatura
conforme processo padrão.

| Verificação | Status | Referência no playbook |
|---|---|---|
| [cada item do playbook] | [ok/falhou] | [seção do CLAUDE.md] |

**Próximo passo:** [processo padrão de assinatura]
```

**Antes de assinar:** se o usuário não for advogado:

> Assinar um NDA vincula a empresa a obrigações de confidencialidade com
> consequências jurídicas (rescisão contratual, indenização, possível configuração
> de concorrência desleal — Lei 9.279/96 Art. 195 `[modelo — verificar]`).
> Revise com advogado habilitado pela OAB antes de assinar.

### AMARELO — precisa dos olhos do jurídico em itens específicos

Um ou mais termos se desviam do playbook mas não são deal-breakers absolutos, OU
um termo aparece que o playbook não cobre.

```markdown
[CABEÇALHO DE TRABALHO JURÍDICO]

## Revisão de NDA: [Contraparte]

AMARELO — sinalizar para [responsável do playbook]

### Resumo executivo

- [Ação específica, ex.: "Excluir cláusula de não-concorrência (Cláusula 6)"]
- [Ação específica]

### Itens sinalizados

**1. [Problema]** — Cláusula [X]
   O que é: [uma linha]
   Por que sinalizado: [qual posição do playbook dispara, ou "playbook não cobre este ponto"]
   **Risco legal:** [🔴/🟠/🟡/🟢] | **Impacto comercial:** [🔴 Bloqueia negócios /
   🟠 Retarda negócios / 🟡 Gera confusão / 🟢 Invisível]
   Resolução provável: [aceitar / renegociar X / depende do contexto do negócio]

### Todo o resto

| Verificação | Status | Referência no playbook |
|---|---|---|
| [itens que passaram] | ok | [seção do CLAUDE.md] |

**Próximo passo:** Consultar [responsável] sobre os itens sinalizados, depois
encaminhar para assinatura se estiver OK.
```

### VERMELHO — parar, falar com o jurídico primeiro

O NDA dispara um item da lista "Nunca aceitar" do playbook, ou a estrutura é
incompatível com a postura padrão da equipe.

```markdown
[CABEÇALHO DE TRABALHO JURÍDICO]

## Revisão de NDA: [Contraparte]

VERMELHO — não submeter, falar com o jurídico primeiro

### Resumo executivo

- [Ação específica, ex.: "Cláusula 4 — encaminhar ao Jurídico"]

### Pontos críticos

**1. [Problema]** — Cláusula [X]
   > "[citação exata]"
   Por que é um problema: [risco específico; citar a posição do playbook que viola]
   **Risco legal:** [🔴/🟠/🟡/🟢] | **Impacto comercial:** [🔴/🟠/🟡/🟢]
   Resposta recomendada: [usar nosso papel / renegociar com linguagem específica / não assinar]

**Próximo passo:** Enviar esta triagem para [GC ou responsável indicado no CLAUDE.md].
Não assinar. Não comunicar à contraparte que vamos assinar.
```

## Verificações específicas a fazer

### Definição de Informação Confidencial

Verificar escopo (somente marcado como confidencial vs. tudo divulgado), exigências
de marcação, prazo de confirmação de divulgação oral. Aplicar posição do playbook.

### Exclusões padrão (verificar se estão presentes)

1. Informação que já era ou se torna pública (sem violação da parte)
2. Informação que a receptora já possuía antes
3. Informação desenvolvida independentemente sem referência à IC
4. Informação recebida de terceiro sem restrição
5. Informação de divulgação obrigatória por lei/ordem judicial (com aviso prévio
   ao divulgador onde legalmente permitido)

### Prazo de vigência e sobrevivência

Prazo inicial do NDA; sobrevivência das obrigações após o término; se segredos de
negócio têm proteção por prazo indeterminado.

**Nota brasileira:** A proteção de segredo de negócio (Lei 9.279/96) não tem prazo
definido em lei — perdura enquanto as informações permanecerem secretas. NDAs com
prazo de confidencialidade muito curto para segredos de negócio podem ser
contraproducentes. `[modelo — verificar]`

### Não-concorrência / Não-captação

Verificar se o acordo tenta inserir obrigações que vão além da confidencialidade
(não contratar funcionários, não concorrer, exclusividade). Se encontradas, escalar
para revisão jurídica — cláusulas de não-concorrência no contexto comercial (não
trabalhista) têm validade contestável se excessivas. `[modelo — verificar]`

### Foro e lei aplicável

Conforme posição do `CLAUDE.md`. Verificar se há cláusula de arbitragem — se sim,
verificar se é compatível com a posição do playbook sobre arbitragem.

## Contexto de contraparte

**Grandes empresas:** Geralmente não renegociam NDA padrão. Calibrar: o ponto
VERMELHO é realmente deal-breaker, ou apenas diferente do nosso modelo? Se o
relacionamento importa, a decisão de aceitar o papel deles cabe ao negócio —
escalar essa decisão, não tomá-la.

**Startups:** Geralmente aceitam nosso papel. Se o NDA deles tem problemas, o
caminho mais rápido costuma ser "vamos usar o nosso" em vez de editar o deles.

## O que esta skill não faz

- Não negocia. Classifica.
- Não redige um NDA. Se a resposta for "usar nosso papel", buscar o template
  nos documentos semente do `CLAUDE.md`.
- Não decide sobre os itens AMARELOS. Sinaliza para um humano.
- Não estabelece posições sobre nenhum termo de NDA. Posições ficam no `CLAUDE.md`.
