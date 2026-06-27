---
name: ripd-geracao
description: >
  Gera Relatório de Impacto à Proteção de Dados Pessoais (RIPD) no formato
  interno da organização, conforme Art. 38 LGPD e Guia Orientativo RIPD da ANPD
  (2021). Use quando o usuário disser "fazer um RIPD", "relatório de impacto para
  esta funcionalidade", "precisamos de RIPD para este produto", "revisão de
  privacidade desta feature" ou descrever nova atividade de tratamento.
argument-hint: "[nome ou descrição da feature/atividade de tratamento]"
---

# /ripd-geracao

> **Aviso:** Este output é suporte a profissionais jurídicos. Não constitui
> assessoria jurídica. O RIPD gerado deve ser revisado por advogado ou DPO
> habilitado antes de ser finalizado. Verifique dispositivos legais no texto
> consolidado vigente em www.planalto.gov.br.

1. Carregar `CLAUDE.md` → estilo do RIPD (gatilho, formato, profundidade, aprovação).
2. Verificar: RIPD é necessário? (gatilho interno + casos do Guia ANPD)
3. Fazer intake: perguntas sobre a atividade de tratamento. Pode extrair do PRD.
4. Escrever RIPD no formato interno. Incluir verificação de consistência com
   política de privacidade.
5. Output com lista de condições e responsáveis. Rotear para aprovação.

---

# Geração de RIPD

## Finalidade

O RIPD documenta os riscos à privacidade de uma nova atividade de tratamento e
as medidas adotadas para mitigá-los. Tem duas funções: (1) demonstrar à ANPD
que a organização faz análise de risco proativamente; (2) forçar a reflexão
antes do lançamento, quando ainda é possível mudar.

**Base normativa:**
- Art. 38, LGPD: a ANPD pode determinar ao controlador a elaboração de RIPD.
- Guia Orientativo RIPD — ANPD, outubro 2021: recomenda elaboração proativa para
  atividades de alto risco (verificar versão atual no portal da ANPD).
  `[modelo — verificar]`

## Verificar se RIPD é necessário

**Gatilho interno:** ver `CLAUDE.md` → `## Estilo do RIPD` → `Gatilho`.

**Casos de alto risco (Guia ANPD) — verificar a lista atual:**
- Tratamento de dados sensíveis em larga escala `[modelo — verificar]`
- Decisões automatizadas com efeitos jurídicos sobre titulares `[modelo — verificar]`
- Monitoramento sistemático de titulares `[modelo — verificar]`
- Tratamento de dados de crianças e adolescentes `[modelo — verificar]`
- Uso de novas tecnologias ou tecnologias inovadoras `[modelo — verificar]`
- Transferência internacional de dados pessoais sensíveis `[modelo — verificar]`

Se nenhum gatilho interno nem nenhum caso do Guia ANPD se aplica, documentar
o não-gatilho: "RIPD não necessário. Razão: [motivo]. Nenhuma ação necessária."
— ainda assim salvar esse documento.

## Intake: perguntas sobre a atividade

Antes de escrever o RIPD, obter as seguintes informações. Pode extrair de PRD
se fornecido:

1. **Qual é a atividade/funcionalidade?** [Nome e descrição em linguagem simples]
2. **Quais dados pessoais são coletados ou usados?**
   - São dados sensíveis (Art. 5º, II LGPD)? [saúde, biometria, religião, opinião
     política, filiação sindical, dado genético, vida sexual, dado racial/étnico]
3. **Qual a finalidade do tratamento?** [explícita, legítima, específica — Art. 6º, I LGPD]
4. **Qual a base legal utilizada?** [Art. 7º LGPD para dado comum; Art. 11 LGPD
   para dado sensível — identificar qual inciso]
5. **Quem são os titulares?** [consumidores / funcionários / menores / outro]
   - Se menores: Art. 14 LGPD — tratamento só com consentimento de pais/responsáveis
     ou para proteção do menor; dado sensível de menor proibido salvo exceções
     `[modelo — verificar]`
6. **Volume e escala:** [quantos titulares, com que frequência]
7. **Quem terá acesso aos dados?** [internamente: quais equipes; externamente:
   quais operadores/parceiros]
8. **Por quanto tempo os dados serão retidos?** [período + critério de definição
   do período]
9. **Há decisão automatizada?** Se sim: Art. 20 LGPD — titular tem direito de
   solicitar revisão humana de decisões tomadas unicamente por tratamento
   automatizado que afetem seus interesses. `[modelo — verificar]`
10. **Há transferência internacional?** Se sim: qual mecanismo (Art. 33-36 LGPD)?

## Estrutura do RIPD

Conforme Guia Orientativo RIPD — ANPD, 2021, adaptar ao formato interno
(ver `CLAUDE.md` → `## Estilo do RIPD`). `[modelo — verificar versão atual do Guia]`

```markdown
[CABEÇALHO DE TRABALHO JURÍDICO]

# Relatório de Impacto à Proteção de Dados Pessoais (RIPD)
**Atividade de tratamento:** [nome]
**Elaborado por:** [nome/área]
**Data:** [data]
**Versão:** [v1.0]
**Status:** [Rascunho / Em revisão / Aprovado]

---

## 1. Identificação da Atividade

**Descrição:** [o que a atividade faz, em linguagem clara]
**Finalidade:** [por que os dados são tratados — Art. 6º, I LGPD]
**Necessidade:** [por que esses dados específicos são necessários para a finalidade —
Art. 6º, III LGPD — princípio da necessidade/minimização]
**Base legal:** [Art. 7º, [inciso] LGPD] `[modelo — verificar-pinpoint]`
- Se dado sensível: [Art. 11, [inciso] LGPD] `[modelo — verificar-pinpoint]`

---

## 2. Dados Pessoais Tratados

| Categoria | Dado específico | Sensível? | Fonte | Retenção |
|---|---|---|---|---|
| [ex.: identificação] | nome, CPF | Não | titular | [prazo] |
| [ex.: saúde] | [dado] | Sim | [fonte] | [prazo] |

**Minimização:** [justificativa de por que cada categoria é necessária para a
finalidade declarada]

---

## 3. Titulares

**Perfil:** [consumidores / funcionários / menores / outro]
**Volume estimado:** [N titulares]
**Relação com a organização:** [contratual / pré-contratual / outro]

**Menores:** [Sim / Não]
- Se sim: mecanismo de consentimento parental adotado: [descrição]
  Base: Art. 14 LGPD `[modelo — verificar]`

---

## 4. Agentes de Tratamento e Compartilhamento

| Agente | Papel (controlador/operador) | Dados compartilhados | Instrumento jurídico |
|---|---|---|---|
| [nome] | operador | [categorias] | contrato de operação (Art. 39 LGPD) |
| [nome] | operador | [categorias] | [instrumento] |

**Transferência internacional:** [Sim / Não]
- Se sim: países/organizações destinatárias: [listar]
- Mecanismo (Art. 33-36 LGPD): [adequação / cláusulas contratuais / normas
  corporativas globais / consentimento / outro] `[modelo — verificar]`

---

## 5. Medidas de Segurança (Art. 46 LGPD)

| Categoria | Medida | Status |
|---|---|---|
| Controle de acesso | [ex.: autenticação 2FA para acesso ao banco] | [implementado/planejado] |
| Criptografia | [ex.: dados em repouso: AES-256; em trânsito: TLS 1.2+] | [status] |
| Logs e auditoria | [ex.: logs de acesso retidos por 12 meses] | [status] |
| Pseudonimização | [se aplicável] | [status] |
| Plano de resposta a incidentes | [referência ao plano] | [status] |

---

## 6. Avaliação de Riscos

Para cada risco identificado:

| # | Risco | Probabilidade | Impacto | Severidade | Mitigação | Risco residual |
|---|---|---|---|---|---|---|
| 1 | [ex.: acesso não autorizado a dados de saúde] | [Alta/Média/Baixa] | [Alto/Médio/Baixo] | [🔴/🟠/🟡/🟢] | [medida adotada] | [🔴/🟠/🟡/🟢] |

**Escala de severidade:**
- 🔴 Alto: risco de dano grave ao titular (discriminação, dano financeiro
  significativo, exposição de dado sensível, ameaça física)
- 🟠 Médio: risco de impacto moderado ao titular
- 🟡 Baixo: risco de impacto limitado, reversível
- 🟢 Residual aceitável: após mitigação, risco dentro do tolerado pela organização

---

## 7. Direitos dos Titulares (Art. 18 LGPD)

| Direito | Canal de exercício | Prazo interno | Exceções aplicáveis |
|---|---|---|---|
| Confirmação de existência (I) | [canal] | [prazo] | — |
| Acesso (II) | [canal] | [prazo] | — |
| Correção (III) | [canal] | [prazo] | — |
| Anonimização/bloqueio/eliminação (IV) | [canal] | [prazo] | [se houver] |
| Portabilidade (V) | [canal] | [prazo] | [se houver] |
| Revogação do consentimento (IX) | [canal] | [prazo] | — |

---

## 8. Consistência com a Política de Privacidade

- [ ] As finalidades declaradas no RIPD estão na política de privacidade?
- [ ] As categorias de dados estão listadas na política?
- [ ] Os operadores listados no RIPD estão na política?
- [ ] Os períodos de retenção são consistentes?

**Inconsistências encontradas:** [listar ou "nenhuma"]

---

## 9. Condições para Lançamento

| # | Condição | Responsável | Prazo | Status |
|---|---|---|---|---|
| 1 | [ex.: cláusula de proteção de dados no contrato com fornecedor X] | [área] | [data] | [ ] |
| 2 | [ex.: atualização da política de privacidade para incluir finalidade Y] | [área] | [data] | [ ] |

**Condições bloqueantes (não lançar sem):** [listar ou "nenhuma"]

---

## 10. Aprovação

| Papel | Nome | Data | Assinatura |
|---|---|---|---|
| Elaborador | | | |
| Encarregado (DPO) | | | |
| Jurídico | | | |
| [outro conforme perfil] | | | |

---

*Este RIPD deve ser mantido atualizado a cada alteração significativa na
atividade de tratamento. Revisão periódica recomendada: [anual / conforme
política interna].*

> As citações e referências neste output foram geradas por modelo de IA.
> Verifique todos os dispositivos legais e guias normativos nas fontes
> primárias (www.planalto.gov.br, www.gov.br/anpd) antes de finalizar.
```

## O que esta skill não faz

- Não decide se uma base legal é adequada para casos duvidosos. Sinaliza e
  encaminha ao advogado.
- Não avalia risco de segurança técnica (pentests, análise de código). Documenta
  as medidas informadas pela equipe técnica.
- Não substitui a aprovação do encarregado ou do jurídico. Produz o rascunho
  para revisão e assinatura.
