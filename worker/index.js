import { generatedPages } from "./generated-pages.js";
import { articles, digitalServices, legacyRedirects, projects, seoOffers, videoOffers } from "./content.js";
import { headerLogo } from "./logo-data.js";

const origin = "https://ambestmedia.com";
const e = value => String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));

const mainServices = [
  {id:"ad-films-video-content",name:"Ad Films & Video Content",summary:"Campaign films, brand stories, corporate films, explainers and channel-ready content shaped around audience and use.",fit:"For launches, reputation, sales enablement, employer communication and always-on content.",includes:["Creative direction, scripting and story structure","Live action, animation and post-production","Versioning, captions and delivery planning"],links:[["Explore video production","/video-production/"],["See relevant work","/video-production/results/"]]},
  {id:"brand-communication-strategy",name:"Brand Communication & Strategy",summary:"Positioning, messaging and communication systems that help different teams tell one coherent story.",fit:"For market entry, repositioning, portfolio clarity, launches and multi-stakeholder alignment.",includes:["Audience, category and message framing","Narrative, campaign and channel architecture","Briefs, priorities and decision principles"],links:[["Explore strategy consultation","/digital-marketing/strategy-consultation/"],["See our working principles","/about/"]]},
  {id:"creative-solutions",name:"Creative Solutions",summary:"Ideas and design systems translated into practical assets across film, digital, web, campaigns and sales communication.",fit:"For complex briefs that cannot be solved by a single format or isolated channel.",includes:["Creative concepts and campaign platforms","Identity, content and communication design","Connected production across required formats"],links:[["Explore project records","/work/"],["Explore content marketing","/digital-marketing/content-marketing/"]]},
  {id:"digital-social",name:"Digital & Social",summary:"Web, search, social, performance, content and marketplace activity connected to a defined buyer journey.",fit:"For discovery, demand, community, conversion and ongoing market learning.",includes:["Digital and social channel planning","Web, SEO, paid and marketplace execution","Measurement with explicit definitions and limits"],links:[["Explore digital marketing","/digital-marketing/"],["Explore SEO","/seo/"]]},
  {id:"website-development",name:"Website Development",summary:"Clear, accessible and measurable websites that turn a brand story into useful journeys for customers, partners and teams.",fit:"For corporate sites, campaign destinations, service platforms, redesigns and carefully managed migrations.",includes:["Discovery, information architecture and content planning","UX, responsive interface design and development","SEO-ready migration, analytics planning and handover"],links:[["Explore website capability","/digital-marketing/website-design-development/"],["Explore technical SEO","/seo/technical-seo/"]]},
  {id:"brand-experiences-partnerships",name:"Brand Experiences & Partnerships",summary:"Experience concepts and partner-led activation designed to make the brand tangible in real settings and communities.",fit:"For events, exhibitions, collaborations, creator programmes, dealer engagement and integrated launches.",includes:["Experience and activation concepts","Partnership roles, content and communication","Digital amplification and post-activation reuse"],links:[["Explore connected work","/work/"],["Discuss a tailored scope","/get-a-quote/"]]},
];

const serviceRoutes = mainServices.map(service => `/services/${service.id}/`);
const brandCss = `
:root{--signal:#1900f5;--focus:#285cff;--brand-blue:#140a72;--brand-orange:#ff5a00}
.site-header,body,button,input,select,textarea{font-family:"Aptos","Segoe UI",Helvetica,Arial,sans-serif;font-synthesis:none}.desktop-nav>a,.nav-parent,.mobile-panel a,.mobile-panel summary,.button,.eyebrow,.section-kicker,.number,.tag,strong,h1,h2,h3,.footer-brand{font-weight:500}.hero-note strong{font-weight:500}.footer-logo-panel{display:inline-flex;padding:.65rem .8rem;background:#fff;border-radius:3px}.footer-logo{display:block;width:210px;height:auto}
.brand{min-width:176px}.brand-logo{display:block;width:174px;height:auto}.brand-mark{display:none}
h1 span{color:var(--brand-blue);background:linear-gradient(100deg,#ff5a00 0%,#972858 42%,#140a72 72%,#1900f5 100%);background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.global-band{background:linear-gradient(130deg,#140a72 0%,#101827 58%,#7d2616 100%)}
.global-band h2 span{color:#fff;background:linear-gradient(100deg,#ff8a42,#8b7cff,#6f74ff);background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.global-point{border-top:4px solid #1900f5}.global-point:nth-child(2){border-top-color:#742a75}.global-point:nth-child(3){border-top-color:#ff5a00}.global-point strong{color:#fff}
.button.signal,.quote-band{background:linear-gradient(110deg,#1900f5 0%,#140a72 40%,#972858 68%,#ff5a00 100%);border-color:transparent;color:#fff}
.quote-band .button{color:#101827}.availability:before{background:linear-gradient(135deg,#1769ff,#ff4d1c)}
.case-poster{background:linear-gradient(110deg,#ff5a00 0%,#972858 44%,#140a72 72%,#1900f5 100%);color:#fff}
.nav-toggle{width:28px}.nav-toggle:after{content:'⌄';font-size:1rem}.nav-group.open .nav-toggle:after{content:'⌃'}.nav-menu{top:calc(100% + .45rem);padding:.45rem;border:1px solid #e1e3ea;border-radius:14px;background:#fff;box-shadow:0 16px 40px rgba(16,24,39,.12)}.nav-menu.wide{width:570px;gap:.2rem}.nav-menu a{padding:.72rem .8rem;border-radius:9px}.nav-menu a:hover,.nav-menu a:focus-visible{background:#f4f6ff}.nav-menu small{margin-top:.12rem;font-size:.77rem;line-height:1.35;color:#697180}.mobile-panel{background:#fff;box-shadow:0 14px 30px rgba(16,24,39,.1)}
.main-service-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:1px;background:var(--line);border:1px solid var(--line)}
.main-service-card{grid-column:span 2;position:relative;overflow:hidden;background:#fff;padding:1.6rem;min-height:315px;display:flex;flex-direction:column}
.main-service-card:before{content:'';position:absolute;inset:0 0 auto;height:5px;background:linear-gradient(90deg,#ff5a00,#972858 48%,#1900f5)}
.main-service-card .number{color:var(--brand-blue);font-size:.78rem;font-weight:500}.main-service-card p{color:var(--muted)}.main-service-card a{margin-top:auto;font-weight:500}
.partner-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}.partner-point{border-left:4px solid #1900f5;padding-left:1.2rem}.partner-point:nth-child(2){border-color:#742a75}.partner-point:nth-child(3){border-color:#ff5a00}
@media(max-width:920px){.main-service-grid{grid-template-columns:repeat(2,1fr)}.main-service-card{grid-column:auto}.partner-grid{grid-template-columns:1fr 1fr}}
@media(max-width:620px){.main-service-grid,.partner-grid{grid-template-columns:1fr}}
`;

function header() {
  const links = mainServices.map(service => `<a href="/services/${service.id}/"><strong>${e(service.name)}</strong><small>${e(service.summary)}</small></a>`).join("");
  const mobile = mainServices.map(service => `<a href="/services/${service.id}/">${e(service.name)}</a>`).join("");
  return `<a class="skip" href="#main">Skip to content</a><header class="site-header"><div class="header-inner"><a class="brand" href="/" aria-label="Ambest Brandcom home"><img class="brand-logo" src="${headerLogo}" alt="Ambest Brandcom"></a><nav class="desktop-nav" aria-label="Primary"><a href="/">Home</a><a href="/about/">About</a><div class="nav-group"><a class="nav-parent" href="/services/ad-films-video-content/">Services</a><button class="nav-toggle" type="button" aria-label="Open Services menu" aria-expanded="false"></button><div class="nav-menu wide">${links}</div></div><a href="/work/">Work</a><a href="/blog/">Insights</a></nav><a class="button header-cta" href="/get-a-quote/">Get Custom Quote</a><button class="mobile-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu">Menu</button><nav id="mobile-menu" class="mobile-panel" aria-label="Mobile primary"><a href="/">Home</a><a href="/about/">About</a><details><summary>Services</summary>${mobile}</details><a href="/work/">Work</a><a href="/blog/">Insights</a><a href="/get-a-quote/">Get Custom Quote</a></nav></div></header>`;
}

function footer() {
  return `<footer class="footer"><div class="shell"><div class="footer-grid"><div><a class="footer-logo-panel" href="/" aria-label="Ambest Brandcom home"><img class="footer-logo" src="${headerLogo}" alt="Ambest Brandcom"></a><p>A Mumbai-rooted brand communications partner with experience across India and APAC.</p><span class="availability">Published contacts—operational status pending confirmation</span></div><div><strong>Main services</strong><a href="/services/ad-films-video-content/">Ad Films & Video Content</a><a href="/services/brand-communication-strategy/">Brand Communication & Strategy</a><a href="/services/creative-solutions/">Creative Solutions</a></div><div><strong>More services</strong><a href="/services/digital-social/">Digital & Social</a><a href="/services/website-development/">Website Development</a><a href="/services/brand-experiences-partnerships/">Brand Experiences & Partnerships</a><a href="/work/">Work</a></div><div><strong>Start</strong><a href="/about/">About</a><a href="/blog/">Insights</a><a href="/contact/">Contact</a><a href="/get-a-quote/">Get Custom Quote</a><a href="/privacy-policy/">Privacy</a></div></div><div class="fineprint"><small>Copyrights Reserved Ambest Brandcom</small><small>Private review build · no production cutover implied</small></div></div></footer>`;
}

function serviceCards() {
  return `<section class="section"><div class="shell"><div class="section-head"><div class="section-kicker">What we do</div><div><h2>Six services. One connected brand story.</h2><p class="lede">Strategy leads; the right mix of creativity, production, digital execution, web and partnerships follows.</p></div></div><div class="main-service-grid">${mainServices.map((service,index) => `<article class="main-service-card"><span class="number">0${index+1} / SERVICE</span><h3>${e(service.name)}</h3><p>${e(service.summary)}</p><a href="/services/${service.id}/">Explore the service →</a></article>`).join("")}</div></div></section>`;
}

function globalPartnerSection() {
  return `<section class="section"><div class="shell"><div class="section-head"><div class="section-kicker">For global companies</div><div><h2>One brand. Many markets, teams and moments.</h2><p class="lede">Ambest is positioned as the partner that turns a global brief into communication people can understand and use—without losing strategic consistency or local relevance.</p></div></div><div class="partner-grid"><article class="partner-point"><h3>Global intent, local nuance</h3><p>Translate a central brand idea for the audience, context and channel while preserving what must remain consistent.</p></article><article class="partner-point"><h3>One strategy, many outputs</h3><p>Connect film, design, social, web, search and experiences so teams do not manage five disconnected creative conversations.</p></article><article class="partner-point"><h3>Flexible collaboration</h3><p>Work with regional marketing, an India team, internal specialists or existing partners through an explicit responsibility map.</p></article></div></div></section>`;
}

function reworkHome(html) {
  html = html
    .replace("Mumbai-rooted · Global experience", "Mumbai-rooted · Global brand communications partner")
    .replace("Make the next move <span>clear.</span>", "Make your brand make sense. <span>Everywhere.</span>")
    .replace("Ambest brings SEO, video production and digital marketing around the same practical question: what must a buyer discover, understand or do next?", "Ambest helps global and ambitious Indian companies translate complex business stories into clear brand communication, content and experiences—built with local understanding and delivered across markets.")
    .replace("One company · three specialist divisions", "One partner · six connected services")
    .replace("Search discovery. Visual communication. Measurable execution.", "Strategy. Creativity. Content. Experiences. Growth.")
    .replace("The right scope follows the business situation—not an automatic bundle of every channel.", "A senior, integrated partner for teams that need consistency across markets, formats and collaborators.")
    .replace(/<section class="section"><div class="shell"><div class="section-head"><div class="section-kicker">Choose a path<\/div>[\s\S]*?<\/section>/, `${serviceCards()}${globalPartnerSection()}`)
    .replace(/<title>.*?<\/title>/, "<title>Global Brand Communications Partner | Ambest Brandcom</title>")
    .replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="Ambest is a Mumbai-rooted brand communications partner helping global companies connect strategy, creativity, content, digital and brand experiences.">');
  return html;
}

function rebrand(html, path, publicSite) {
  html = html
    .replaceAll("#c7ff33", "#1900f5")
    .replaceAll("#eef1e7", "#eef3ff")
    .replaceAll("font-weight:900", "font-weight:500")
    .replaceAll("font-weight:800", "font-weight:500")
    .replaceAll("font-weight:700", "font-weight:500")
    .replaceAll("Read the project record →", "Impact Created")
    .replaceAll("Ppc Advertising", "PPC Advertising")
    .replace("</style>", `${brandCss}</style>`)
    .replace(/<a class="skip"[\s\S]*?<\/header>/, header())
    .replace(/<footer class="footer"[\s\S]*?<\/footer>/, footer());
  if (path === "/") html = reworkHome(html);
  if (publicSite && !["/privacy-policy/","/disclaimer/","/thank-you/"].includes(path)) html = html.replace('<meta name="robots" content="noindex,nofollow">','<meta name="robots" content="index,follow">');
  return html;
}

function servicePage(service, publicSite) {
  const path = `/services/${service.id}/`;
  const body = `<nav class="shell breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li>Services</li><li>${e(service.name)}</li></ol></nav><section class="shell subhero"><div class="subhero-grid"><div><p class="eyebrow">Main service</p><h1>${e(service.name)}</h1><p class="hero-copy">${e(service.summary)}</p><div class="actions"><a class="button" href="/get-a-quote/?service=${service.id}">Discuss this service</a><a class="button secondary" href="/work/">View our work</a></div></div><aside class="subhero-note">${e(service.fit)}</aside></div></section><section class="section"><div class="shell content-grid"><div class="section-kicker">What it can include</div><div class="prose"><h2>A connected scope, defined around the brief.</h2><ul>${service.includes.map(item => `<li>${e(item)}</li>`).join("")}</ul><p>The final scope names audiences, markets, outputs, responsibilities, review gates and measures. Capabilities can be commissioned independently or connected when the business problem genuinely requires it.</p></div></div></section><section class="section global-band"><div class="shell content-grid"><div class="section-kicker">Global collaboration</div><div class="prose"><h2>Consistent enough to travel. Relevant enough to work locally.</h2><p>For international teams, Ambest can translate a central brief into market-ready communication while keeping factual approvals, brand rules, rights, stakeholders and handoffs explicit. The published company history supports experience across India and APAC; named country projects will be added only after approval.</p><div class="actions">${service.links.map(([label,href],index) => `<a class="button ${index===0?'signal':''}" href="${href}">${e(label)}</a>`).join("")}</div></div></div></section><section class="section"><div class="shell"><div class="quote-band"><p class="eyebrow">Start with the brief</p><h2>Tell us what the audience must understand, feel or do.</h2><p>We will shape the service mix after understanding the objective, context, market and constraints.</p><a class="button" href="/get-a-quote/?service=${service.id}">Get Custom Quote</a></div></div></section>`;
  let html = rebrand(generatedPages["/"], path, publicSite)
    .replace(/<title>.*?<\/title>/, `<title>${e(service.name)} | Ambest Brandcom</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${e(service.summary)}">`)
    .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${origin}${path}">`)
    .replace(/<main id="main">[\s\S]*?<\/main>/, `<main id="main">${body}</main>`);
  return html;
}

function quotePage(html, url, env, publicSite) {
  const selected = url.searchParams.get("service") || "";
  const options = mainServices.map(service => `<option value="${service.id}" ${selected===service.id?'selected':''}>${e(service.name)}</option>`).join("");
  html = rebrand(html, "/get-a-quote/", publicSite).replace('<option value="" selected>Choose a service or offer</option>', `<option value="" ${selected?'':'selected'}>Choose a service or offer</option><optgroup label="Main services">${options}</optgroup>`);
  if (env.TURNSTILE_SITE_KEY && env.TURNSTILE_SECRET_KEY && env.LEAD_WEBHOOK_URL) html = html.replace(/<p class="status-banner">[\s\S]*?<\/p>/, "");
  return html;
}

const acceptedIds = new Map();
const fieldLimits = {name:100,email:254,company:120,phone:40,selection:80,goal:3000,website:500,country:100,budget:100,timing:100,website_confirm:200,idempotencyKey:100,"cf-turnstile-response":2048};
async function handleQuote(request, env) {
  const url = new URL(request.url);
  if (request.method !== "POST") return json({message:"Method not allowed."},405,{Allow:"POST"});
  const requestOrigin = request.headers.get("origin");
  if (requestOrigin && requestOrigin !== url.origin) return json({message:"Cross-origin submissions are not accepted."},403);
  if (!(request.headers.get("content-type") || "").toLowerCase().startsWith("application/json")) return json({message:"Send the enquiry as JSON."},415);
  if (Number(request.headers.get("content-length") || 0) > 32768) return json({message:"The enquiry is too large."},413);
  let data;
  try { const text = await request.text(); if (text.length > 32768) throw new Error(); data = JSON.parse(text); } catch { return json({message:"The enquiry could not be read."},400); }
  if (!data || Array.isArray(data) || typeof data !== "object") return json({message:"The enquiry is invalid."},400);
  const clean = {};
  for (const [key,limit] of Object.entries(fieldLimits)) { const value=data[key]; if (typeof value === "string" && value.length > limit) return json({message:`${key} is too long.`},422); clean[key]=typeof value === "string" ? value.trim() : ""; }
  if (clean.website_confirm) return json({message:"The enquiry could not be accepted."},400);
  const allowed = new Set(mainServices.map(service=>service.id).concat([...seoOffers,...videoOffers].map(offer=>offer.id),digitalServices.map(item=>item[3])));
  if (!clean.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email) || !allowed.has(clean.selection) || clean.goal.length < 20) return json({message:"Complete the required fields with a valid email and project description."},422);
  if (clean.website) { try { const parsed=new URL(clean.website); if (!["http:","https:"].includes(parsed.protocol)) throw new Error(); } catch { return json({message:"Use a valid website URL beginning with http:// or https://."},422); } }
  if (clean.idempotencyKey && acceptedIds.has(clean.idempotencyKey)) return json({requestId:acceptedIds.get(clean.idempotencyKey),message:"Your enquiry has already been received."},202);
  if (env.DEVELOPMENT_MODE !== "true") {
    if (!env.TURNSTILE_SECRET_KEY || !env.LEAD_WEBHOOK_URL) return json({message:"Secure enquiry delivery is not configured yet."},503);
    if (!clean["cf-turnstile-response"]) return json({message:"Complete the anti-spam check and try again."},422);
    const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify",{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:new URLSearchParams({secret:env.TURNSTILE_SECRET_KEY,response:clean["cf-turnstile-response"],remoteip:request.headers.get("cf-connecting-ip")||""})});
    const result = await verify.json();
    if (!result.success) return json({message:"The anti-spam check expired or was invalid. Please try again."},422);
  }
  const requestId = crypto.randomUUID();
  const record = {requestId,receivedAt:new Date().toISOString(),name:clean.name,email:clean.email,company:clean.company||null,phone:clean.phone||null,selection:clean.selection,goal:clean.goal,website:clean.website||null,country:clean.country||null,budget:clean.budget||null,timing:clean.timing||null};
  if (env.DEVELOPMENT_MODE !== "true") {
    let endpoint; try { endpoint=new URL(env.LEAD_WEBHOOK_URL); if (endpoint.protocol !== "https:") throw new Error(); } catch { return json({message:"The approved delivery destination is invalid."},503); }
    const delivery = await fetch(endpoint.toString(),{method:"POST",headers:{"content-type":"application/json",...(env.LEAD_WEBHOOK_TOKEN?{authorization:`Bearer ${env.LEAD_WEBHOOK_TOKEN}`}:{})},body:JSON.stringify(record)});
    if (!delivery.ok) return json({message:"The enquiry destination did not accept the submission. Please retry or use email."},502);
  }
  if (clean.idempotencyKey) { acceptedIds.set(clean.idempotencyKey,requestId); setTimeout(()=>acceptedIds.delete(clean.idempotencyKey),900000); }
  return json({requestId,message:"Your enquiry has been received."},202);
}

function json(value,status=200,headers={}) { return new Response(JSON.stringify(value),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store","x-content-type-options":"nosniff",...headers}}); }
const extraRedirects = {"/blog/category/":"/blog/","/brand-anthem-video-production-mumbai-india/":"/video-production/ad-and-brand-films/","/short-film-production-india/":"/video-production/ad-and-brand-films/","/videos-podcast/":"/video-production/corporate-videos/","/drone-videosgraphy/":"/video-production/"};
const htmlHeaders = {"content-type":"text/html; charset=utf-8","x-content-type-options":"nosniff","referrer-policy":"strict-origin-when-cross-origin","x-frame-options":"SAMEORIGIN","permissions-policy":"camera=(), microphone=(), geolocation=()","content-security-policy":"default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com; connect-src 'self' https://challenges.cloudflare.com; base-uri 'self'; form-action 'self'; frame-ancestors 'self'"};
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#1769ff"/><stop offset="1" stop-color="#ff4d1c"/></linearGradient></defs><rect width="64" height="64" rx="10" fill="#101827"/><path d="M15 47 29 14h7l14 33h-9l-3-8H26l-3 8zm14-16h6l-3-8z" fill="url(#g)"/><path d="M46 14h5v12h-5z" fill="#ff4d1c"/></svg>`;

function missingPage(path) {
  const body = `<nav class="shell breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li>Not found</li></ol></nav><section class="shell subhero"><div><p class="eyebrow">404</p><h1>That page is not here.</h1><p class="hero-copy">Use the main navigation or return to the homepage.</p><a class="button" href="/">Return home</a></div></section>`;
  return rebrand(generatedPages["/"],path,false).replace(/<title>.*?<\/title>/,"<title>Page not found | Ambest Brandcom</title>").replace(/<meta name="description" content="[^"]*">/,'<meta name="description" content="The requested page could not be found.">').replace(/<link rel="canonical" href="[^"]*">/,`<link rel="canonical" href="${origin}${path}">`).replace(/<main id="main">[\s\S]*?<\/main>/,`<main id="main">${body}</main>`);
}

export default {
  async fetch(request, env={}) {
    const url = new URL(request.url);
    let path = url.pathname.replace(/\/{2,}/g,"/");
    const publicSite = env.PUBLIC_SITE === "true";
    if (path === "/api/quote") return handleQuote(request,env);
    if (!["GET","HEAD"].includes(request.method)) return new Response("Method not allowed",{status:405,headers:{Allow:"GET, HEAD"}});
    if (path === "/favicon.svg") return new Response(request.method==="HEAD"?null:favicon,{headers:{"content-type":"image/svg+xml","cache-control":"public,max-age=86400"}});
    if (path === "/robots.txt") { const body=publicSite?`User-agent: *\nDisallow: /thank-you/\nDisallow: /api/\nSitemap: ${origin}/sitemap.xml\n`:"User-agent: *\nDisallow: /\n"; return new Response(request.method==="HEAD"?null:body,{headers:{"content-type":"text/plain; charset=utf-8","cache-control":"public,max-age=300"}}); }
    if (path === "/sitemap.xml") { const routes=publicSite?Object.keys(generatedPages).concat(serviceRoutes).filter(route=>!["/privacy-policy/","/disclaimer/"].includes(route)):[]; const body=`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(route=>`<url><loc>${origin}${route}</loc></url>`).join("")}</urlset>`; return new Response(request.method==="HEAD"?null:body,{headers:{"content-type":"application/xml; charset=utf-8","cache-control":"public,max-age=300"}}); }
    if (path !== "/" && !path.endsWith("/")) { url.pathname=`${path}/`; return Response.redirect(url.toString(),308); }
    const redirect = legacyRedirects[path] || extraRedirects[path];
    if (redirect) { url.pathname=redirect; url.search=""; return Response.redirect(url.toString(),308); }
    const service = mainServices.find(item => path === `/services/${item.id}/`);
    let html = service ? servicePage(service,publicSite) : generatedPages[path] ? (path==="/get-a-quote/" ? quotePage(generatedPages[path],url,env,publicSite) : rebrand(generatedPages[path],path,publicSite)) : null;
    if (html) return new Response(request.method==="HEAD"?null:html,{headers:htmlHeaders});
    return new Response(request.method==="HEAD"?null:missingPage(path),{status:404,headers:{...htmlHeaders,"x-robots-tag":"noindex"}});
  }
};
