# Ambest Brandcom website rebuild

This repository contains a dependency-free Cloudflare Worker site for Ambest Brandcom. It positions Ambest as a Mumbai-rooted brand communications partner for global companies through six primary services: Ad Films & Video Content, Brand Communication & Strategy, Creative Solutions, Digital & Social, Website Development, and Brand Experiences & Partnerships. Detailed SEO, Video Production and Digital Marketing routes remain as supporting capabilities and evidence paths. The site also includes ten visually led canonical project records, six verified film embeds, migrated editorial routes, direct legacy redirects, a guarded quote endpoint, sitemap/robots behavior, structured data and a real 404 response.

The public deployment is indexable on the approved canonical hostname. The owner-selected enquiry flow currently prepares a message for the visitor's email application; the website does not send or store that message. Automated delivery remains guarded until Ambest approves and tests an email integration.

## Project structure

- `worker/index.js` — routing, rendering, navigation, quote validation and delivery adapter.
- `worker/content.js` — service, offer, project, article and redirect records.
- `worker/generated-pages.js` — dependency-free rendered page records used by the Worker.
- `worker/logo-data.js` — the supplied transparent Ambest logo embedded for reliable header delivery.
- `public/media/` — selected Ambest-owned project, team, event, website and film-poster assets migrated from the published `.in` site.
- `scripts/dev.mjs` — local dependency-free preview server.
- `scripts/check-site.mjs` — route, metadata, link, redirect, 404 and form tests.
- `scripts/build.mjs` — copies the Worker and static media artifact to `dist/`.
- `docs/` — evidence, migration, editorial, analytics, QA and launch records.

The shared footer links to Ambest's six published social profiles: Facebook, X, YouTube, Instagram, LinkedIn and Pinterest. Their URLs are maintained in `socialProfiles` in `worker/index.js` and mirrored in the Organization structured data.

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

The checks exercise every required public route, crawlable internal destinations, preview and production indexing modes, project imagery, film embeds, a direct legacy redirect, genuine 404 behavior, invalid and valid development form submissions, duplicate idempotency and the production-unconfigured failure state.

## Quote delivery

The `POST /api/quote` endpoint enforces same-origin submission, JSON content type, payload and field limits, required-field and URL validation, an allowlisted service registry, a honeypot, server-side Turnstile verification, idempotency and HTTPS webhook delivery. It returns success only after the configured destination accepts the lead. It never fetches a user-supplied website URL.

Configure the variables listed in `.env.example` in the Cloudflare Worker environment only if automated delivery is reactivated. `LEAD_DELIVERY_VERIFIED=true` must not be set until a real destination and Turnstile check have been tested. `DEVELOPMENT_MODE=true` exists only for automated local testing and must never be enabled in production.

## Production release

The production routing and public-indexing switch are now enabled for the approved canonical hostname. Continue using `docs/launch-checklist.md` for operational follow-up: approve contact and legal text, configure and test real lead delivery, resolve or omit disputed metrics, confirm client/media permissions, preserve mail DNS records, and complete browser/accessibility checks.

## Cloudflare Worker deployment

The repository includes `wrangler.jsonc` for direct deployment to Cloudflare Workers. The production configuration routes the existing proxied `www.ambestbrandcom.com` and `ambestbrandcom.com` hostnames through the Worker, binds versioned static assets at `/media/`, publishes with `PUBLIC_SITE=true`, and canonicalizes public traffic to `https://www.ambestbrandcom.com`.

```text
pnpm install
pnpm cloudflare:check
pnpm deploy:cloudflare
```

The quote form currently prepares an email to `sachin@ambestmedia.com`. The visitor must press Send in their email application; no website delivery or inbox receipt is claimed. Contextual quote links preserve the selected main service or specialist offer without adding more required form fields. A future approved Cloudflare Email Service setup would require a verified sender/destination and Turnstile keys. The endpoint validates Turnstile tokens server-side before sending, but this automated mode is intentionally off until an end-to-end inbox test succeeds.
