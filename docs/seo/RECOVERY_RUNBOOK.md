# Ankara recovery release

The recovery branch stops automatic page generation, preserves existing search winners, consolidates reviewed duplicate URLs into equivalent existing pages, and removes unsupported commercial claims. It creates no new programmatic pages.

## Evidence and rollback

Private Search Console exports, the reviewed migration map, per-URL decisions and before/after crawl reports remain in `docs/seo/recovery/2026-09-16/` and `.agents/reports/recovery-2026-09-16/`. Both are git-ignored. The public redirect configuration contains only source and destination paths.

The initial checkout and pre-existing user edits are preserved on the backup branch and in `.agents/reports/recovery-2026-09-16/backup/`. Revert the release commit or roll back the Cloudflare Pages production deployment; do not reset unrelated working changes.

## Cloudflare deployment

The existing Pages project is `ankara-nakliyat`, connected to the repository's `main` branch. Its configured Linux build runs `npx @cloudflare/next-on-pages@1` and publishes `.vercel/output/static`. That output directory is an adapter convention, not proof that Pages deploys to Vercel. The reviews API uses the Edge runtime; dynamic page families publish only their explicit `generateStaticParams` lists.

`npm run pages:build` invokes the same adapter locally. The adapter warns that its CLI subprocesses can fail on Windows; in that case record the failure and inspect the authoritative Cloudflare Linux build log. Check the Pages custom-domain list and actual domain response separately from deployment success.

The small worker in `infra/canonical-redirect` handles only HTTP apex and HTTP/HTTPS www requests, sending them straight to the final canonical path. HTTPS apex content stays on the site's hosting project. Keep its redirect map synchronized with the application when migrations change. Deploy with `npx wrangler deploy --config infra/canonical-redirect/wrangler.jsonc`; remove only these worker routes to roll back the edge redirect layer.

## Repeatable verification

Run `npm run build`, `npm run lint`, and `npm test --prefix .agents/seo-tools`.

Start the production build on port 3101 with `npm run start -- --hostname 127.0.0.1 --port 3101`.

The read-only recovery tools accept these commands:

- `python scripts/recovery-crawl.py --phase candidate --origin http://127.0.0.1:3101`
- `python scripts/recovery-analyze.py --phase candidate --similarity`
- `python scripts/recovery-winner-check.py candidate`
- `node scripts/recovery-redirect-test.mjs --origin http://127.0.0.1:3101`
- `node scripts/seo-recovery-ui-qa.mjs --origin http://127.0.0.1:3101`
- `node .agents/seo-tools/performance.mjs`

After deployment, use a new crawl phase with the default live origin, and pass the live origin to redirect/UI checks. Run `node .agents/seo-tools/performance.mjs --live` separately from other load tests. Do not reuse cached crawl evidence after source or deployment changes; use a new phase or `--fresh`.

`recovery-migration-plan.mjs` produces unapproved candidates and must not overwrite a reviewed map. Review GSC history, exact intent and the destination before editing `recoveryRedirects.json`. No returned Search Console row is not proof of zero demand. Multi-URL query overlap is not proof of harmful cannibalization.

## Follow-up

Compare equivalent Search Console periods at 7, 28, 56 and 90 days after the actual release date. Preserve the homepage's observed ownership of core Ankara queries. Track clicks, impressions, CTR, position, the same URL Inspection sample and separately obtained Page Indexing totals. Do not confuse technically indexable URLs with Google-indexed URLs or lab Lighthouse with field Core Web Vitals.

High content similarity, randomized title/body intent mismatches and historical URLs without an equivalent replacement remain review work. The release must not be described as a complete resolution of those issues. Continue family-by-family editorial improvement using actual business evidence, without new URL expansion or bulk noindex.
