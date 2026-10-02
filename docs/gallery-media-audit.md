# Gallery media audit

The October 2026 gallery update compares Ambest's published `.in` service and case-study pages with the `.com` service and work routes. `scripts/audit-source-media.mjs` inventories the source pages; `scripts/import-source-gallery.mjs` records the exact selected upload URLs and can re-fetch them with `--download`.

The selected images are copied into `public/media/` and assigned to routes in `worker/media-galleries.js`. Case-study galleries use that case's published artwork. Service galleries show relevant examples from the published service and project archive; they should not be read as a claim that every example was delivered for every client.

The `.in` site includes some black or empty service thumbnails and a screenshot of a video player on Recons. Those were excluded. Recons consequently has one additional verified project visual, alongside its existing hero, rather than padding the page with unrelated imagery. Bhoomi's published reel is included as a local, portrait MP4. Existing verified YouTube films remain on the Shreeji and Bryan pages. A very large source-hosted Shreeji file was not copied, and no video player has been added where an actual playable project film could not be verified.

Gallery frames use `object-fit: contain` to preserve the complete artwork. `scripts/check-site.mjs` checks gallery counts and that referenced media files exist; the production build validates the bundled Worker and static assets. Recheck the source links and image rights with the brand owner before any future reuse outside Ambest's own site.
