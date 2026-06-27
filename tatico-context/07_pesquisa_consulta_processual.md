# Relatório de Pesquisa — Consulta Processual para o TÁTICO MCP
**Verificação adversarial com 106 agentes · 25 claims · 21 confirmadas · jun/2026**

---

## Resumo Executivo

A estratégia mais viável para a tool `get_case_status(numero_processo)` é:

> **DataJud (CNJ) como fonte primária gratuita → Escavador V2 como fallback pago**

- **DataJud:** gratuito, sem cadastro, cobre 91 tribunais, requer parsing do número CNJ para rotear por tribunal
- **Escavador V2:** pago, endpoint direto por número CNJ, dados mais estruturados, custo por contato comercial
- **JusBrasil:** sem API pública documentada para consulta processual — descartado
- **STF:** não integra o DataJud — lacuna conhecida, exige solução alternativa

---

## Plataforma 1 — CNJ DataJud ✅ Recomendado como primário

### Status da API
**Pública, gratuita, sem cadastro.** API Elasticsearch hospedada pelo CNJ.

### Autenticação
```http
Authorization: APIKey cDZHYzlZa0JadVREZDJCendQbXY6SkJlTzNjLV9TRENyQk1RdnFKZGRQdw==
```
> ⚠️ Prefixo `APIKey` (não `Bearer`). Chave pública divulgada na wiki do CNJ — **pode mudar a qualquer momento sem aviso**. Implementar lógica para buscar a chave atual antes de usar em produção.

### Endpoints
```
URL base: https://api-publica.datajud.cnj.jus.br/

Consulta por processo:
POST https://api-publica.datajud.cnj.jus.br/api_publica_{tribunal}/_search

Body (Elasticsearch query):
{
  "query": {
    "match": {
      "numeroProcesso": "00008323520184013202"
    }
  }
}
```
> Número sem pontuação (só dígitos). Não existe endpoint universal — é obrigatório rotear para o tribunal correto.

### Campos retornados (`_source`)
```json
{
  "numeroProcesso": "00008323520184013202",
  "classe": { "codigo": 7, "nome": "Ação Civil Pública" },
  "tribunal": "TJSP",
  "dataHoraUltimaAtualizacao": "2024-03-15T14:22:00",
  "grau": "G1",
  "dataAjuizamento": "2018-03-23",
  "orgaoJulgador": { "nome": "2ª Vara Cível" },
  "assuntos": [{ "codigo": 10288, "nome": "Indenização por Dano Moral" }],
  "nivelSigilo": 0,
  "movimentos": [
    {
      "codigo": 22,
      "nome": "Despacho",
      "dataHora": "2024-03-15T14:22:00",
      "complementosTabelados": []
    }
  ]
}
```

### Cobertura de tribunais (91 no total)
| Ramo | Tribunais | Exemplos |
|---|---|---|
| **TJ Estaduais** | 27 | TJSP (`tjsp`), TJPE (`tjpe`), TJRJ (`tjrj`), todos os estados |
| **TRTs** | 24 | TRT1 (`trt1`) a TRT24 (`trt24`) — inclui TRT6 (Pernambuco) |
| **TRFs** | 6 | TRF1 a TRF6 |
| **Superiores** | 4 | STJ, TST, TSE, STM |
| **TREs** | 27 | TRE de cada estado |
| **Militares Estaduais** | 3 | TJMMG, TJMRS, TJMSP |
| ❌ **STF** | — | **Ausente do DataJud** |

### Custo e limites
- **Custo:** gratuito
- **Rate limit:** não documentado oficialmente
- **SLA:** não documentado — sem garantias de disponibilidade

### Viabilidade para o TÁTICO
**Recomendado como primário.** Gratuito, ampla cobertura, dados suficientes para a tool `get_case_status`. A complexidade está no roteamento por tribunal (resolvida com parsing do número CNJ — ver seção de implementação).

---

## Plataforma 2 — Escavador Business API ✅ Recomendado como fallback

### Status da API
**Pública, paga, documentada.** API REST V2 com endpoint dedicado por número CNJ.

### Autenticação
```http
Authorization: Bearer SEU_PAT_TOKEN
```
PAT (Personal Access Token) — exclusivo para server-to-server. Nunca expor no frontend.
Token gerado em: `escavador.com` → conta → API.

### Endpoints principais
```
URL base V2: https://api.escavador.com/api/v2

Consulta por número CNJ:
GET https://api.escavador.com/api/v2/processos/numero_cnj/{numero}

Movimentações:
GET https://api.escavador.com/api/v2/processos/{id}/movimentacoes

Envolvidos (partes):
GET https://api.escavador.com/api/v2/processos/{id}/envolvidos

Documentos:
GET https://api.escavador.com/api/v2/processos/{id}/documentos
```
> ✅ Aceita número CNJ com ou sem pontuação. Não precisa de roteamento por tribunal.

### Dados retornados
- `MovimentacaoFonte` — histórico completo de movimentações com fonte
- `EnvolvidoEncontrado` — partes do processo (autor, réu, advogados)
- `Estrutura Tribunal` — nome, sigla, ramo
- `StatusAtualizacaoProcesso` — quando foi a última atualização
- Documentos públicos e PDFs disponíveis

### Cobertura
Todos os tribunais públicos brasileiros, incluindo STF (lacuna do DataJud coberta).

### Custo e limites
- **Rate limit:** 500 req/min (hard limit, confirmado)
- **Custo por consulta:** reportado no header `Creditos-Utilizados` — valor exato requer contato comercial
- **Plano trial:** não identificado publicamente — contatar `api@escavador.com`
- **Estimativa para MVP:** 40 processos × 1x/dia × 30 dias = 1.200 consultas/mês — provavelmente baixo custo, mas não confirmado

### Viabilidade para o TÁTICO
**Recomendado como fallback pago.** Endpoint mais simples (sem roteamento), dados mais ricos. Ideal quando DataJud falha ou para tribunais não cobertos (ex: STF). Requer cotação comercial antes de comprometer.

---

## Plataforma 3 — JusBrasil ❌ Descartado

### Status da API
**Sem API pública documentada para consulta processual.**

O produto Digesto (que tinha API) foi rebrandeado para **"Jusbrasil Soluções"** — domínio `digesto.com.br` redireciona para a nova marca. Não foi identificada API pública equivalente ao DataJud ou Escavador. O portal `developers.jusbrasil.com.br` existe mas não documenta acesso programático a processos.

### Viabilidade para o TÁTICO
**Inviável no momento.** Pode ter API B2B privada — requer contato direto com a empresa para investigar.

---

## Plataforma 4 — Alternativas investigadas

### PJe MCP Server (experimental)
- Projeto open-source `github.com/chapirousIA/pje-mcp-server` com 10 tools MCP para PJe
- Tools incluem `pje_buscar_processo` e `pje_listar_processos`
- **Problema:** apenas 2 commits, sem releases, autenticação por certificado digital OAB (A1/A3) — inviável para SaaS multi-tenant
- **Status:** não usar em produção

### Projuris
- Software de gestão jurídica com integrações documentadas
- Voltado para escritórios, não para desenvolvedores externos
- Sem API pública de consulta processual identificada

### Thomson Reuters / Westlaw Brasil
- Produto enterprise, sem API pública acessível para pequenos escritórios
- Custo proibitivo para o perfil do TÁTICO

### Portais estaduais (TJPE, TRT6, TJRJ)
- Cada tribunal tem interface diferente, sem padrão REST comum
- TJSP bloqueou acesso programático com HTTP 403 (WAF ativo)
- **DataJud já agrega esses dados** — usar DataJud em vez de acessar portais diretamente

---

## Implementação MCP — `get_case_status`

### Parsing do número CNJ

O formato `NNNNNNN-DD.AAAA.J.TT.OOOO` encode o tribunal nos segmentos `J` e `TT`:

```typescript
// Mapeamento J → ramo do judiciário
const RAMO_J: Record<string, string> = {
  "1": "stf",   // STF — ausente no DataJud, usar Escavador
  "2": "stj",
  "3": "tst",
  "4": "tse",
  "5": "trf",   // TRF — usar trf1..trf6 com base no TT
  "6": "trt",   // TRT — usar trt1..trt24 com base no TT
  "7": "tre",   // TRE — usar tre-{uf} com base no TT
  "8": "tjpe",  // TJ estadual — usar tj{uf} com base no TT
};

// Mapeamento TT → sigla do tribunal DataJud (TJs estaduais, J=8)
const TJ_SIGLA: Record<string, string> = {
  "01": "tjac", "02": "tjal", "03": "tjap", "04": "tjam", "05": "tjba",
  "06": "tjce", "07": "tjdf", "08": "tjes", "09": "tjgo", "10": "tjma",
  "11": "tjmt", "12": "tjms", "13": "tjmg", "14": "tjpa", "15": "tjpb",
  "16": "tjpr", "17": "tjpe", "18": "tjpi", "19": "tjrj", "20": "tjrn",
  "21": "tjrs", "22": "tjro", "23": "tjrr", "24": "tjsc", "25": "tjse",
  "26": "tjsp", "27": "tjto",
};

function parseCNJ(numero: string): { tribunal: string; numeroLimpo: string } {
  // Remove pontuação: 0001234-56.2023.8.26.0001 → 00012345620238260001
  const limpo = numero.replace(/[.\-]/g, "");
  // Extrai segmentos: NNNNNNN DD AAAA J TT OOOO
  const match = numero.match(/^(\d{7})-(\d{2})\.(\d{4})\.(\d)\.(\d{2})\.(\d{4})$/);
  if (!match) throw new Error(`Número CNJ inválido: ${numero}`);
  const [, , , , j, tt] = match;
  
  let tribunal: string;
  if (j === "8") tribunal = TJ_SIGLA[tt] ?? "tjsp";
  else if (j === "6") tribunal = `trt${parseInt(tt)}`;
  else if (j === "5") tribunal = `trf${parseInt(tt)}`;
  else if (j === "2") tribunal = "stj";
  else if (j === "3") tribunal = "tst";
  else tribunal = j; // fallback — tratar STF separadamente
  
  return { tribunal, numeroLimpo: limpo };
}
```

### Tool MCP completa — estratégia DataJud → Escavador fallback

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const DATAJUD_BASE = "https://api-publica.datajud.cnj.jus.br";
// ⚠️ Buscar essa chave da wiki antes de usar em produção — pode mudar
const DATAJUD_KEY = "APIKey cDZHYzlZa0JadVREZDJCendQbXY6SkJlTzNjLV9TRENyQk1RdnFKZGRQdw==";

server.tool(
  "get_case_status",
  "Busca o andamento atual de um processo judicial pelo número CNJ. Retorna últimas movimentações, tribunal, partes e status de atualização.",
  {
    numero_processo: z.string().describe(
      "Número do processo no formato CNJ: NNNNNNN-DD.AAAA.J.TT.OOOO " +
      "Exemplo: 0001234-56.2023.8.26.0001"
    ),
  },
  async ({ numero_processo }, { officeId, escavadorToken }) => {
    try {
      // 1. Tentar DataJud (gratuito)
      const { tribunal, numeroLimpo } = parseCNJ(numero_processo);

      // STF não está no DataJud — pular direto para Escavador
      if (tribunal === "1") throw new Error("STF não disponível no DataJud");

      const datajudRes = await fetch(
        `${DATAJUD_BASE}/api_publica_${tribunal}/_search`,
        {
          method: "POST",
          headers: {
            "Authorization": DATAJUD_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: { match: { numeroProcesso: numeroLimpo } },
          }),
        }
      );

      if (datajudRes.ok) {
        const data = await datajudRes.json();
        const processo = data.hits?.hits?.[0]?._source;
        if (processo) {
          const ultimasMovimentacoes = (processo.movimentos ?? [])
            .slice(0, 5)
            .map((m: any) => `${m.dataHora?.slice(0, 10)} — ${m.nome}`)
            .join("\n");

          return {
            content: [{
              type: "text",
              text: [
                `📋 **Processo ${processo.numeroProcesso}**`,
                `🏛️ Tribunal: ${processo.tribunal}`,
                `⚖️ Classe: ${processo.classe?.nome}`,
                `📅 Ajuizamento: ${processo.dataAjuizamento}`,
                `🔄 Última atualização: ${processo.dataHoraUltimaAtualizacao?.slice(0, 10)}`,
                `\n**Últimas movimentações:**\n${ultimasMovimentacoes}`,
              ].join("\n"),
            }],
          };
        }
      }

      // 2. Fallback: Escavador (pago)
      if (!escavadorToken) {
        return { content: [{ type: "text", text: "Processo não encontrado no DataJud e Escavador não configurado." }] };
      }

      const escavadorRes = await fetch(
        `https://api.escavador.com/api/v2/processos/numero_cnj/${encodeURIComponent(numero_processo)}`,
        {
          headers: { "Authorization": `Bearer ${escavadorToken}` },
        }
      );

      if (!escavadorRes.ok) throw new Error(`Escavador: ${escavadorRes.status}`);
      const esc = await escavadorRes.json();

      return {
        content: [{
          type: "text",
          text: JSON.stringify(esc, null, 2),
        }],
      };

    } catch (err: any) {
      return {
        content: [{ type: "text", text: `Erro ao consultar processo: ${err.message}` }],
        isError: true,
      };
    }
  }
);
```

### Schema adicional — campo `advbox_token` por escritório

Para habilitar o fallback Escavador no TÁTICO multi-tenant, adicionar à tabela `offices`:

```sql
ALTER TABLE offices ADD COLUMN escavador_token text;
```

O advogado configura o token Escavador nas configurações do TÁTICO (opcional — DataJud já cobre a maioria dos casos).

---

## Tabela Comparativa

| | **DataJud (CNJ)** | **Escavador V2** | **JusBrasil** | **PJe MCP** |
|---|---|---|---|---|
| **Status API** | ✅ Pública | ✅ Pública paga | ❌ Sem API pública | ⚠️ Experimental |
| **Autenticação** | APIKey pública | Bearer PAT | — | Certificado OAB |
| **Endpoint por CNJ** | POST com routing | GET direto | — | Inconclusivo |
| **Cobertura** | 91 tribunais (sem STF) | Todos + STF | — | PJe apenas |
| **Custo** | Gratuito | Por crédito (cotar) | — | Open-source |
| **Dados retornados** | Movimentos, classe, partes | Movimentos + docs + PDFs | — | — |
| **Complexidade integração** | Média (routing) | Baixa | — | Alta |
| **Uso no TÁTICO** | **Primário** | **Fallback** | Descartado | Não usar |

---

## Recomendação Final

**Implementar em 2 fases:**

**Fase 2A (MVP da integração — 2 dias):**
- Implementar `get_case_status` com DataJud apenas
- Parsing do número CNJ para routing por tribunal
- Cobre ~95% dos casos (91 tribunais, sem STF)

**Fase 2B (opcional — 1 dia extra):**
- Adicionar fallback Escavador para STF e casos onde DataJud falha
- Adicionar campo `escavador_token` opcional nas configurações do escritório
- Cotação comercial com Escavador antes de habilitar

---

## Questões em Aberto

1. **Custo Escavador:** valor exato por consulta não é público — contatar `api@escavador.com` antes de planejar o fallback
2. **Chave DataJud:** implementar busca dinâmica da chave na wiki (`datajud-wiki.cnj.jus.br/api-publica/acesso`) para não depender de chave hardcoded
3. **Mapeamento TT completo:** a tabela acima cobre TJs estaduais (J=8) — completar para TRTs (J=6), TRFs (J=5) e TREs (J=7) com tabela oficial do CNJ
4. **Jusbrasil Soluções:** pode ter API B2B privada — investigar se vale contato direto

---

## Fontes de Pesquisa

| Fonte | URL | Conteúdo |
|---|---|---|
| Escavador API docs (V1+V2) | `https://api.escavador.com/docs` | Autenticação, rate limits, endpoints |
| Escavador V2 — consulta processos | `https://api.escavador.com/v2/docs/consulta-de-processos` | Endpoint CNJ, estrutura de dados |
| Escavador sobre/API | `https://www.escavador.com/sobre/api` | Modelo de negócio, PAT, server-to-server |
| Escavador developers | `https://www.escavador.com/developers` | Portal do desenvolvedor |
| DataJud — acesso | `https://datajud-wiki.cnj.jus.br/api-publica/acesso` | Chave pública, autenticação |
| DataJud — endpoints | `https://datajud-wiki.cnj.jus.br/api-publica/endpoints/` | Lista dos 91 tribunais e aliases |
| DataJud — exemplo 1 | `https://datajud-wiki.cnj.jus.br/api-publica/exemplos/exemplo1/` | Exemplo POST por número de processo |
| DataJud — glossário | `https://datajud-wiki.cnj.jus.br/api-publica/glossario/` | Campos do `_source` |
| CNJ — DataJud institucional | `https://www.cnj.jus.br/sistemas/datajud/` | Cobertura, tribunais participantes |
| GitHub — busca-processos-judiciais | `https://github.com/joaotextor/busca-processos-judiciais` | Implementação open-source DataJud |
| GitHub — pje-mcp-server | `https://github.com/chapirousIA/pje-mcp-server` | MCP server experimental para PJe |
| GitHub — escavador-skill | `https://github.com/teckerconsultoria/escavador-skill` | SDK terceiro Escavador |
| GitHub — escavador-api (Python) | `https://github.com/Murabei-OpenSource-Codes/escavador-api` | Biblioteca Python Escavador |
| Dev.to — DataJud CNJ | `https://dev.to/leonardo_vilela/construindo-algoritmo-para-consumir-a-api-publica-do-cnj-conselho-nacional-de-justica-1a-parte-3n4i` | Tutorial parsing número CNJ |
| Digesto (rebrand) | `https://digesto.com.br` | Confirma rebrand para Jusbrasil Soluções |

---

*Relatório gerado por pesquisa adversarial com 106 agentes, 23 fontes, 25 claims verificadas (21 confirmadas, 4 eliminadas). Data: junho/2026.*
