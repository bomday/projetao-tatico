---
name: classificacao-trabalhador
description: >
  Analisa se a relação de trabalho com um prestador deve ser classificada como
  vínculo empregatício CLT, prestação de serviços PJ, MEI, ou outra modalidade.
  Avalia risco de pejotização (fraude à lei). Use quando o usuário perguntar
  "podemos contratar como PJ?", "tem risco de vínculo?", "qual a diferença
  entre PJ e CLT neste caso?", "o prestador pode ser MEI?".
argument-hint: "[descreva a relação de trabalho: atividade, frequência, subordinação, remuneração]"
---

# /classificacao-trabalhador

> **Aviso:** Este output é suporte a profissionais jurídicos. Não constitui
> assessoria jurídica. A classificação incorreta de uma relação de trabalho pode
> resultar em reconhecimento de vínculo empregatício com todos os encargos
> retroativos. Consulte advogado trabalhista habilitado pela OAB.
> Verifique todos os dispositivos legais e súmulas do TST no texto vigente.

---

# Classificação da Relação de Trabalho (CLT vs. PJ vs. MEI)

## Finalidade

Identificar se uma relação de trabalho tem os requisitos para vínculo empregatício
CLT ou pode ser legitimamente contratada como prestação de serviços PJ/MEI.

**O risco central:** pejotização. Quando uma empresa contrata como PJ/MEI alguém
que na prática é empregado (com subordinação, habitualidade, pessoalidade e
onerosidade), o art. 9º da CLT considera nulo o artifício e reconhece o vínculo
empregatício com todos os encargos retroativos: FGTS, férias, 13º, aviso prévio,
horas extras, INSS, IRRF. `[modelo — verificar]`

## Base normativa

- **CLT Art. 2º:** Considera-se empregador a empresa que... admite, assalaria e
  dirige a prestação pessoal de serviços. `[modelo — verificar-pinpoint]`
- **CLT Art. 3º:** Considera-se empregado toda pessoa física que prestar serviços
  de natureza não eventual a empregador, sob a dependência deste e mediante salário.
  `[modelo — verificar-pinpoint]`
- **CLT Art. 9º:** Serão nulos de pleno direito os atos praticados com o objetivo
  de desvirtuar, impedir ou fraudar a aplicação dos preceitos desta Consolidação.
  `[modelo — verificar-pinpoint]`
- **Reforma Trabalhista (Lei 13.467/2017):** Art. 442-B — "A contratação do
  autônomo, cumpridas por este todas as formalidades legais, com ou sem
  exclusividade, de forma contínua ou não, afasta a qualidade de empregado prevista
  no art. 3o desta Consolidação." `[modelo — verificar-pinpoint — aplicação
  jurisprudencial ainda em desenvolvimento]`
- **Jurisprudência TST:** verificar Súmulas e OJs atualizadas no portal do TST.

## Workflow

### Passo 1: Mapear os fatos da relação

Coletar as seguintes informações:

| Fator | Descrição do caso |
|---|---|
| **Atividade exercida** | [o que a pessoa faz] |
| **Frequência** | [diária / semanal / mensal / eventual] |
| **Quem determina o horário?** | [a empresa / o prestador / combinado] |
| **Há exclusividade?** | [sim / não / na prática sim] |
| **A empresa pode dar ordens diretas sobre como o trabalho é feito?** | [sim / não] |
| **A pessoa usa equipamentos da empresa?** | [sim / não / misto] |
| **A pessoa tem outros clientes?** | [sim / não / poucos] |
| **A pessoa assume risco financeiro do negócio?** | [sim / não] |
| **Remuneração:** | [fixo mensal / por hora / por projeto / variável] |
| **A pessoa pode ser substituída por outra?** | [sim / não — pessoalidade] |
| **Há CNPJ constituído?** | [sim — qual porte / não] |
| **Tempo de relação:** | [meses / anos] |

### Passo 2: Aplicar o teste dos quatro requisitos do vínculo (CLT Art. 3º)

Para reconhecimento do vínculo empregatício, precisam estar presentes **todos**
os quatro requisitos:

| Requisito | Definição | Presente no caso? |
|---|---|---|
| **Pessoalidade** | O trabalho é prestado pela pessoa física específica — não pode ser substituída livremente | [sim / não / incerto] |
| **Não-eventualidade (habitualidade)** | O serviço é prestado de forma habitual, não esporádica ou para evento determinado | [sim / não / incerto] |
| **Onerosidade** | Há remuneração pela prestação do serviço | [sim / não] |
| **Subordinação jurídica** | O prestador recebe ordens sobre o **como** do trabalho (não apenas o resultado), está sujeito ao poder diretivo e disciplinar do tomador | [sim / não / incerto] |

**Subordinação é o critério mais relevante e mais contestado.**
O TST tem expandido o conceito para "subordinação estrutural" — quando o prestador
é integrado à estrutura produtiva do tomador, mesmo sem receber ordens diretas
cotidianas. `[modelo — verificar — jurisprudência em evolução]`

### Passo 3: Análise de risco

**🔴 Alto risco de reconhecimento de vínculo:**
- Todos os quatro requisitos presentes
- Exclusividade na prática
- Horário fixo determinado pela empresa
- Trabalho integrado ao core business da tomadora
- Sem autonomia sobre o modo de executar
- Equipamentos e ferramentas fornecidos pela tomadora
- Sem outros clientes

**🟠 Risco médio:**
- Três dos quatro requisitos presentes
- Alguns indícios de subordinação mas com autonomia parcial
- Exclusividade formal mas prestador tem estrutura empresarial real (funcionários,
  CNPJ com atividade real, patrimônio próprio)

**🟡 Risco baixo:**
- Trabalho por projeto com entrega definida
- Sem exclusividade, múltiplos clientes
- Autonomia sobre o método de trabalho
- Risco financeiro compartilhado ou assumido pelo prestador
- Estrutura empresarial real do prestador

**🟢 Risco residual / Prestação de serviços legítima:**
- Atividade especializada e eventual
- Prestador com estrutura empresarial consolidada
- Ausência de subordinação; só resultado é cobrado
- Sem habitualidade

### Passo 4: Verificação específica — MEI

**MEI pode ser contratado?** Depende da atividade. O MEI (LC 128/2008, LC 123/2006)
só pode exercer as atividades listadas na Resolução CGSN nº 140/2018 (verificar
lista atualizada). Se a atividade não está na lista, o MEI não pode prestar esse
serviço. `[modelo — verificar]`

**Limite de receita do MEI:** [verificar tabela vigente — teto atualizado anualmente
pela ANPD/CGSN]. Se o contrato extrapolará o limite anual do MEI, a contratação
como MEI é problemática. `[modelo — verificar — limite atual]`

**MEI não pode ter empregado PJ:** o MEI pode ter **um** empregado CLT com salário
mínimo ou piso da categoria. Não pode contratar sócios ou ter filiais.
`[modelo — verificar]`

### Passo 5: Recomendações

```markdown
[CABEÇALHO DE TRABALHO JURÍDICO]

## Análise de Classificação da Relação de Trabalho
**Prestador:** [identificação sem dados pessoais desnecessários]
**Data:** [data]

### Resumo

**Risco de reconhecimento de vínculo empregatício:** [🔴/🟠/🟡/🟢]

**Modalidade recomendada:** [CLT / PJ / MEI / outro]

### Análise dos requisitos

[Para cada requisito CLT Art. 3º: presente / ausente / incerto — com fatos que
suportam a conclusão]

### Fatores de risco identificados

[Lista dos indícios que aumentam o risco de vínculo]

### Fatores de mitigação

[Lista dos fatores que favorecem a contratação como autônomo]

### Recomendações

1. [Ação específica — ex.: "Registrar que o prestador tem outros clientes no
   contrato de prestação de serviços"]
2. [Ação específica — ex.: "Remover exigência de cumprimento de horário fixo"]
3. [Ação específica — ex.: "Garantir que o prestador possa ser substituído por
   preposto sem anuência da tomadora"]

### Nota sobre contratação como CLT

Se os fatos indicam vínculo, a recomendação é formalizar como empregado CLT.
O custo da regularização voluntária é menor do que o custo de uma reclamação
trabalhista com condenação retroativa incluindo multas (FGTS 40%, juros,
honorários advocatícios de sucumbência — CLT Art. 791-A após Reforma Trabalhista,
mas com restrições). `[modelo — verificar]`
```

## O que esta skill não faz

- Não decide a classificação em casos ambíguos. Apresenta a análise para o advogado.
- Não analisa aspectos previdenciários (alíquotas, categorias INSS, contribuições
  ao RAT/FAP). Para análise tributária/previdenciária, consultar contador e advogado
  tributarista.
- Não avalia terceirização (Lei 13.429/2017) — fluxo específico não coberto aqui.
