# TudoETF Screener – Full MVP (com API + detalhe)
MVP pronto para rodar/local e publicar (Vercel).

## Rodar local
1. Node 18+
2. `npm install`
3. `npm run dev`
4. Abra http://localhost:3000

## Publicar (Vercel)
- `npm i -g vercel`
- `vercel` (na raiz do projeto)

## Endpoints
- `GET /api/etfs` com query params:
  - `q`, `assetClass`, `domicile`, `maxTer` (em %), `minAum`, `minYield`,
    `sortBy`, `sortDir`, `page`, `pageSize`
  - `ticker` (retorna item específico)

## Estrutura de dados
- `data/etfs.json` é o dataset local (seed). Em produção, troque por ETL automático.
- Páginas de detalhe: `/etf/[ticker]`

## ETL (esboço)
- Pasta `scripts/`: inclua coletores que unificam B3/administradores/ANBIMA (BR),
  e UCITS (LSE/Xetra) + EUA (prospectos/administradores). Gere um JSON no formato
  de `data/etfs.json`.
