# 16 September brief: 6 October implementation pass

The attached research brief was evaluated against later owner decisions and the already-live site. The owner explicitly reconfirmed six main services on 6 October 2026. Therefore this pass keeps `www.ambestbrandcom.com` as the canonical host and retains the six-service navigation; it does not replace them with the brief's older `ambestmedia.com` / three-division proposal. SEO, Video Production and Digital Marketing remain specialist routes beneath the broader offer.

## Implemented in this pass

Every primary service route now has distinct buyer-fit, scope, process, evidence/evaluation and FAQ content in addition to existing galleries, media, related capability links and quote preselection:

| Primary route | Supporting capability | Canonical project evidence |
| --- | --- | --- |
| `/services/ad-films-video-content/` | Video Production and 16 format pages | Recons Group; Shreeji Woodcraft |
| `/services/brand-communication-strategy/` | Brand & Creative | Bhoomi; Recons Group |
| `/services/creative-solutions/` | Brand & Creative | Shreeji Woodcraft; Bryan & Candy |
| `/services/digital-social/` | Digital Marketing, social, PPC, content and SEO | Red Moments; Bryan & Candy |
| `/services/website-development/` | Website Design & Development; Technical SEO | Bhoomi; Shreeji Woodcraft |
| `/services/brand-experiences-partnerships/` | Exhibitions & Events | Red Moments; Timex Mica |

The content distinguishes a proposed scope from a guaranteed package, separates ad spend / third-party costs where applicable, describes global collaboration without inventing overseas offices, and avoids unverified numerical outcomes. Published case studies remain qualitative where the evidence register does not support a metric.

`scripts/check-site.mjs` now fails if a primary service lacks its guidance, process, FAQs or canonical proof links. The build copies the new content module into the Worker artifact.
Each primary route now also emits page-specific `Service` and `BreadcrumbList` structured data; the route check verifies their canonical URLs.

Specialist quote links now carry all eight SEO/video offer choices and seven digital-service choices into the same short enquiry form. A division-only link is also recognized. Unknown query values are ignored. These choices change the preselected label, not the number of required fields or the owner-selected direct-email delivery mode.

## Verification on 6 October 2026

- `node scripts/check-site.mjs`: passed; 74 routes and 77 internal destinations checked, including form validation and idempotency tests.
- Quote-context assertions cover all eight specialist offers, seven digital services, three division-level links, the six main services and an invalid query value.
- `node scripts/audit-content.mjs`: 72 indexable pages; zero missing descriptions, duplicate titles/descriptions, missing image alt attributes, broken status or content-link findings in its current rule set.
- `node scripts/build.mjs` and `node scripts/validate-artifact.mjs`: passed.
- Local browser inspection: `/services/website-development/` checked at the default desktop viewport and 390 × 844 mobile viewport. The new sections, gallery and proof links rendered without observed horizontal clipping. This is a representative template check, not a full visual or accessibility certification.

## Still requiring owner or infrastructure action

- The currently selected enquiry mode prepares an email to `sachin@ambestmedia.com`; the visitor must send it from their email application. It does **not** verify that a message reached Ambest. A tested server-side delivery path, Turnstile configuration and applicable mailbox setup remain necessary for automatic submissions.
- Confirm current contact/office wording, legal notices, client/media permissions, disputed case metrics and offer commercial terms before publishing claims that depend on them.
- The brief's migration and old-domain redirect plan cannot be treated as complete merely because new-host redirects exist. The receiving infrastructure for `ambestbrandcom.in` needs its own verified mapping and cutover authority.
- Search-volume / difficulty values remain `not_retrieved` without an authorized quantitative data source. Rankings and AI citation outcomes are not claimed.
- Complete the wider browser matrix (360, 768, 1024 and 1440 px), keyboard/screen-reader checks, real-user performance and actual enquiry-delivery checks before claiming full acceptance.

## Publication check

The site update was published from GitHub commit `223d27daf2d9daac41b96acb99404eafcbeff199`. The GitHub `Site checks` workflow completed successfully. The live `.com` service page and specialist quote preselection returned HTTP 200 with the new content; the live audit found 72 sitemap pages, 85 referenced media URLs and no HTTP failures. This did not alter DNS, Cloudflare secrets or email settings. It does not verify that a visitor's prepared email reached Ambest.
