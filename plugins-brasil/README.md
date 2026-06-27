# Plugins Brasil — Adaptação para Direito Brasileiro

Adaptações dos plugins `anthropics/claude-for-legal` para o ordenamento jurídico brasileiro.

> **Aviso obrigatório:** Este material é de suporte a profissionais jurídicos.
> Não constitui assessoria jurídica. Consulte sempre um advogado habilitado pela
> **OAB** antes de tomar qualquer decisão com consequências legais.
> Todas as referências legais devem ser verificadas no texto consolidado vigente
> disponível em [www.planalto.gov.br](https://www.planalto.gov.br).

---

## Plugins disponíveis

| Plugin | Base legal principal | Equivalente original |
|--------|----------------------|----------------------|
| [`privacidade-lgpd`](./privacidade-lgpd) | Lei 13.709/2018 (LGPD) + Resoluções ANPD | `privacy-legal` |
| [`contratos-brasil`](./contratos-brasil) | CC/2002 + CDC + Lei 9.307/96 | `commercial-legal` |
| [`trabalhista-clt`](./trabalhista-clt) | CLT + CF/88 + Reforma Trabalhista | `employment-legal` |
| [`clinica-juridica`](./clinica-juridica) | Estrutura agnóstica de jurisdição | `legal-clinic` |

## Limitações importantes

1. **Jurisdição:** Direito federal brasileiro. Legislação estadual e municipal
   (ISS, ICMS, obrigações estaduais) não está coberta de forma sistemática.

2. **Atualização:** A lei muda. A ANPD emite resoluções frequentemente. O TST
   edita e cancela súmulas. Sempre verifique o texto vigente antes de agir.

3. **Não substitui advogado:** O exercício irregular da advocacia é infração
   penal (Lei 8.906/94, Art. 7º). Estes plugins assistem profissionais jurídicos;
   não prestam assessoria jurídica diretamente a leigos.

4. **Citações:** Todo conteúdo legal gerado por IA deve ser verificado contra
   a fonte primária (Planalto, Diário Oficial, JusBrasil para jurisprudência).

## Convenções de etiquetagem

Consistentes com os plugins originais, adaptadas para o contexto brasileiro:

- `[verificar]` — afirmação factual a confirmar na fonte primária
- `[revisão]` — decisão de mérito que o advogado precisa tomar
- `[conhecimento do modelo — verificar]` — proveniente do treinamento, não de busca em tempo real
- `[modelo — verificar-pinpoint]` — citação com artigo/inciso específico: máximo risco de alucinação
- `[usuário forneceu]` — texto colado ou enviado pelo usuário
- `[planalto.gov.br]` — apenas se a norma foi efetivamente buscada nesta sessão
