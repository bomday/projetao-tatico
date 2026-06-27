<!--
LOCALIZAÇÃO DA CONFIGURAÇÃO:
  ~/.claude/plugins/config/plugins-brasil/contratos-brasil/CLAUDE.md

AVISO LEGAL: Este plugin é destinado ao suporte de profissionais jurídicos
habilitados. Não constitui assessoria jurídica. Todas as referências a
dispositivos legais devem ser verificadas no texto consolidado vigente.
-->

# Perfil da Prática — Contratos Comerciais (Direito Brasileiro)
*Preencha este template antes de usar as skills.*

---

## Quem somos

[Nome da organização] é [startup / empresa de médio porte / grande empresa].
A equipe de contratos tem [N] pessoas. [Nome do GC/responsável jurídico] é a
escalada final. Processamos aproximadamente [N] contratos por mês, majoritariamente
[como fornecedores / como compradores / misto]. Usamos [sistema de CLM / pasta
compartilhada / outro] para gestão contratual.

**Porte:** [microempresa / EPP / médio porte / grande — relevante para CDC, Simples
Nacional, tratamento diferenciado em contratos públicos]

**Operações com consumidores?** [Sim / Não — se sim, CDC (Lei 8.078/90) se aplica
às relações com consumidores finais, incluindo cláusulas abusivas (Art. 51 CDC)]

**Prática:**
[PLACEHOLDER — Solo/escritório / In-house / Departamento jurídico corporativo]

---

## Quem usa este plugin

**Perfil:** [PLACEHOLDER — Advogado / Paralegal com acesso a advogado / Gestor
comercial sem acesso a advogado]
**Contato jurídico:** [PLACEHOLDER]

---

## Playbook

**Lado ativo:** [PLACEHOLDER — vendedor / comprador / ambos]

> Skills que revisam contratos contra este playbook determinam primeiro em que
> lado a empresa está naquele contrato específico. Nunca aplicar posição de
> vendedor em contrato em que somos compradores, e vice-versa.

### Playbook — Lado Vendedor

*Aplica quando somos fornecedores/prestadores. Geralmente nosso papel.*

#### Limitação de responsabilidade

**Cap direto:** [PLACEHOLDER — ex.: "12 meses de honorários pagos ou devidos"]

**Danos indiretos / lucros cessantes:** [PLACEHOLDER — excluídos / limitados a X /
ilimitados / espelha o cap direto]

**Carve-outs aceitáveis acima do cap:**
[PLACEHOLDER — ex.: "Dolo, culpa grave, violação de confidencialidade, violação
de dados, infração de PI"]

**Definição da base do cap que aceitamos:**
[PLACEHOLDER — ex.: "honorários pagos nos 12 meses anteriores ao evento" vs.
"honorários devidos no período corrente" — escolher qual aceitar]

**Fallbacks aceitáveis:**
- [PLACEHOLDER]

**Nunca aceitar:**
- [PLACEHOLDER — ex.: "Lucros cessantes ilimitados"]

#### Indenização / Responsabilidade civil contratual

**Posição padrão:** [PLACEHOLDER]
**Fallbacks aceitáveis:** [PLACEHOLDER]
**Nunca aceitar:** [PLACEHOLDER]

#### Proteção de dados (LGPD)

**Posição padrão:** [PLACEHOLDER — ex.: "Nosso instrumento de operador; instrumento
do cliente aceito com redlines conforme plugin privacidade-lgpd"]
**Requisitos:** [PLACEHOLDER]
**Fallbacks aceitáveis:** [PLACEHOLDER]

#### Prazo e rescisão

**Posição padrão:** [PLACEHOLDER — ex.: "Prazo anual, renovação automática, aviso
de 30 dias para cancelar"]
**Fallbacks aceitáveis:** [PLACEHOLDER]
**Nunca aceitar:** [PLACEHOLDER — ex.: "Rescisão por conveniência durante prazo pago"]

#### Foro e lei aplicável

**Preferido:** [PLACEHOLDER — ex.: "Comarca de [cidade], lei brasileira"]
**Aceitável:** [PLACEHOLDER]
**Escalada:** [PLACEHOLDER]
**Nunca:** [PLACEHOLDER — ex.: "Foro no exterior sem cláusula compromissória"]

**Arbitragem:** [PLACEHOLDER — aceita / recusada / aceita acima de R$X —
Lei 9.307/96 é o marco da arbitragem no Brasil; cláusula compromissória é válida
para relações entre empresas (conflitos patrimoniais disponíveis)]

**Nota sobre CDC:** Se a contraparte for consumidor final (pessoa física em relação
de consumo), cláusula de foro de eleição é ineficaz se dificultar a defesa do
consumidor (CDC Art. 101, I; Súmula 381 STJ `[modelo — verificar]`).

#### O ponto inegociável

[PLACEHOLDER — o deal-breaker quando somos vendedores]

---

### Playbook — Lado Comprador

*Aplica quando somos clientes comprando de fornecedores.*

#### Limitação de responsabilidade

**Cap direto que exigimos:** [PLACEHOLDER]
**Danos indiretos / lucros cessantes:** [PLACEHOLDER]
**Carve-outs que exigimos acima do cap:** [PLACEHOLDER]
**Definição da base do cap que aceitamos:** [PLACEHOLDER]
**Fallbacks aceitáveis:** [PLACEHOLDER]
**Nunca aceitar:** [PLACEHOLDER]

#### Indenização

**Posição padrão:** [PLACEHOLDER]
**Fallbacks aceitáveis:** [PLACEHOLDER]
**Nunca aceitar:** [PLACEHOLDER]

#### Proteção de dados (LGPD)

**Posição padrão:** [PLACEHOLDER — ex.: "Fornecedor assina nosso instrumento de operador"]
**Requisitos:** [PLACEHOLDER]
**Fallbacks aceitáveis:** [PLACEHOLDER]

#### Prazo e rescisão

**Posição padrão:** [PLACEHOLDER — ex.: "Rescisão por conveniência com 30 dias de
aviso; renovação automática somente com janela de cancelamento de 30 dias"]
**Fallbacks aceitáveis:** [PLACEHOLDER]
**Nunca aceitar:** [PLACEHOLDER]

#### Foro e lei aplicável

**Preferido:** [PLACEHOLDER]
**Aceitável:** [PLACEHOLDER]
**Escalada:** [PLACEHOLDER]
**Nunca:** [PLACEHOLDER]

#### O ponto inegociável

[PLACEHOLDER — o deal-breaker quando somos compradores]

---

## Escalada

| Pode aprovar | Sem escalada | Escalar para | Via |
|---|---|---|---|
| [Paralegal/Analista] | [PLACEHOLDER — ex.: contratos até R$50k] | [Advogado responsável] | [Slack/e-mail] |
| [Advogado responsável] | [PLACEHOLDER] | [GC] | [método] |
| [GC] | [PLACEHOLDER] | [CFO/CEO] | [método] |

**Escaladas automáticas independentemente do valor:**
- [PLACEHOLDER — ex.: "Responsabilidade ilimitada, cessão de PI para o fornecedor,
  qualquer item da lista Nunca aceitar acima"]

---

## House style

**Tom nos redlines:** [PLACEHOLDER]
**Resumos para stakeholders:** [PLACEHOLDER — quem lê, qual tamanho]
**Onde o work product fica:** [PLACEHOLDER]
**Alertas de renovação vão para:** [PLACEHOLDER]

---

## Outputs

**Cabeçalho de trabalho jurídico:**
- Se usuário for **Advogado**: `CONFIDENCIAL — TRABALHO JURÍDICO INTERNO —
  PREPARADO SOB ORIENTAÇÃO JURÍDICA`
- Se usuário **não for advogado**: `NOTAS DE PESQUISA — NÃO CONSTITUI ASSESSORIA
  JURÍDICA — REVISE COM ADVOGADO HABILITADO PELA OAB ANTES DE AGIR`

**Nota sobre sigilo profissional:** Análises internas de contratos geralmente não
possuem proteção de sigilo profissional equivalente ao "attorney-client privilege"
norte-americano. No Brasil, o sigilo profissional do advogado (EOAB, Art. 7º, II)
protege as comunicações com advogados contratados. Marque documentos como
`CONFIDENCIAL — USO INTERNO` e não distribua análises jurídicas além das pessoas
envolvidas na negociação.

---

## Documentos semente revisados

| Contrato | Contraparte | Data | Termos relevantes |
|---|---|---|---|
| [PLACEHOLDER] | | | |

---

*Para reconfigurar: preencha novamente este CLAUDE.md.*
