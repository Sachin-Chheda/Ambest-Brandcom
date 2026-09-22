# Rollback plan

1. Record the approved production version ID, commit SHA, deployment URL, custom-domain state and timestamp.
2. Keep the immediately previous working Site version available and retain the old-site backup, redirect file and approved asset inventory.
3. If the new release causes blocking navigation, form, API, canonical, redirect, media or security failures, redeploy the previous saved version through Sites.
4. If a custom-domain or DNS change is involved, restore only the documented web records. Never modify MX, SPF, DKIM, DMARC or mail hosts as part of website rollback.
5. Pause public lead collection if delivery is uncertain; show the published email/phone fallback rather than returning false success.
6. Verify home, representative service/case/article routes, 404, robots, sitemap, API behavior and direct legacy redirects after rollback.
7. Record cause, affected period, lost/duplicated lead risk and the conditions required for another release.

No production rollback can be claimed until the deployed responses and lead path are actually checked.
