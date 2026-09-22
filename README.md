# Ambest Brandcom website rebuild

This repository contains a dependency-free Cloudflare Worker site for Ambest Brandcom. It positions Ambest as a Mumbai-rooted brand communications partner for global companies through six primary services: Ad Films & Video Content, Brand Communication & Strategy, Creative Solutions, Digital & Social, Website Development, and Brand Experiences & Partnerships. Detailed SEO, Video Production and Digital Marketing routes remain as supporting capabilities and evidence paths. The site also includes ten canonical project records, migrated editorial routes, direct legacy redirects, a guarded quote endpoint, sitemap/robots behavior, structured data and a real 404 response.

The current deployment is a private review build. It deliberately remains `noindex` and does not claim production lead delivery until Ambest supplies and tests approved Turnstile and lead-webhook credentials.

## Project structure

- `worker/index.js` — routing, rendering, navigation, quote validation and delivery adapter.
- `worker/content.js` — service, offer, project, article and redirect records.
- `worker/generated-pages.js` — dependency-free rendered page records used by the Worker.
- `worker/logo-data.js` — the supplied transparent Ambest logo embedded for reliable header delivery.
- `scripts/dev.mjs` — local dependency-free preview server.
- `scripts/check-site.mjs` — route, metadata, link, redirect, 404 and form tests.
- `scripts/build.mjs` — copies the Worker artifact to `dist/server`.
- `docs/` — evidence, migration, editorial, analytics, QA and launch records.

## Local review

Use Node.js 22 or newer:

```text
node scripts/dev.mjs
```

Open `http://127.0.0.1:4173/`. The server renders meaningful HTML without a client framework.

## Verification and build

```text
node --check worker/index.js
node --check worker/content.js
node scripts/check-site.mjs
node scripts/build.mjs
node scripts/validate-artifact.mjs
```

The checks exercise every required public route, crawlable internal destinations, preview and production indexing modes, a direct legacy redirect, genuine 404 behavior, invalid and valid development form submissions, duplicate idempotency and the production-unconfigured failure state.

## Quote delivery

The `POST /api/quote` endpoint enforces same-origin submission, JSON content type, payload and field limits, required-field and URL validation, an allowlisted service registry, a honeypot, server-side Turnstile verification, idempotency and HTTPS webhook delivery. It returns success only after the configured destination accepts the lead. It never fetches a user-supplied website URL.

Configure the variables listed in `.env.example` through the Sites environment interface. `DEVELOPMENT_MODE=true` exists only for automated local testing and must never be enabled in production.

## Production release

Do not enable `PUBLIC_SITE=true` or attach a production domain until all launch conditions in `docs/launch-checklist.md` are satisfied. In particular, verify domain ownership and redirect direction, approve contact and legal text, configure and test real lead delivery, resolve or omit disputed metrics, confirm client/media permissions, apply the direct legacy redirect map on the infrastructure that receives the old hostname, preserve mail DNS records, and complete browser/accessibility checks.

## Cloudflare Worker deployment

The repository includes `wrangler.jsonc` for direct deployment to Cloudflare Workers. The checked-in configuration keeps the review build out of search indexes with `PUBLIC_SITE=false`.

```text
pnpm install
pnpm cloudflare:check
pnpm deploy:cloudflare
```

Configure `TURNSTILE_SECRET_KEY` and `LEAD_WEBHOOK_URL` as encrypted Worker secrets before enabling production lead delivery. Set `PUBLIC_SITE=true` only after the production release checklist is complete.

