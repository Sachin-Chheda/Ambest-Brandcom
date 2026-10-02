import worker from "../worker/index.js";
import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const requiredRoutes = [
  "/", "/about/", "/contact/", "/get-a-quote/", "/privacy-policy/", "/disclaimer/",
  "/services/ad-films-video-content/", "/services/brand-communication-strategy/", "/services/creative-solutions/", "/services/digital-social/", "/services/website-development/", "/services/brand-experiences-partnerships/",
  "/brand-creative/brand-strategy-management/", "/brand-creative/logo-visual-identity/", "/brand-creative/internal-branding/", "/brand-creative/exhibitions-events/",
  "/seo/", "/seo/how-it-works/", "/seo/results/", "/seo/technical-seo/", "/seo/local-seo/", "/seo/content-led-seo/", "/seo/ecommerce-seo/",
  "/video-production/", "/video-production/how-it-works/", "/video-production/results/", "/video-production/digital-ad-films/", "/video-production/brand-films/", "/video-production/corporate-communication-videos/", "/video-production/corporate-films/", "/video-production/brand-anthem-videos/", "/video-production/micro-drama/", "/video-production/ai-video-production/", "/video-production/testimonial-videos/", "/video-production/explainer-videos/", "/video-production/2d-animation/", "/video-production/product-videos/", "/video-production/social-media-videos/", "/video-production/drone-videography/", "/video-production/commercial-photography/", "/video-production/video-podcasts/", "/video-production/short-films/",
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
  if (html.includes('class="video-frame"')) {
    if (html.includes("iframe srcdoc=")) failures.push(`${route}: video still uses a nested scrolling thumbnail iframe`);
    if (!html.includes("data-video-player") || !html.includes("data-video-id=")) failures.push(`${route}: responsive click-to-play video thumbnail is incomplete`);
  }
  for (const match of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const href = match[1];
    if (checkedLinks.has(href) || href.startsWith("/api/")) continue;
    checkedLinks.add(href);
    if (href.startsWith("/media/")) {
      if (!existsSync(resolve(import.meta.dirname, "..", "public", href.slice(1)))) failures.push(`${route}: missing static asset ${href}`);
      continue;
    }
    const response = await request(href);
    if (response.status >= 400) failures.push(`${route}: broken internal link ${href} (${response.status})`);
  }
}

const mediaDir = resolve(import.meta.dirname, "..", "public", "media");
const mediaReferences = new Set([...pages.values()].flatMap(html => [...html.matchAll(/\/media\/([A-Za-z0-9._-]+)/g)].map(match => match[1])));
for (const file of mediaReferences) if (!existsSync(resolve(mediaDir, file))) failures.push(`media: missing referenced asset ${file}`);

const publicHome = await request("/", {}, {PUBLIC_SITE:"true"});
const publicHomeHtml = await publicHome.text();
if (!publicHomeHtml.includes('<meta name="robots" content="index,follow">')) failures.push("public mode: home is not indexable");
for (const label of ["Ad Films &amp; Video Content","Brand Communication &amp; Strategy","Creative Solutions","Digital &amp; Social","Website Development","Brand Experiences &amp; Partnerships"]) {
  if (!publicHomeHtml.includes(label)) failures.push(`home: missing main service ${label}`);
}
if (!publicHomeHtml.includes('alt="Ambest Brandcom"') || !publicHomeHtml.includes('data:image/png;base64,')) failures.push("header: supplied Ambest logo is not embedded");
if (!publicHomeHtml.includes('class="footer-logo"')) failures.push("footer: supplied Ambest logo is missing");
const socialProfiles = [
  ["Facebook", "https://www.facebook.com/AmbestBrandCom/"],
  ["X", "https://twitter.com/AmbestBrandCom"],
  ["YouTube", "https://www.youtube.com/@ambestmedia"],
  ["Instagram", "https://www.instagram.com/AmbestBrandCom/"],
  ["LinkedIn", "https://www.linkedin.com/company/ambestbrandcom/"],
  ["Pinterest", "https://in.pinterest.com/AmbestBrandCom/"],
];
for (const [name,url] of socialProfiles) {
  const link = `<a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="Ambest Brandcom on ${name} (opens in a new tab)">${name}</a>`;
  if (!publicHomeHtml.includes(link) || !pages.get("/contact/")?.includes(link)) failures.push(`social profiles: missing ${name} link on a shared footer`);
}
const organizationGraph = JSON.parse(publicHomeHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] || "{}");
const organization = organizationGraph["@graph"]?.find(item => item["@type"] === "Organization");
if (JSON.stringify(organization?.sameAs) !== JSON.stringify(socialProfiles.map(([,url]) => url))) failures.push("organization metadata: social profiles are incomplete");
if (!publicHomeHtml.includes("Copyrights Reserved Ambest Brandcom") || publicHomeHtml.includes("policy-stated operator")) failures.push("footer: copyright line is incorrect");
if (publicHomeHtml.includes("#c7ff33")) failures.push("brand palette: legacy green is still present");
if (/font-weight:(700|800|900)/.test(publicHomeHtml)) failures.push("typography: bold font weight remains in rendered homepage CSS");
if (!publicHomeHtml.includes("India + APAC experience") || !publicHomeHtml.includes("wider Asia-Pacific region")) failures.push("home: approved India + APAC experience copy is missing");
if (!publicHomeHtml.includes("Singapore, Canada and the US")) failures.push("home: international touchpoints do not include the US");
if (!publicHomeHtml.includes('class="home-hero-video"') || !publicHomeHtml.includes("AMbest-Website-Home-Page-Video.webm")) failures.push("home: original Ambest banner video is missing");
if (!publicHomeHtml.includes('data-video-id="YaaTIMUeoNs"') || !publicHomeHtml.includes("2026 showreel")) failures.push("home: verified 2026 showreel thumbnail is missing");
if (publicHomeHtml.includes("iframe srcdoc=")) failures.push("videos: nested scrolling thumbnail iframe remains on the homepage");
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
  if ((pages.get(route)?.match(/class="archive-card"/g) || []).length < 1) failures.push(`${route}: additional project imagery is missing`);
}
for (const route of requiredRoutes.filter(route => route.startsWith("/services/"))) {
  if ((pages.get(route)?.match(/class="archive-card"/g) || []).length < 3) failures.push(`${route}: service gallery needs at least three relevant images`);
}
const filmsHtml = pages.get("/video-production/results/") || "";
const videoOverviewHtml = pages.get("/video-production/") || "";
for (const route of ["digital-ad-films", "brand-films", "corporate-communication-videos", "corporate-films", "brand-anthem-videos", "micro-drama", "ai-video-production", "testimonial-videos", "explainer-videos", "2d-animation", "product-videos", "social-media-videos", "drone-videography", "commercial-photography", "video-podcasts", "short-films"]) {
  if (!videoOverviewHtml.includes(`/video-production/${route}/`)) failures.push(`video production overview missing direct ${route} link`);
}
if (videoOverviewHtml.includes("/video-production/ad-and-brand-films/") || videoOverviewHtml.includes("No autoplay wall")) failures.push("video production overview still contains legacy offer content");
if (!videoOverviewHtml.includes("Sixteen focused production services") || (videoOverviewHtml.match(/class="production-card"/g) || []).length !== 16) failures.push("video production overview directory is incomplete");
if ((filmsHtml.match(/data-video-id=/g) || []).length < 6) failures.push("video results: six verified film thumbnails are missing");
if (filmsHtml.includes("iframe srcdoc=") || !filmsHtml.includes("scrolling','no")) failures.push("video results: no-scroll click-to-play player is missing");
for (const route of requiredRoutes.filter(route => /^\/video-production\/(?!how-it-works|results)[^/]+\/$/.test(route))) {
  const html = pages.get(route) || "";
  if (!html.includes('class="production-visual"') || !html.includes('class="production-video"')) failures.push(`${route}: aligned service image or video is missing`);
  if (!html.includes("India + global markets") || !html.includes("Mumbai-rooted production")) failures.push(`${route}: global production positioning is missing`);
  if (html.includes("iframe srcdoc=")) failures.push(`${route}: scrolling video thumbnail iframe remains`);
  if ((html.match(/class="archive-card"/g) || []).length < 2) failures.push(`${route}: production gallery needs multiple images`);
}
for (const route of requiredRoutes.filter(route => route.startsWith("/brand-creative/"))) {
  const html = pages.get(route) || "";
  if (!html.includes('class="production-visual"') || !html.includes("Global-ready by design")) failures.push(`${route}: brand visual or global positioning is missing`);
  if ((html.match(/class="archive-card"/g) || []).length < 2) failures.push(`${route}: brand gallery needs multiple images`);
}
const aboutHtml = pages.get("/about/") || "";
if (!aboutHtml.includes("<video") || !aboutHtml.includes("BTS-3.mp4") || !aboutHtml.includes("playsinline")) failures.push("about: aligned behind-the-scenes video is missing");
const shreejiHtml = pages.get("/work/shreeji-woodcraft/") || "";
const bryanHtml = pages.get("/work/bryan-candy/") || "";
if (!shreejiHtml.includes('data-video-id="kw48Puf-Xxg"')) failures.push("Shreeji case study: verified film is missing");
if (!bryanHtml.includes('data-video-id="Ohj3Uh9IEjo"')) failures.push("Bryan & Candy case study: verified film is missing");
const reconsHtml = pages.get("/work/recons-group/") || "";
if (!reconsHtml.includes('<figure class="project-visual">') || !reconsHtml.includes(".project-visual img{display:block;width:100%;height:min(52vw,570px);min-height:360px;object-fit:contain}")) failures.push("Recons case study: full-containment image treatment is missing");
const bhoomiHtml = pages.get("/work/bhoomi/") || "";
if (!bhoomiHtml.includes('class="portrait-video"') || !bhoomiHtml.includes('/media/gallery-bhoomi-reel.mp4') || !bhoomiHtml.includes('preload="none"')) failures.push("Bhoomi case study: aligned social reel is missing");
if (!existsSync(mediaDir) || readdirSync(mediaDir).length < 19) failures.push("media: expected imported Ambest asset set is incomplete");
const missing = await request("/definitely-missing/");
if (missing.status !== 404) failures.push(`404 check: got ${missing.status}`);
const redirect = await request("/about-us/", {redirect:"manual"});
if (redirect.status !== 301 || !redirect.headers.get("location")?.endsWith("/about/")) failures.push("legacy redirect check failed");
const videoAlias = await request("/video-production/ad-and-brand-films/", {redirect:"manual"});
if (videoAlias.status !== 301 || !videoAlias.headers.get("location")?.endsWith("/video-production/digital-ad-films/")) failures.push("video service alias redirect failed");
const nestedLegacyService = await request("/internal-brand/wall-branding-murals/", {redirect:"manual"});
if (nestedLegacyService.status !== 301 || !nestedLegacyService.headers.get("location")?.endsWith("/brand-creative/internal-branding/")) failures.push("nested legacy service redirect failed");
const privateMap = await request("/sitemap.xml");
if ((await privateMap.text()).includes("<url>")) failures.push("private sitemap should contain no URLs");
const publicMap = await request("/sitemap.xml", {}, {PUBLIC_SITE:"true"});
const publicMapText = await publicMap.text();
if (!publicMapText.includes("/seo/how-it-works/")) failures.push("public sitemap missing required route");
if (!publicMapText.includes("/video-production/brand-anthem-videos/") || publicMapText.includes("/video-production/ad-and-brand-films/")) failures.push("public sitemap video service routes are incomplete or include aliases");
if (!publicMapText.includes("/brand-creative/logo-visual-identity/")) failures.push("public sitemap missing brand and creative routes");
if (!publicMapText.includes("https://www.ambestbrandcom.com/seo/how-it-works/")) failures.push("public sitemap uses the wrong canonical host");
const publicRobots = await (await request("/robots.txt", {}, {PUBLIC_SITE:"true"})).text();
if (!publicRobots.includes("Sitemap: https://www.ambestbrandcom.com/sitemap.xml") || publicRobots.includes("Disallow: /\n")) failures.push("public robots.txt is not crawlable or uses the wrong sitemap host");
const protectedQuote = await request("/get-a-quote/", {}, {PUBLIC_SITE:"true",TURNSTILE_SITE_KEY:"site-key",TURNSTILE_SECRET_KEY:"secret-key",EMAIL:{send:async()=>({messageId:"render-test"})}});
const protectedQuoteHtml = await protectedQuote.text();
if (!protectedQuoteHtml.includes('class="cf-turnstile"') || !protectedQuoteHtml.includes('data-action="quote-enquiry"') || !protectedQuoteHtml.includes("challenges.cloudflare.com/turnstile/v0/api.js")) failures.push("quote form: Turnstile widget is not rendered when configured");
if (!protectedQuoteHtml.includes("sachin@ambestmedia.com") || protectedQuoteHtml.includes("sachin@ambestbrandcom.in")) failures.push("quote form: enquiry contact is not sachin@ambestmedia.com");
if (!protectedQuoteHtml.includes('placeholder="example.com"') || protectedQuoteHtml.includes('placeholder="https://"')) failures.push("quote form: website field still requires a protocol");
if (!protectedQuoteHtml.includes('id="country"') || !protectedQuoteHtml.includes('Select country / region') || !protectedQuoteHtml.includes('sachin@ambestmedia.com')) failures.push("quote form: country selector or delivery address is missing");
for (const removedField of ['company','budget','timing']) if (protectedQuoteHtml.includes(`id="${removedField}"`)) failures.push(`quote form: unnecessary ${removedField} field remains visible`);

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
const payload = {name:"QA Test",email:"qa@example.com",country:"India",selection:"seo-foundation",goal:"Validate that the development adapter accepts a complete structured enquiry.",idempotencyKey:"qa-check-0001",website_confirm:""};
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
  const productionPayload = {...payload,email:"prospect@example.com",selection:"brand-communication-strategy",website:"example.com",idempotencyKey:"qa-email-0001","cf-turnstile-response":"valid-test-token"};
  const emailed = await worker.fetch(new Request("https://www.ambestbrandcom.com/api/quote",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(productionPayload)}),{TURNSTILE_SECRET_KEY:"secret-key",EMAIL:{send:async message=>{deliveredEmail=message;return {messageId:"email-test"};}},LEAD_RECIPIENT:"sachin@ambestmedia.com",LEAD_SENDER:"website@ambestbrandcom.com"},{});
  if (emailed.status !== 202) failures.push(`configured production form: expected 202, got ${emailed.status}`);
  if (deliveredEmail?.to !== "sachin@ambestmedia.com" || deliveredEmail?.replyTo !== "prospect@example.com") failures.push("configured production form: email delivery fields are incorrect");
  if (!deliveredEmail?.text?.includes("Website: https://example.com/")) failures.push("configured production form: plain website domain was not normalized automatically");
  if (!deliveredEmail?.text?.includes("Country / region: India")) failures.push("configured production form: country was not included in the delivery email");
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
