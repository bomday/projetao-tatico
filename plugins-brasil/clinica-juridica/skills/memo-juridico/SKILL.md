---
name: memo-juridico
description: >
  Produz memorando jurídico estruturado sobre questão de direito brasileiro —
  identificação da questão, fatos relevantes, fundamento legal, análise e
  conclusão com recomendações. Use quando o supervisor pedir "elaborar um memo",
  "redigir parecer", "análise jurídica por escrito", "fundamentação do caso".
argument-hint: "[questão jurídica a ser analisada]"
---

# /memo-juridico

> **Aviso:** Memorando jurídico produzido com assistência de IA deve ser revisado
> e aprovado por advogado habilitado pela OAB antes de qualquer uso. Todos os
> dispositivos legais e citações jurisprudenciais devem ser verificados nas fontes
> primárias antes de serem utilizados como fundamento.

1. Carregar `CLAUDE.md` → perfil da clínica e nível de supervisão.
2. Identificar a questão jurídica central.
3. Descrever os fatos relevantes.
4. Pesquisar e citar fundamento legal e jurisprudência.
5. Desenvolver a análise.
6. Produzir conclusão com recomendações.

---

# Memorando Jurídico

## Finalidade

Documento de trabalho interno que analisa uma questão jurídica de forma estruturada.
Não é peça processual — é o instrumento pelo qual o profissional jurídico organiza
o raciocínio antes de orientar o cliente ou redigir uma peça.

## Estrutura padrão

```markdown
[CABEÇALHO DE TRABALHO JURÍDICO]

MEMORANDO JURÍDICO

**Para:** [destinatário — ex.: Dr. [Supervisor], advogado responsável]
**De:** [elaborador]
**Data:** [data]
**Assunto:** [questão jurídica em uma linha]
**Referência:** [código do caso, sem dados pessoais]

---

## I. QUESTÃO JURÍDICA

[Uma ou duas frases definindo com precisão a questão a ser respondida.
Exemplo: "Verificar se a negativa da operadora de plano de saúde em cobrir o
procedimento X configura prática abusiva nos termos do CDC e da Lei 9.656/98."]

---

## II. FATOS RELEVANTES

[Narração objetiva e cronológica dos fatos pertinentes à questão jurídica.
Sem opiniões. Apenas os fatos que influenciam a análise.
Indicar quais fatos são confirmados por documentos e quais são narrados pelo
cliente sem comprovação até o momento.]

1. [fato + data + fonte — ex.: "Em [data], o cliente firmou contrato de plano
   de saúde com a operadora X (contrato em anexo)."]
2. [fato]
3. [fato]

---

## III. FUNDAMENTO LEGAL E JURISPRUDENCIAL

### Legislação aplicável

[Citar os dispositivos legais relevantes com artigo, caput, inciso e parágrafo.
Transcrever o texto quando essencial para a análise.]

- [Ex.: CDC Art. 51, IV: "São nulas de pleno direito, entre outras, as cláusulas
  contratuais relativas ao fornecimento de produtos e serviços que: IV -
  estabeleçam obrigações consideradas iníquas, abusivas, que coloquem o
  consumidor em desvantagem exagerada, ou sejam incompatíveis com a boa-fé ou
  a equidade."] `[usuário forneceu | modelo — verificar-pinpoint]`

### Jurisprudência

[Citar precedentes relevantes dos tribunais superiores (STJ, TST, STF) e,
quando aplicável, do tribunal do estado. Para cada citação:]

- **[Tribunal] — [tipo de decisão] — [referência]:** "[trecho relevante]"
  `[modelo — verificar — confirmar no portal do tribunal antes de usar]`

> **Nota de verificação obrigatória:** Toda citação jurisprudencial gerada por
> modelo de IA deve ser verificada no portal do tribunal antes de ser usada.
> Modelos de IA podem gerar referências de acórdãos que não existem, alterar o
> teor de decisões reais ou citar jurisprudência superada. Verificar em:
> - STJ: www.stj.jus.br
> - TST: www.tst.jus.br
> - STF: www.stf.jus.br
> - TJSP / TJRJ / [tribunal do estado]: [portal do tribunal]
> - JusBrasil (não é fonte primária — usar apenas para localizar a decisão, então
>   confirmar no portal oficial)

### Doutrina (se aplicável)

[Citar autores relevantes com cautela — verificar se a posição doutrinária
reflete o texto citado antes de incluir no memorando.]

---

## IV. ANÁLISE

[Aplicação do fundamento legal aos fatos. Desenvolver o raciocínio jurídico.
Identificar os pontos fortes e as vulnerabilidades da tese.]

### Pontos favoráveis

1. [argumento + fundamento]
2. [argumento + fundamento]

### Pontos desfavoráveis / riscos

1. [argumento contrário que pode ser levantado]
2. [risco processual ou material]

### Questões em aberto

[Fatos não comprovados, normas ambíguas ou pontos que precisam de mais
pesquisa antes de uma posição definitiva.]

---

## V. CONCLUSÃO E RECOMENDAÇÕES

[Resposta direta à questão jurídica do item I.]

**Conclusão:** [uma ou duas frases respondendo à questão]

**Recomendações:**
1. [ação específica — ex.: "Notificar extrajudicialmente a operadora em prazo
   de 5 dias antes de ajuizar, para documentar a resistência"]
2. [ação específica]
3. [ação específica]

**Estratégia sugerida:** [via extrajudicial primeiro / ação diretamente / outro]

**Foro competente (se aplicável):** [JEC — valor até 40 SM / Juízo comum / TRT /
outro + fundamentação] `[modelo — verificar]`

---

*Este memorando foi elaborado com assistência de IA e deve ser revisado e
aprovado pelo advogado responsável antes de qualquer uso. Citações legais e
jurisprudenciais devem ser verificadas nas fontes primárias.*
```

## Guardrails específicos para memorandos

**Jamais inventar jurisprudência.** Se não houver acórdão verificado, dizer:
"Não foi possível localizar precedente específico do [tribunal] sobre este ponto
nesta sessão. Recomenda-se pesquisa no portal do tribunal antes de utilizar este
argumento." É mais útil do que uma referência fabricada.

**Não afirmar certeza onde há incerteza.** Quando a questão é controvertida nos
tribunais, dizer: "Há divergência entre câmaras / entre STJ e STF / entre
tribunais regionais sobre este ponto. A posição [A] prevalece em [tribunal X];
a posição [B] é adotada em [tribunal Y]. Verificar o posicionamento do
[tribunal da comarca] antes de formular o pedido."

**Sinalizar com `[revisão]` toda conclusão que depende de julgamento do
advogado** — não apenas lacunas de pesquisa.

## O que este skill não faz

- Não redige petições, contestações, recursos ou outros atos processuais.
  O memo é o insumo para essas peças.
- Não substitui pesquisa jurisprudencial manual. Toda citação de jurisprudência
  deve ser verificada no portal do tribunal antes de uso.
- Não dá orientação diretamente ao cliente. O memo é documento interno de trabalho.
