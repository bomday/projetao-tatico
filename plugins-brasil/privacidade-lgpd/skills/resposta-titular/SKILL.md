---
name: resposta-titular
description: >
  Conduz o processo de resposta a requisição de titular (Art. 18 LGPD) —
  verificação de identidade, localização dos dados sistema a sistema, análise
  de exceções, minutas de confirmação de recebimento e de resposta substantiva.
  Use quando chegar uma requisição de titular, o usuário colar um pedido de
  acesso/eliminação/portabilidade/correção ou disser "chegou um pedido de
  titular", "pedido de acesso", "direito ao esquecimento", "alguém quer os dados".
argument-hint: "[cole a requisição ou descreva o pedido]"
---

# /resposta-titular

> **Aviso:** Este output é suporte a profissionais jurídicos. Não constitui
> assessoria jurídica. Verifique prazos e exceções na LGPD vigente e em
> orientações da ANPD antes de enviar qualquer resposta ao titular.

1. Carregar `CLAUDE.md` → processo de atendimento a titulares (sistemas, prazo,
   verificação de identidade).
2. Classificar o tipo de direito invocado.
3. Verificar identidade do titular.
4. Percorrer a lista de sistemas → análise de exceções → minutar resposta.
5. **NÃO enviar** — revisor humano aprova e envia.
6. Registrar a requisição conforme processo interno.

**Antes de colar a requisição:** ela contém dados pessoais do titular. Confirme
que a sessão e o armazenamento de output atendem aos requisitos de tratamento
de dados. Não armazene o nome do titular em nomes de arquivos.

---

# Resposta a Requisição de Titular (Art. 18 LGPD)

## Finalidade

Uma requisição de titular tem base legal, tem um processo (verificar, localizar,
analisar exceções, responder) e vários pontos onde pode sair errado. Esta skill
percorre cada passo e produz a minuta da resposta.

## Carregar o processo

Ler `CLAUDE.md` → `## Processo de atendimento a titulares`:
- Lista de sistemas (todos os lugares onde há dados do titular)
- Método de verificação de identidade
- Prazo interno de resposta
- Quem trata rotineiro vs. quem escala

Se a lista de sistemas estiver vazia ou desatualizada, sinalizar — não é possível
fazer um atendimento completo sem saber onde buscar.

## Workflow

### Passo 1: Classificar o pedido

Identificar qual direito do Art. 18 LGPD o titular está invocando:

- **Confirmação de existência** — saber se há tratamento (Art. 18, I)
- **Acesso** — cópia dos dados + informações sobre o tratamento (Art. 18, II)
- **Correção/atualização** — corrigir dados incompletos, inexatos ou desatualizados
  (Art. 18, III)
- **Anonimização, bloqueio ou eliminação** — de dados desnecessários, excessivos
  ou tratados em desconformidade com a LGPD (Art. 18, IV)
- **Portabilidade** — transferência a outro fornecedor (Art. 18, V)
- **Eliminação dos dados tratados com consentimento** — após revogação (Art. 18, VI)
- **Informação sobre compartilhamento** — com quem os dados são compartilhados
  (Art. 18, VII)
- **Informação sobre não consentimento** — possibilidade de não fornecer
  consentimento e consequências (Art. 18, VIII)
- **Revogação do consentimento** — Art. 18, IX c/c Art. 8º §5º LGPD
- **Oposição** — ao tratamento baseado em outra hipótese (Art. 18, §2º LGPD)

> **Verificar a norma antes de prosseguir.** Para cada direito invocado,
> identificar as hipóteses de exceção aplicáveis na LGPD. Citar com
> dispositivo. Sinalizar incerteza. `[modelo — verificar]`

> **Sem suplementação silenciosa.** Se a pesquisa sobre o regime aplicável
> retornar resultados insuficientes, parar e informar o usuário antes de
> prosseguir com conhecimento do modelo não verificado.

Alguns pedidos são combinados — "exclua minha conta e antes me mande meus dados"
é eliminação + portabilidade. Tratar como dois pedidos vinculados.

### Passo 2: Verificar identidade

Conforme o método no `CLAUDE.md`. Abordagens comuns:

- **Sessão autenticada:** pedido veio de dentro de sessão logada → identidade confirmada
- **E-mail cadastrado:** pedido veio do e-mail no cadastro → geralmente suficiente
  para pedidos de baixo risco
- **Verificação adicional:** para contas de alto valor ou pedidos de eliminação

**Calibrar ao risco.** Verificação excessiva cria barreira (má impressão com a ANPD).
Verificação insuficiente arrisca entregar dados de outra pessoa.

Se identidade não puder ser verificada:

```markdown
Não foi possível confirmar que este pedido partiu da pessoa titular dos dados.
Para prosseguir, por favor [passo de verificação]. Enquanto aguardamos, o prazo
de atendimento corre normalmente — retornaremos em até [prazo].
```

### Passo 3: Localizar os dados

Percorrer a lista de sistemas do `CLAUDE.md`. Para cada sistema:

| Sistema | Consultado? | Dados encontrados? | O quê |
|---|---|---|---|
| Banco de dados principal | | | |
| CRM | | | |
| Ferramenta de analytics | | | |
| Plataforma de suporte | | | |
| E-mail marketing | | | |
| Logs | | | |
| Backups | | | (geralmente exceção à eliminação — ver abaixo) |
| Suboperadores | | | (podem precisar ser notificados para eliminação) |

Para operador B2B: o "titular" geralmente é o usuário final do seu **cliente
controlador**. Verificar se o pedido deveria ser encaminhado ao controlador, não
tratado pelo operador diretamente. Muitos contratos de operação preveem:
"encaminhar pedidos de titulares ao controlador".

### Passo 4: Análise de exceções

Nem tudo precisa ser fornecido ou eliminado. **Pesquisar a norma antes de
prosseguir.** Para cada item, identificar toda exceção plausível sob a LGPD.

**Exceções comuns relevantes (verificar dispositivos vigentes):**

- **Cumprimento de obrigação legal/regulatória** (Art. 16, I LGPD): dados que
  devem ser mantidos por lei (documentos fiscais, trabalhistas, etc.)
  `[modelo — verificar-pinpoint]`
- **Exercício regular de direitos em processo judicial, administrativo ou
  arbitral** (Art. 16, II LGPD) `[modelo — verificar-pinpoint]`
- **Estudo por órgão de pesquisa** (Art. 16, III LGPD) `[modelo — verificar]`
- **Uso exclusivo do controlador** com anonimização e sem comunicação a terceiros
  (Art. 16, IV LGPD) `[modelo — verificar]`
- **Dados de terceiros** presentes na base do titular: redatar antes de fornecer
- **Hold de litígio:** pedido de eliminação + hold de litígio = conflito; advogado
  decide

**Não estreite a lista por decisão própria.** A skill propõe exceções onde há base
plausível e sinaliza as duvidosas; o advogado estreita a lista antes do envio.
Cada exceção proposta leva nota explícita: **"proposta — requer revisão jurídica
antes de ser alegada"**.

Documentar cada exceção alegada: se a ANPD perguntar por que algo não foi
eliminado, "havia obrigação legal" precisa de uma citação.

### Passo 5: Minutar — DUAS RESPOSTAS

A LGPD não fixa prazo expresso de resposta, mas a ANPD orienta que o atendimento
seja feito em "prazo razoável". Boas práticas apontam para:
- **Confirmação de recebimento:** em poucos dias (recomendado: até 5 dias úteis)
- **Resposta substantiva:** em até 15 dias `[modelo — verificar — ANPD pode publicar
  prazo específico]`

Produzir ambas; não colapsar em uma única carta enviada no último dia.

> **Antes de enviar qualquer carta ao titular:** se o usuário não for advogado:
>
> Enviar resposta a titular tem consequências legais — o conteúdo, as exceções
> alegadas e as omissões são todos revisáveis pela ANPD. Revise com advogado
> habilitado pela OAB antes de enviar. Um resumo para levar ao advogado:
>
> [Gerar resumo de 1 página: titular, direito invocado, o que foi localizado por
> sistema, o que será retido e por qual exceção, prazo de resposta, e as 3
> perguntas a fazer ao advogado antes do envio.]

> **Nota:** As cartas ao titular são documentos voltados ao exterior — não incluir
> cabeçalho de trabalho jurídico interno nas cartas. Notas internas, análise de
> exceções e registros são trabalho jurídico interno — mantê-los separados com
> o cabeçalho adequado.

#### Carta 1 — Confirmação de recebimento

```markdown
Assunto: Recebemos sua requisição de titular — [Empresa] — [data]

[Nome do titular],

Recebemos sua requisição de [acesso / correção / eliminação / portabilidade /
outro] em [data de recebimento], com fundamento no Art. 18 da Lei Geral de
Proteção de Dados (Lei 13.709/2018).

**Entendemos seu pedido como:** [reafirmação em uma frase — ex.: "cópia de todos
os dados pessoais que mantemos associados à sua conta, além das informações sobre
com quem os compartilhamos."]

**Próximos passos:**
- Nosso prazo para a resposta substantiva é [data]. [Se necessário verificação de
  identidade: "Aguardamos [passo específico] para prosseguir — veja abaixo."]
- Caso o pedido seja complexo ou demande prazo adicional, informaremos antes do
  prazo acima e explicaremos o motivo.

[Se necessário verificar identidade:]
**Para confirmar sua identidade,** por favor [passo específico]. Isso não
interrompe o prazo; continuamos trabalhando em paralelo.

Em caso de dúvidas, entre em contato pelo canal do nosso encarregado:
[contato do encarregado — Art. 41, §1º LGPD, divulgação obrigatória].

[Assinatura]
```

#### Carta 2 — Resposta substantiva

**Pedido de acesso:**

```markdown
Assunto: Resposta à sua Requisição de Acesso — [Empresa] — [data]

[Nome do titular],

Em atenção à sua requisição recebida em [data], apresentamos abaixo as
informações pessoais que mantemos associadas a sua conta/cadastro.

**O que encontramos:**

| Categoria | Fonte | Finalidade | Mantido até |
|---|---|---|---|
| [Dados cadastrais: nome, e-mail] | Você, no cadastro | Gestão da conta | Encerramento da conta |
| [Dados de uso] | Nosso serviço | [finalidade] | [período] |
| [Histórico de suporte] | Você | Atendimento | [período] |

**Seus dados estão em anexo** no formato [formato]. [Instrução de entrega segura.]

**Com quem compartilhamos:** [lista de operadores ou link para a política de
privacidade → seção de operadores].

**Seus outros direitos (Art. 18 LGPD):** você pode também requerer
[correção / eliminação / portabilidade]. Para isso, [canal de atendimento].

**Dados não incluídos:**
- [Categoria] — [exceção e fundamento legal, ex.: "logs de segurança —
  informação de técnica de segurança, cuja divulgação colocaria em risco a
  segurança do sistema (Art. 18, §3º LGPD `[modelo — verificar-pinpoint]`)"]

[Assinatura e contato do encarregado]
```

**Pedido de eliminação:**

```markdown
Assunto: Resposta à sua Requisição de Eliminação — [Empresa] — [data]

[Nome do titular],

Em atenção à sua requisição de [eliminação / anonimização / bloqueio] recebida
em [data]:

**O que eliminamos/anonimizamos:**

| Categoria | Sistema | Realizado em |
|---|---|---|
| [Dados cadastrais] | Banco principal | [data] |
| [Histórico de navegação] | [sistema] | [data] |

**O que mantivemos e por quê:**

| Categoria | Fundamento legal | Mantido até |
|---|---|---|
| [Dados fiscais] | Obrigação legal — [ex.: Lei 9.430/96, Art. X, prazo de
5 anos para escrituração fiscal] `[modelo — verificar]` | [data] |
| [Backups] | Rotação programada de backups | [data da próxima rotação] |

**Operadores notificados:** notificamos [lista] para eliminação dos dados em
seus sistemas.

Sua conta foi encerrada. Em caso de dúvidas: [contato do encarregado].

[Assinatura]
```

### Passo 6: Registrar

Requisições de titulares são auditáveis. Registrar:
- Data de recebimento
- Data de verificação de identidade
- Data da resposta
- O que foi fornecido/eliminado
- Exceções alegadas e fundamento
- Quem tratou

## Gatilhos de escalada

Escalar quando:
- Requerente é (ou pode ser) parte em processo judicial, MP ou imprensa
- Escopo do pedido é incomum
- Há hold de litígio sobre os dados do titular
- Requerente está contestando resposta anterior
- Qualquer autoridade (ANPD / MP / procon) está copiada ou mencionada

## O que esta skill não faz

- Não consulta sistemas diretamente. Percorre o checklist; um humano faz as
  consultas reais.
- Não decide exceções em casos difíceis. Sinaliza para o advogado.
- Não envia a resposta. Minuta, revisão humana, humano envia.
