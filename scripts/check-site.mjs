import worker from "../worker/index.js";

const requiredRoutes = [
  "/", "/about/", "/contact/", "/get-a-quote/", "/privacy-policy/", "/disclaimer/",
  "/services/ad-films-video-content/", "/services/brand-communication-strategy/", "/services/creative-solutions/", "/services/digital-social/", "/services/website-development/", "/services/brand-experiences-partnerships/",
  "/seo/", "/seo/how-it-works/", "/seo/results/", "/seo/technical-seo/", "/seo/local-seo/", "/seo/content-led-seo/", "/seo/ecommerce-seo/",
  "/video-production/", "/video-production/how-it-works/", "/video-production/results/", "/video-production/ad-and-brand-films/", "/video-production/corporate-videos/", "/video-production/product-explainer-videos/", "/video-production/social-media-videos/",
  "/digital-marketing/", "/digital-marketing/social-media-marketing/", "/digital-marketing/ppc-advertising/", "/digital-marketing/content-marketing/", "/digital-marketing/email-marketing/", "/digital-marketing/website-design-development/", "/digital-marketing/marketplace-management/", "/digital-marketing/strategy-consultation/", "/digital-marketing/results/",
  "/work/", "/work/purobien-nutrition/", "/work/shreeji-woodcraft/", "/work/bhoomi/", "/work/bryan-candy/", "/work/dr-amyn-rajani/", "/work/recons-group/", "/work/sigma-group/", "/work/red-moments/", "/work/aarya-menstrual-care/", "/work/timex-mica/",
  "/blog/", "/blog/category/seo/", "/blog/category/video-production/", "/blog/category/digital-marketing/", "/blog/corporate-video-production-process-explained/", "/blog/why-every-business-needs-corporate-video-2026/", "/blog/what-is-a-brand-anthem-video/", "/blog/advertising-agency-in-mumbai-boost-your-business-with-the-experts/", "/blog/video-production-services-in-mumbai-tips-you-should-know-before-getting-into/", "/blog/does-your-business-have-a-mobile-friendly-website/", "/blog/unveiling-the-power-of-brand-strategy-a-comprehensive-guide/"
];
const failures = [];
const titles = new Map();
const pages = new Map();
const request = (path, init={}, env={}) => worker.fetch(new Request(`https://preview.test${path}`, init), env, {});

for (const route of requiredRoutes) {
  const response = await request(route);
  const html = await response.text();
  pages.set(route, html);
  if (response.status !== 200) failures.push(`${route}: expected 200, got ${response.status}`);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  if (!title) failures.push(`${route}: missing title`);
  else if (titles.has(title)) failures.push(`${route}: duplicate title with ${titles.get(title)}`);
  else titles.set(title, route);
  if (!html.includes('<link rel="canonical" href="https://ambestmedia.com')) failures.push(`${route}: incorrect canonical host`);
  if (!html.includes('<meta name="robots" content="noindex,nofollow">')) failures.push(`${route}: private preview must be noindex`);
  if ((html.match(/<h1[ >]/g) || []).length !== 1) failures.push(`${route}: expected one H1`);
  if (!html.includes('class="skip"') || !html.includes('<main id="main">') || !html.includes('aria-label="Primary"')) failures.push(`${route}: missing shared navigation landmarks`);
  for (const script of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
    try { new Function(script[1]); } catch (error) { failures.push(`${route}: client script syntax error (${error.message})`); }
  }
  if (/lorem ipsum|\bTODO\b|results coming soon/i.test(html)) failures.push(`${route}: placeholder content detected`);
}

const checkedLinks = new Set();
for (const [route, html] of pages) {
  for (const match of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const href = match[1];
    if (checkedLinks.has(href) || href.startsWith("/api/")) continue;
    checkedLinks.add(href);
    const response = await request(href);
    if (response.status >= 400) failures.push(`${route}: broken internal link ${href} (${response.status})`);
  }
}

const publicHome = await request("/", {}, {PUBLIC_SITE:"true"});
const publicHomeHtml = await publicHome.text();
if (!publicHomeHtml.includes('<meta name="robots" content="index,follow">')) failures.push("public mode: home is not indexable");
for (const label of ["Ad Films &amp; Video Content","Brand Communication &amp; Strategy","Creative Solutions","Digital &amp; Social","Website Development","Brand Experiences &amp; Partnerships"]) {
  if (!publicHomeHtml.includes(label)) failures.push(`home: missing main service ${label}`);
}
if (!publicHomeHtml.includes('alt="Ambest Brandcom"') || !publicHomeHtml.includes('data:image/png;base64,')) failures.push("header: supplied Ambest logo is not embedded");
if (!publicHomeHtml.includes('class="footer-logo"')) failures.push("footer: supplied Ambest logo is missing");
if (!publicHomeHtml.includes("Copyrights Reserved Ambest Brandcom") || publicHomeHtml.includes("policy-stated operator")) failures.push("footer: copyright line is incorrect");
if (publicHomeHtml.includes("#c7ff33")) failures.push("brand palette: legacy green is still present");
if (/font-weight:(700|800|900)/.test(publicHomeHtml)) failures.push("typography: bold font weight remains in rendered homepage CSS");
const workHtml = await (await request("/work/")).text();
if (!workHtml.includes('<a href="/work/recons-group/">Impact Created</a>') || workHtml.includes("Read the project record")) failures.push("project CTA: Recons card label was not updated");
if (workHtml.includes("Ppc Advertising") || !workHtml.includes("PPC Advertising")) failures.push("service naming: PPC capitalization is inconsistent");
if (!workHtml.includes('.case-poster{background:linear-gradient') || !workHtml.includes('color:#fff}')) failures.push("case-study cards: gradient header with white text is missing");
const missing = await request("/definitely-missing/");
if (missing.status !== 404) failures.push(`404 check: got ${missing.status}`);
const redirect = await request("/about-us/", {redirect:"manual"});
if (redirect.status !== 308 || !redirect.headers.get("location")?.endsWith("/about/")) failures.push("legacy redirect check failed");
const privateMap = await request("/sitemap.xml");
if ((await privateMap.text()).includes("<url>")) failures.push("private sitemap should contain no URLs");
const publicMap = await request("/sitemap.xml", {}, {PUBLIC_SITE:"true"});
if (!(await publicMap.text()).includes("/seo/how-it-works/")) failures.push("public sitemap missing required route");

const invalid = await request("/api/quote", {method:"POST",headers:{"content-type":"application/json"},body:"{}"}, {DEVELOPMENT_MODE:"true"});
if (invalid.status !== 422) failures.push(`invalid form: expected 422, got ${invalid.status}`);
const payload = {name:"QA Test",email:"qa@example.com",selection:"seo-foundation",goal:"Validate that the development adapter accepts a complete structured enquiry.",idempotencyKey:"qa-check-0001",website_confirm:""};
const accepted = await request("/api/quote", {method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(payload)}, {DEVELOPMENT_MODE:"true"});
if (accepted.status !== 202) failures.push(`valid development form: expected 202, got ${accepted.status}`);
const first = await accepted.json();
const duplicate = await request("/api/quote", {method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(payload)}, {DEVELOPMENT_MODE:"true"});
const second = await duplicate.json();
if (duplicate.status !== 202 || first.requestId !== second.requestId) failures.push("idempotent duplicate handling failed");
const blocked = await request("/api/quote", {method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({...payload,idempotencyKey:"qa-unconfigured"})}, {});
if (blocked.status !== 503) failures.push(`unconfigured production form: expected 503, got ${blocked.status}`);

if (failures.length) {
  console.error(`Site checks failed (${failures.length})`);
  failures.forEach(item => console.error(`- ${item}`));
  process.exit(1);
}
console.log(`Site checks passed: ${requiredRoutes.length} routes, ${checkedLinks.size} internal destinations, form validation/idempotency and preview indexing controls.`);
