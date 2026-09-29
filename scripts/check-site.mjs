import worker from "../worker/index.js";
import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

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
  if (!html.includes('<link rel="canonical" href="https://www.ambestbrandcom.com')) failures.push(`${route}: incorrect canonical host`);
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
if (!publicHomeHtml.includes("India + APAC experience") || !publicHomeHtml.includes("wider Asia-Pacific region")) failures.push("home: approved India + APAC experience copy is missing");
if (!publicHomeHtml.includes("Singapore, Canada and the US")) failures.push("home: international touchpoints do not include the US");
if (!publicHomeHtml.includes("youtube-nocookie.com/embed/YaaTIMUeoNs") || !publicHomeHtml.includes("2026 showreel")) failures.push("home: verified 2026 showreel embed is missing");
const workHtml = await (await request("/work/")).text();
if (!workHtml.includes('<a href="/work/recons-group/">Impact Created</a>') || workHtml.includes("Read the project record")) failures.push("project CTA: Recons card label was not updated");
if (workHtml.includes("Ppc Advertising")) failures.push("service naming: PPC capitalization is inconsistent");
for (const label of ["Ad Films &amp; Video Content","Brand Communication &amp; Strategy","Creative Solutions","Digital &amp; Social","Website Development","Brand Experiences &amp; Partnerships"]) {
  if (!workHtml.includes(label)) failures.push(`work: missing core-service classification ${label}`);
}
if (workHtml.includes("<span>PPC Advertising</span>")) failures.push("work: case studies still lead with performance-marketing service labels");
if (!workHtml.includes('.case-poster{background:linear-gradient') || !workHtml.includes('color:#fff}')) failures.push("case-study cards: gradient header with white text is missing");
if ((workHtml.match(/\/media\/case-/g) || []).length < 10) failures.push("work: all ten case-study visuals are not connected");
for (const route of requiredRoutes.filter(route => route.startsWith("/work/") && route !== "/work/")) {
  if (!pages.get(route)?.includes("Why this work travels")) failures.push(`${route}: global case-study positioning is missing`);
  if (!pages.get(route)?.includes("Brand Communication &amp; Strategy") && !pages.get(route)?.includes("Creative Solutions")) failures.push(`${route}: core brand/creative service positioning is missing`);
  if (/What can be said responsibly|This section is editorial interpretation|The scope of this evidence/.test(pages.get(route) || "")) failures.push(`${route}: internal audit language remains in the public case study`);
}
const filmsHtml = pages.get("/video-production/results/") || "";
if ((filmsHtml.match(/youtube-nocookie.com\/embed\//g) || []).length < 6) failures.push("video results: six verified film embeds are missing");
const mediaDir = resolve(import.meta.dirname, "..", "public", "media");
if (!existsSync(mediaDir) || readdirSync(mediaDir).length < 19) failures.push("media: expected imported Ambest asset set is incomplete");
const missing = await request("/definitely-missing/");
if (missing.status !== 404) failures.push(`404 check: got ${missing.status}`);
const redirect = await request("/about-us/", {redirect:"manual"});
if (redirect.status !== 301 || !redirect.headers.get("location")?.endsWith("/about/")) failures.push("legacy redirect check failed");
const privateMap = await request("/sitemap.xml");
if ((await privateMap.text()).includes("<url>")) failures.push("private sitemap should contain no URLs");
const publicMap = await request("/sitemap.xml", {}, {PUBLIC_SITE:"true"});
const publicMapText = await publicMap.text();
if (!publicMapText.includes("/seo/how-it-works/")) failures.push("public sitemap missing required route");
if (!publicMapText.includes("https://www.ambestbrandcom.com/seo/how-it-works/")) failures.push("public sitemap uses the wrong canonical host");
const publicRobots = await (await request("/robots.txt", {}, {PUBLIC_SITE:"true"})).text();
if (!publicRobots.includes("Sitemap: https://www.ambestbrandcom.com/sitemap.xml") || publicRobots.includes("Disallow: /\n")) failures.push("public robots.txt is not crawlable or uses the wrong sitemap host");
const protectedQuote = await request("/get-a-quote/", {}, {PUBLIC_SITE:"true",TURNSTILE_SITE_KEY:"site-key",TURNSTILE_SECRET_KEY:"secret-key",EMAIL:{send:async()=>({messageId:"render-test"})}});
const protectedQuoteHtml = await protectedQuote.text();
if (!protectedQuoteHtml.includes('class="cf-turnstile"') || !protectedQuoteHtml.includes('data-action="quote-enquiry"') || !protectedQuoteHtml.includes("challenges.cloudflare.com/turnstile/v0/api.js")) failures.push("quote form: Turnstile widget is not rendered when configured");
if (!protectedQuoteHtml.includes("sachin@ambestmedia.com") || protectedQuoteHtml.includes("sachin@ambestbrandcom.in")) failures.push("quote form: enquiry contact is not sachin@ambestmedia.com");

const canonicalCases = [
  ["https://ambestbrandcom.com/", "https://www.ambestbrandcom.com/"],
  ["http://www.ambestbrandcom.com/", "https://www.ambestbrandcom.com/"],
  ["http://ambestbrandcom.com/about-us", "https://www.ambestbrandcom.com/about/"],
];
for (const [input, expected] of canonicalCases) {
  const response = await worker.fetch(new Request(input, {redirect:"manual"}), {PUBLIC_SITE:"true"}, {});
  if (response.status !== 301 || response.headers.get("location") !== expected) failures.push(`canonical redirect failed: ${input}`);
}
const canonicalHome = await worker.fetch(new Request("https://www.ambestbrandcom.com/"), {PUBLIC_SITE:"true"}, {});
if (canonicalHome.status !== 200) failures.push(`canonical home: expected 200, got ${canonicalHome.status}`);
const canonicalHomeHtml = await canonicalHome.text();
if (!canonicalHomeHtml.includes('<meta name="robots" content="index,follow">') || canonicalHomeHtml.includes("Private review build") || /preview|pending confirmation|subject to confirmation/i.test(canonicalHomeHtml)) failures.push("canonical home is not in public release mode");

const invalid = await request("/api/quote", {method:"POST",headers:{"content-type":"application/json"},body:"{}"}, {DEVELOPMENT_MODE:"true"});
if (invalid.status !== 422) failures.push(`invalid form: expected 422, got ${invalid.status}`);
const payload = {name:"QA Test",email:"qa@example.com",selection:"seo-foundation",goal:"Validate that the development adapter accepts a complete structured enquiry.",idempotencyKey:"qa-check-0001",website_confirm:""};
const accepted = await request("/api/quote", {method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(payload)}, {DEVELOPMENT_MODE:"true"});
if (accepted.status !== 202) failures.push(`valid development form: expected 202, got ${accepted.status}`);
const first = await accepted.json();
const duplicate = await request("/api/quote", {method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(payload)}, {DEVELOPMENT_MODE:"true"});
const second = await duplicate.json();
if (duplicate.status !== 202 || first.requestId !== second.requestId) failures.push("idempotent duplicate handling failed");
const originalFetch = globalThis.fetch;
let deliveredEmail;
try {
  globalThis.fetch = async input => {
    if (String(input).includes("challenges.cloudflare.com/turnstile/v0/siteverify")) return new Response(JSON.stringify({success:true,action:"quote-enquiry",hostname:"www.ambestbrandcom.com"}),{headers:{"content-type":"application/json"}});
    throw new Error(`Unexpected external fetch in quote test: ${input}`);
  };
  const productionPayload = {...payload,email:"prospect@example.com",selection:"brand-communication-strategy",idempotencyKey:"qa-email-0001","cf-turnstile-response":"valid-test-token"};
  const emailed = await worker.fetch(new Request("https://www.ambestbrandcom.com/api/quote",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(productionPayload)}),{TURNSTILE_SECRET_KEY:"secret-key",EMAIL:{send:async message=>{deliveredEmail=message;return {messageId:"email-test"};}},LEAD_RECIPIENT:"sachin@ambestmedia.com",LEAD_SENDER:"website@ambestbrandcom.com"},{});
  if (emailed.status !== 202) failures.push(`configured production form: expected 202, got ${emailed.status}`);
  if (deliveredEmail?.to !== "sachin@ambestmedia.com" || deliveredEmail?.replyTo !== "prospect@example.com") failures.push("configured production form: email delivery fields are incorrect");
} finally {
  globalThis.fetch = originalFetch;
}
const blocked = await request("/api/quote", {method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({...payload,idempotencyKey:"qa-unconfigured"})}, {});
if (blocked.status !== 503) failures.push(`unconfigured production form: expected 503, got ${blocked.status}`);

if (failures.length) {
  console.error(`Site checks failed (${failures.length})`);
  failures.forEach(item => console.error(`- ${item}`));
  process.exit(1);
}
console.log(`Site checks passed: ${requiredRoutes.length} routes, ${checkedLinks.size} internal destinations, form validation/idempotency and preview indexing controls.`);
