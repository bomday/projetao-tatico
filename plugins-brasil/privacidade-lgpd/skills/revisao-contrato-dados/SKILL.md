---
name: revisao-contrato-dados
description: >
  Revisão de cláusulas de proteção de dados em contratos ou instrumentos
  específicos de proteção de dados, com base no framework LGPD. Auto-detecta
  se somos controladores ou operadores e aplica a análise correta. Use quando
  o usuário disser "revisar este contrato de dados", "verificar cláusula LGPD",
  "o cliente enviou um DPA", "este contrato tem proteção de dados adequada?"
  ou anexar um instrumento de proteção de dados.
argument-hint: "[arquivo | link | cole o texto]"
---

# /revisao-contrato-dados

> **Aviso:** Este output é suporte a profissionais jurídicos. Não constitui
> assessoria jurídica. Verifique dispositivos legais e orientações da ANPD.
> A assinatura de qualquer contrato é ato com consequências jurídicas —
> revise com advogado habilitado pela OAB antes de assinar.

1. Carregar `CLAUDE.md` → playbook de contrato de dados. Se houver placeholders, parar.
2. Obter o instrumento. Determinar direção: somos operadores (cliente enviou)
   ou controladores (revisando contrato com fornecedor)?
3. Executar o workflow — cláusula a cláusula contra o playbook aplicável.
4. Verificar consistência com a política de privacidade.
5. Output: memorando de revisão com redlines. Salvar conforme house style.

---

# Revisão de Contrato/Instrumento de Proteção de Dados (LGPD)

## Finalidade

Contratos de dados chegam em dois sentidos e a revisão é quase oposta para cada um.
Quando um cliente nos envia seu instrumento, defendemos nossa flexibilidade operacional.
Quando enviamos ao fornecedor, protegemos nossos dados (e dos nossos usuários).

**Base normativa principal:**
- Art. 37-39, LGPD: obrigações entre controlador e operador
- Art. 46-49, LGPD: medidas de segurança
- Art. 48, LGPD: comunicação de incidentes de segurança
- Art. 33-36, LGPD: transferência internacional `[modelo — verificar-pinpoint]`

## Primeiro: qual é a direção?

Antes de qualquer coisa:

- **Somos operadores** → cliente nos enviou o instrumento → ler `CLAUDE.md` →
  "Quando somos operadores"
- **Somos controladores** → revisando instrumento de fornecedor ou enviando o nosso
  → ler "Quando somos controladores"

Se não estiver claro, perguntar. Inverter essa análise inverte cada recomendação.

## Verificação setorial antes da análise cláusula a cláusula

Antes de percorrer as cláusulas, verificar: **o tratamento de dados neste contrato
envolve alguma categoria regulada setorialmente?**

- **Dados de saúde / prontuário médico:** Resolução CFM e regulamentação da ANS
  podem criar obrigações adicionais além da LGPD. `[modelo — verificar]`
- **Dados financeiros / bancários:** Regulação BACEN (Res. CMN/BCB) pode exigir
  medidas de segurança específicas e residência dos dados no Brasil.
  `[modelo — verificar]`
- **Dados educacionais:** ECA, LDB e regulamentações do MEC podem ser aplicáveis
  para dados de menores em contexto educacional. `[modelo — verificar]`
- **Dados de crianças e adolescentes (geral):** Art. 14 LGPD — regime diferenciado.
  Se o contrato envolve tratamento de dados de menores, sinalizar para revisão
  específica. `[modelo — verificar]`
- **Dados de empregados:** CLT e negociações coletivas podem criar obrigações
  adicionais sobre uso de dados do trabalhador. `[modelo — verificar]`

Se nenhuma sobreposição setorial for identificada, registrar: "Nenhuma categoria
regulada setorialmente identificada — análise segue sob framework LGPD puro."

## Carregar o playbook

Ler `CLAUDE.md` → `## Playbook de Contrato de Dados`. Ler também
`## Compromissos públicos de privacidade` — o contrato não pode contrariar o que
a política de privacidade promete.

## Análise cláusula a cláusula

### Cláusulas essenciais (verificar em todo instrumento)

| Cláusula | O que buscar | Campo do playbook | Disputas comuns |
|---|---|---|---|
| **Papéis** | Definição clara de controlador/operador; condiz com a realidade | — | Contraparte usa definição que não reflete a relação real |
| **Escopo do tratamento** | Limitado a instruções documentadas; finalidades definidas | — | Expansões abertas ("e finalidades correlatas") |
| **Suboperadores** | Lista atual divulgada, mecanismo de alteração definido | Suboperadores | Aprovação prévia vs. veto vs. mera notificação |
| **Medidas de segurança** | Anexo com controles ou padrões específicos | Segurança | "Medidas técnicas e organizacionais apropriadas" sem anexo = promessa vazia |
| **Comunicação de incidente** | Gatilho definido ("ciência" vs. "confirmação"), prazo definido | Notificação de incidente | Prazo (ANPD orienta 3 dias úteis para ciência inicial `[modelo — verificar]`); definição do gatilho |
| **Auditoria** | Método (relatório vs. in loco), frequência, prazo de aviso, alocação de custo | Auditoria | Auditorias in loco com prazo curto |
| **Transferência internacional** | Mecanismo identificado (Art. 33-36 LGPD), medidas suplementares | Transferência | Mecanismo desatualizado ou ausente |
| **Eliminação/devolução** | Prazo pós-término, certificação, exceção de backup | Eliminação no término | "Eliminação em prazo razoável" sem data = indefinido |
| **Responsabilidade** | Dentro do cap do MSA ou separado; carve-outs | Responsabilidade pelos dados | Responsabilidade por violação de dados sem cap = risco existencial |

### Quando somos operadores: revisão defensiva

Instrumentos do cliente tentam transferir ônus operacional para nós. Para cada
cláusula abaixo, comparar com o playbook:

| Cláusula | Risco | Lookup no playbook |
|---|---|---|
| Direito de veto sobre suboperadores | Não conseguimos escalar infraestrutura sem aprovação cliente a cliente | Aplicar posição do playbook em suboperadores |
| Auditoria in loco com prazo curto | Inviável em escala | Aplicar posição do playbook |
| Prazo de notificação agressivo | Frequentemente exige notificação antes de sabermos o que aconteceu | Pesquisar orientação da ANPD sobre prazo; comparar com playbook |
| Residência rígida de dados (país/DC específico) | Pode não condizer com a arquitetura | Confirmar o que conseguimos assumir operacionalmente |
| Responsabilidade de operador ilimitada | Bet-the-company | Aplicar posição do playbook |
| Cliente pode emitir "instruções" abertas | Controle operacional indefinido | Definir instruções como "documentadas no Contrato ou acordadas por escrito" |
| Eliminação em prazo muito curto | Rotação de backup torna isso tecnicamente impossível | Documentar carve-out de backup |

### Quando somos controladores: revisão protetiva

Instrumentos do fornecedor tentam nos dar o mínimo. Para cada cláusula abaixo:

| Cláusula | Lacuna | Lookup no playbook |
|---|---|---|
| Sem lista de suboperadores | Não sabemos quem toca nossos dados | Exigir lista atualizada + aviso prévio |
| "Segurança de mercado" sem especificações | Não significa nada | Exigir anexo com controles ou referência a norma (ISO 27001, SOC 2) |
| Sem prazo de notificação | Nos avisam quando quiserem | Pesquisar orientação da ANPD; exigir posição do playbook |
| Sem direito de auditoria | Não conseguimos verificar nada | Exigir ao menos relatório independente |
| Fornecedor pode usar dados para "melhorias do serviço" | Potencial uso para treinamento de IA com nossos dados | Eliminar; tratamento limitado a prestar o serviço contratado |
| Sem mecanismo de transferência internacional | Sem base legal para a transferência | Pesquisar o mecanismo vigente para o corredor origem/destino `[modelo — verificar]` |
| Sem compromisso de eliminação | Dados ficam indefinidamente | Exigir posição do playbook + certificação sob demanda |

## Verificação de consistência com política de privacidade

O instrumento assinado não pode prometer algo que a política não cobre, e vice-versa:

- Se o instrumento compromete tratamento apenas para finalidades X, Y — a política
  lista essas finalidades?
- Se a política diz "não vendemos dados" — alguma cláusula parece cessão onerosa?
- Se a política lista categorias de suboperadores — a lista do instrumento condiz?

Sinalizar inconsistências. Geralmente é a política que está desatualizada.

## Granularidade dos redlines

**Editar na menor granularidade possível.** Um redline é instrumento de negociação,
não reescrita. Substituição completa de cláusula sinaliza agressividade e força a
contraparte a reler tudo. Redlines cirúrgicos (trocar uma palavra, inserir uma
frase) sinalizam pedidos específicos e são mais fáceis de aceitar.

Escala preferencial:
1. Palavra → 2. Frase → 3. Subcláusula → 4. Sentença → 5. Cláusula inteira
   (somente quando o texto da contraparte está tão distante que cirurgia seria
   mais confusa que rascunho novo — e nesse caso, avisar na transmissão)

## Output

Incluir cabeçalho de trabalho jurídico do `CLAUDE.md`.

```markdown
[CABEÇALHO DE TRABALHO JURÍDICO]

# Revisão de Instrumento de Proteção de Dados: [Contraparte]

**Direção:** [Somos operadores / Somos controladores]
**Revisado em:** [data]
**Vinculado a:** [MSA / Contrato principal / instrumento autônomo]

---

## Resumo executivo

[Duas frases. Podemos assinar? O que precisa mudar?]

**Ocorrências:** [N]🟢 [N]🟡 [N]🟠 [N]🔴

---

## Análise por cláusula

[Para cada cláusula essencial: o que o instrumento diz, o que nosso playbook diz,
a lacuna, o risco e o redline proposto.]

---

## Consistência com política de privacidade

[🟢 Consistente | 🟡 Sinalizações: lista]

---

## Redlines consolidados

[Prontos para enviar de volta]

---

## Se a contraparte não ceder

[Para cada ponto: o fallback do playbook, ou escalada se não houver fallback]
```

## Nota sobre transferência internacional

Se o instrumento contempla transferência internacional de dados, **pesquisar o
mecanismo vigente** para o corredor origem/destino aplicável (Art. 33-36 LGPD).
Verificar: adequação do país destino (lista ANPD), cláusula contratual padrão,
normas corporativas globais, consentimento específico, outra hipótese. Se não
houver mecanismo identificado e houver transferência → 🔴.

`[modelo — verificar — ANPD ainda em processo de regulamentação detalhada dos
mecanismos de transferência; verificar situação atual no portal da ANPD]`

## Gate: assinar o instrumento

Revisar é pesquisa. *Assinar* — ou instruir alguém a assinar — é o ato consequente.

**Antes de assinar:** se o usuário não for advogado:

> Assinar um instrumento de proteção de dados é ato jurídico — vincula a empresa
> a obrigações de proteção de dados que se reportam à ANPD e aos titulares. Revise
> com advogado habilitado pela OAB antes de assinar.

## O que esta skill não faz

- Não redige um instrumento do zero. Se a resposta for "usar nosso template",
  buscar o template nos documentos semente do `CLAUDE.md`.
- Não faz a avaliação de transferência ela própria — sinaliza quando é necessária.
- Não decide se aceitar termos fora dos fallbacks. Roteia conforme a matriz de escalada.
