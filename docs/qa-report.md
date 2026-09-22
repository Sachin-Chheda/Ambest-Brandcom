# QA report

Review date: 22 September 2026

## Automated checks passed

- JavaScript syntax: `worker/index.js`, `worker/content.js`, `worker/generated-pages.js` and `worker/logo-data.js`.
- Route suite: 57 implemented pages return HTTP 200.
- Internal crawl: 56 distinct internal destinations resolve without an error response.
- Page structure: every required route has a unique title, correct canonical host, one H1, skip navigation, primary navigation and a main landmark.
- Preview controls: every review page is `noindex,nofollow`, preview robots disallows crawling and the private sitemap has no URLs.
- Public-mode controls: normal pages become `index,follow` and the sitemap contains required capability and service routes; legal review holds remain excluded.
- Brand system: the supplied transparent Ambest logo is embedded in the header and footer, all six primary service names appear on the homepage, medium font weights are enforced, a blue–violet–orange gradient is present and the previous green hex is absent.
- Migration: a representative legacy URL returns a direct 308 redirect; unknown paths return a genuine 404 with noindex protection.
- Quote endpoint: invalid input is rejected, an allowlisted local-development enquiry is accepted, duplicate idempotency returns the same reference and an unconfigured production enquiry fails safely.
- Build artifact: `dist/server/index.js` loads as a Worker and returns HTML; an unknown artifact route returns 404.

## Local HTTP checks passed

- `GET /` returned 200.
- `GET /services/ad-films-video-content/` returned 200.
- The delivered homepage contains the supplied logo data, all six main services and gradient CSS, and contains no legacy green value.

## Visual and external checks not claimed

- Automated browser screenshot inspection could not be completed because the desktop browser-control kernel failed to initialize with `failed to write kernel assets: The system cannot find the path specified. (os error 3)`. A live local preview was opened for owner review, but no automated pixel-level or responsive screenshot pass is claimed.
- Lighthouse, screen-reader, real-device and cross-browser passes remain required before production launch.
- Production lead delivery was not tested because approved Turnstile credentials and a lead webhook were not provided.
- The proposed canonical domain, custom-domain response, DNS, email records and old-host redirects require owner access and live infrastructure checks.
- Published contacts in Singapore and Canada, named global projects, country coverage, service commercial terms, media rights, project metrics and legal copy remain owner-review items.

## Release state

The artifact is appropriate for a private review deployment. It is not approved for public indexing, DNS cutover or production lead collection.
