# Deploy na Vercel (poctfy-9797)
Projeto: **TudoETF Screener (Next.js)**

## Opção A — CLI (3 comandos)
1) Instale o CLI:
   ```bash
   npm i -g vercel
   ```
2) Faça login e selecione a conta **poctfy-9797** quando perguntado:
   ```bash
   vercel login
   ```
3) Na pasta do projeto:
   ```bash
   vercel
   ```
   - Quando perguntar o escopo, escolha **poctfy-9797**.
   - Project name: `tudoetf-screener` (sugestão).
   - Framework: **Next.js** (detecta automático).
   - Ele retorna a URL (preview).

### Produção
Depois:
```bash
vercel --prod
```

## Opção B — Importar via Git (UI da Vercel)
1) Suba estes arquivos para um repositório (GitHub/GitLab/Bitbucket).
2) Em https://vercel.com/new, escolha a conta **poctfy-9797** e importe o repositório.
3) Aceite as detecções padrão (Next.js). O deploy sobe automático.

## Notas
- Não há variáveis de ambiente necessárias neste MVP.
- A API do screener está em `pages/api/etfs.ts` e usa o dataset local `data/etfs.json`.
- Caso queira um subdomínio: adicione em **Settings → Domains** (ex.: `screener.tudoetf.com.br`) e aponte o CNAME.
