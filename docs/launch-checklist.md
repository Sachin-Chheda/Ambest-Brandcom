# Launch checklist

## Required approvals

- [ ] Final brand/domain and migration authority confirmed.
- [ ] Contact/office wording and lead recipient confirmed.
- [ ] Offer scope and responsibility records approved.
- [ ] Metrics, client names and media permissions approved.
- [ ] Privacy/disclaimer/terms approved by the owner and appropriate adviser.

## Delivery and security

- [ ] Turnstile site/secret keys configured server-side.
- [ ] HTTPS lead webhook/token configured; development adapter disabled.
- [ ] Valid, invalid, oversized, duplicate, spam, expired-token, provider-error and accepted submissions tested.
- [ ] Test enquiry received in the approved destination with no PII in analytics/logs.
- [ ] Retention, deletion and access controls documented.

## Migration and search

- [ ] Current domain variants and redirect direction checked with actual HTTP responses.
- [ ] Full URL/media inventory and preservation value reviewed.
- [ ] Direct permanent redirects implemented on the old-host receiving infrastructure.
- [ ] Canonical host, HTTPS/slash normalization, robots, public sitemap and 404 verified on deployment.
- [ ] Search Console properties/settings updated where authorized.
- [ ] MX, SPF, DKIM, DMARC and unrelated DNS records preserved.

## Content and experience

- [ ] Approved project images/video posters/captions/transcripts integrated.
- [ ] No draft, internal approval language, placeholder or unsupported claim is public.
- [ ] Header, mobile navigation, all eight offer CTAs and seven service selections tested.
- [ ] Representative routes inspected at 360, 390, 768, 1024 and 1440 px; keyboard and 200% text checks complete.
- [ ] Rollback owner, backup and monitoring path approved.

`PUBLIC_SITE=true` is the final technical switch only after every applicable item is complete.
