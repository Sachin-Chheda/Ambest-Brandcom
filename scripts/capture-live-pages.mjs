import { writeFile } from "node:fs/promises";

const routes = [
  "/", "/about/", "/contact/", "/get-a-quote/", "/privacy-policy/", "/disclaimer/",
  "/seo/", "/seo/how-it-works/", "/seo/results/", "/seo/technical-seo/", "/seo/local-seo/", "/seo/content-led-seo/", "/seo/ecommerce-seo/",
  "/video-production/", "/video-production/how-it-works/", "/video-production/results/", "/video-production/ad-and-brand-films/", "/video-production/corporate-videos/", "/video-production/product-explainer-videos/", "/video-production/social-media-videos/",
  "/digital-marketing/", "/digital-marketing/social-media-marketing/", "/digital-marketing/ppc-advertising/", "/digital-marketing/content-marketing/", "/digital-marketing/email-marketing/", "/digital-marketing/website-design-development/", "/digital-marketing/marketplace-management/", "/digital-marketing/strategy-consultation/", "/digital-marketing/results/",
  "/work/", "/work/purobien-nutrition/", "/work/shreeji-woodcraft/", "/work/bhoomi/", "/work/bryan-candy/", "/work/dr-amyn-rajani/", "/work/recons-group/", "/work/sigma-group/", "/work/red-moments/", "/work/aarya-menstrual-care/", "/work/timex-mica/",
  "/blog/", "/blog/category/seo/", "/blog/category/video-production/", "/blog/category/digital-marketing/", "/blog/corporate-video-production-process-explained/", "/blog/why-every-business-needs-corporate-video-2026/", "/blog/what-is-a-brand-anthem-video/", "/blog/advertising-agency-in-mumbai-boost-your-business-with-the-experts/", "/blog/video-production-services-in-mumbai-tips-you-should-know-before-getting-into/", "/blog/does-your-business-have-a-mobile-friendly-website/", "/blog/unveiling-the-power-of-brand-strategy-a-comprehensive-guide/"
];

const pages = {};
for (const route of routes) {
  const response = await fetch(`http://127.0.0.1:4173${route}`);
  if (!response.ok) throw new Error(`${route}: ${response.status}`);
  pages[route] = await response.text();
}

await writeFile(new URL("../worker/generated-pages.js", import.meta.url), `export const generatedPages = ${JSON.stringify(pages)};\n`);
console.log(`Captured ${routes.length} rendered routes.`);
