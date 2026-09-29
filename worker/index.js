import { generatedPages } from "./generated-pages.js";
import { articles, digitalServices, legacyRedirects, projects, seoOffers, videoOffers } from "./content.js";
import { headerLogo } from "./logo-data.js";

const canonicalHost = "www.ambestbrandcom.com";
const apexHost = "ambestbrandcom.com";
const origin = `https://${canonicalHost}`;
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

const projectVisuals = {
  "purobien-nutrition": {file:"case-purobien.jpg",label:"PN / Nutrition ecommerce",alt:"Purobien Nutrition brand and product communication",positioning:"A wellness offer made coherent across ecommerce, marketplaces, content and acquisition."},
  "shreeji-woodcraft": {file:"case-shreeji.png",label:"SW / Interior and woodcraft",alt:"Shreeji Woodcraft brand communication",positioning:"An identity system translated across physical spaces, editorial communication, digital touchpoints and film."},
  "bhoomi": {file:"case-bhoomi.png",label:"B / Real estate",alt:"Bhoomi real estate brand identity",positioning:"Trust-led real-estate positioning carried consistently from identity and launch communication into digital journeys."},
  "bryan-candy": {file:"case-bryan-candy.png",label:"B&amp; / Beauty and bath products",alt:"Bryan and Candy beauty brand campaign",positioning:"A distinctive beauty brand expressed through campaign content, social media and marketplace communication."},
  "dr-amyn-rajani": {file:"case-dr-amyn.jpg",label:"DA / Healthcare practice",alt:"Dr Amyn Rajani healthcare communication",positioning:"Professional authority and patient trust shaped into a coherent identity, content, web and film system."},
  "recons-group": {file:"case-recons.png",label:"RG / Industrial and building materials",alt:"Recons Group industrial brand communication",positioning:"A technical B2B story simplified for stakeholders across identity, product explanation, social and sales communication."},
  "sigma-group": {file:"case-sigma.png",label:"SG / Real estate",alt:"Sigma Group real estate brand communication",positioning:"A cohesive real-estate brand architecture designed to make multiple projects easier to recognise and understand."},
  "red-moments": {file:"case-red-moments.png",label:"RM / Gifting and recognition",alt:"Red Moments gifting brand identity",positioning:"An experience-led gifting proposition translated into identity, packaging and useful customer touchpoints."},
  "aarya-menstrual-care": {file:"case-aarya.png",label:"AM / Personal care ecommerce",alt:"Aarya menstrual care brand communication",positioning:"Accessible personal-care communication connected across brand, ecommerce, marketplaces and content."},
  "timex-mica": {file:"case-timex.png",label:"TM / Surfaces and laminates",alt:"Timex Mica surfaces brand communication",positioning:"A design-led surfaces brand carried through identity, catalogue, showroom and digital communication."},
};

const projectServices = {
  "purobien-nutrition":["brand-communication-strategy","creative-solutions","digital-social","website-development"],
  "shreeji-woodcraft":["brand-communication-strategy","creative-solutions","ad-films-video-content","website-development"],
  "bhoomi":["brand-communication-strategy","creative-solutions","digital-social","website-development"],
  "bryan-candy":["brand-communication-strategy","creative-solutions","ad-films-video-content","digital-social"],
  "dr-amyn-rajani":["brand-communication-strategy","ad-films-video-content","digital-social","website-development"],
  "recons-group":["brand-communication-strategy","creative-solutions","ad-films-video-content","digital-social"],
  "sigma-group":["brand-communication-strategy","creative-solutions","digital-social","website-development"],
  "red-moments":["creative-solutions","digital-social","website-development","brand-experiences-partnerships"],
  "aarya-menstrual-care":["brand-communication-strategy","creative-solutions","digital-social","website-development"],
  "timex-mica":["brand-communication-strategy","creative-solutions","digital-social","brand-experiences-partnerships"],
};

const projectNarratives = {
  "purobien-nutrition": {context:"Purobien needed one wellness proposition to stay clear across an owned store, marketplaces, product education and acquisition activity.",decision:"Connect product presentation, education, sales destinations and acquisition around one commerce story instead of treating each channel as a separate campaign.",impact:"A unified brand and commerce system connected the owned store, marketplace presence and acquisition activity around one wellness offer.",why:"This case demonstrates how brand clarity and commerce execution can reinforce one another across owned and third-party platforms."},
  "shreeji-woodcraft": {context:"Shreeji Woodcraft needed a consistent identity and communication system that could move from physical materials to digital and moving-image formats.",decision:"Build a flexible visual and verbal system that remains recognisable across packaging, print, web, social content and film.",impact:"A coordinated family of assets gave the identity a consistent expression across sales, packaging, web and film.",why:"This work shows how one brand idea can retain its character across tactile, editorial, digital and cinematic applications."},
  "bhoomi": {context:"Bhoomi required a real-estate identity grounded in stability, foundations and trust, then carried into launch and customer-facing communication.",decision:"Use the trust-led brand rationale as a consistent principle for identity, stationery, social content, reels and the website experience.",impact:"The trust-led identity was carried into a coordinated launch and digital system, giving the project a consistent expression across touchpoints.",why:"Bhoomi demonstrates how a clear positioning idea can guide both brand identity and practical digital execution in real estate."},
  "bryan-candy": {context:"Bryan & Candy needed a consumer brand to earn attention and remain consistent across packaging, social proof, marketplaces and acquisition.",decision:"Coordinate the visual system, content, influencer and celebrity-led communication, marketplace presentation and paid activity around one recognisable brand.",impact:"The brand gained a consistent consumer-facing system across packaging, campaign content, social communication and marketplace activity.",why:"This case demonstrates connected consumer execution across the moments where awareness, consideration and purchase meet."},
  "dr-amyn-rajani": {context:"A specialist healthcare practice needed clearer authority and discoverability across owned information, search, local presence and communication channels.",decision:"Connect technical and local search foundations with deeper content, paid support, listings, social material, podcasts, PR and video—while keeping medical claims carefully governed.",impact:"The practice’s authority and patient information were brought together across web, search, content, paid communication and film.",why:"The project shows how a specialist practice can create a coherent discovery system without confusing marketing activity with clinical outcomes."},
  "recons-group": {context:"Recons faced an industrial communication challenge spanning group identity, a related venture and technical building products.",decision:"Create a connected identity and explanation system so B2B stakeholders can understand both the group relationship and the product value.",impact:"The group and its technical offer gained a connected system spanning identity, launch audiovisuals, product explainers, social communication and sales collateral.",why:"Recons is strong evidence of industrial identity and technical product communication working together across static and moving formats."},
  "sigma-group": {context:"Sigma needed distinct identities and launch communication for multiple property projects without losing overall coherence or operational clarity.",decision:"Give each project a recognisable expression while connecting launch brochures, on-site communication, websites, social content and location-led advertising.",impact:"Multiple property projects were brought into a coordinated identity and launch system while retaining their individual context.",why:"The work demonstrates how a multi-project real-estate portfolio can balance distinct launches with a manageable communication system."},
  "red-moments": {context:"Red Moments reaches gifting customers through digital discovery, exhibitions, dealer relationships and business communication.",decision:"Create consistent product explanation and clearer handoffs between the website, search, social, event and relationship-led touchpoints.",impact:"The proposition became more recognisable across web, exhibitions, dealer communication and ongoing digital touchpoints.",why:"This case illustrates how online and physical brand experiences can support the same customer journey without becoming disconnected."},
  "aarya-menstrual-care": {context:"Aarya needed sensitive personal-care information to remain clear and consistent across retail, direct-to-consumer, marketplace and influencer environments.",decision:"Connect packaging, retail communication, the owned store, marketplace content and creator activity while keeping health-related claims carefully reviewed.",impact:"The brand achieved a clearer, more consistent product presentation across direct-to-consumer, retail and marketplace environments.",why:"Aarya demonstrates cross-channel commerce execution in a category where accessible information and disciplined claim governance matter."},
  "timex-mica": {context:"The surfaces and laminates business needed long-term communication for architects, dealers and customers across multiple physical and digital contexts.",decision:"Maintain a consistent technical and visual language across websites, catalogues, social communication, exhibitions, stores and outdoor media.",impact:"A long-running industrial relationship was expressed through coherent architect, dealer and customer communication across catalogue, showroom and digital channels.",why:"The project demonstrates brand continuity across a wide channel mix for a design-led industrial product business."},
};

const serviceMedia = {
  "ad-films-video-content": {type:"video",title:"Ambest video production showreel 2026",youtube:"YaaTIMUeoNs",eyebrow:"Featured film",heading:"Ideas shaped for the screen—and for the audience.",copy:"A current selection of brand, corporate and product storytelling across live action, post-production and channel-ready formats."},
  "brand-communication-strategy": {type:"image",file:"case-recons.png",alt:"Recons Group communication system",eyebrow:"Strategy in practice",heading:"Make complex offers easier to understand.",copy:"The Recons Group project shows how identity, technical explanation and stakeholder communication can work as one B2B system.",href:"/work/recons-group/"},
  "creative-solutions": {type:"image",file:"case-shreeji.png",alt:"Shreeji Woodcraft creative communication",eyebrow:"Connected creativity",heading:"Build one idea across many expressions.",copy:"Shreeji Woodcraft connects identity, spatial application, editorial assets, digital touchpoints and film around a consistent story.",href:"/work/shreeji-woodcraft/"},
  "digital-social": {type:"image",file:"case-bryan-candy.png",alt:"Bryan and Candy digital campaign",eyebrow:"Digital expression",heading:"Create recognition across every scroll and storefront.",copy:"Bryan & Candy demonstrates a connected approach spanning campaign content, social communication, paid activity and marketplaces.",href:"/work/bryan-candy/"},
  "website-development": {type:"image",file:"website-bhoomi.png",alt:"Bhoomi website shown on a desktop screen",eyebrow:"Website experience",heading:"Turn a brand story into a useful digital journey.",copy:"Bhoomi’s website expression carries the trust-led brand into a clear, responsive customer touchpoint.",href:"/work/bhoomi/"},
  "brand-experiences-partnerships": {type:"image",file:"experience-events.jpg",alt:"Ambest brand experience at a live exhibition",eyebrow:"Live experience",heading:"Make the brand tangible in the room.",copy:"From event environments to partner-led activations, the experience is designed to connect physical presence with communication before and after the moment.",href:"/get-a-quote/?service=brand-experiences-partnerships"},
};

const featuredFilms = [
  {id:"YaaTIMUeoNs",poster:"video-showreel.jpg",title:"Video Production Showreel 2026",tag:"Showreel"},
  {id:"kw48Puf-Xxg",poster:"video-shreeji.jpg",title:"Shreeji Woodcraft industrial brand film",tag:"Brand film"},
  {id:"QU-ustoKMlg",poster:"video-agri.jpg",title:"Agri-food corporate film: From Farm to Future",tag:"Corporate film"},
  {id:"RIoAXxwHBe4",poster:"video-healthcare.jpg",title:"Healthcare and diagnostics campaign film",tag:"Healthcare"},
  {id:"Ohj3Uh9IEjo",poster:"video-celebrity.jpg",title:"Bryan & Candy celebrity ad film",tag:"Advertising"},
  {id:"sNsCuniNPjg",poster:"video-ai.jpg",title:"Human creativity with AI-led video",tag:"Creative technology"},
];

function youtubeEmbed(id, title) {
  const poster = featuredFilms.find(film => film.id === id)?.poster || "video-showreel.jpg";
  const embedUrl = `https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=1`;
  const preview = `<style>*{box-sizing:border-box}body{margin:0;background:#101827;font-family:Arial,sans-serif}a{position:absolute;inset:0;display:grid;place-items:center;color:white;text-decoration:none}img{width:100%;height:100%;object-fit:cover;opacity:.82}.play{position:absolute;display:grid;place-items:center;width:76px;height:76px;border-radius:50%;background:linear-gradient(135deg,#1900f5,#ff5a00);box-shadow:0 10px 34px rgba(0,0,0,.35);font-size:30px;padding-left:5px}.label{position:absolute;left:18px;bottom:16px;right:18px;font-size:16px;text-shadow:0 2px 10px #000}</style><a href="${embedUrl}" aria-label="Play ${e(title)}"><img src="/media/${poster}" alt=""><span class="play">▶</span><span class="label">${e(title)}</span></a>`;
  return `<div class="video-frame"><iframe srcdoc="${e(preview)}" data-embed="${embedUrl}" title="${e(title)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`;
}

function showreelSection() {
  return `<section class="section media-feature"><div class="shell media-split"><div><p class="eyebrow">2026 showreel</p><h2>Ideas that move.<br>Stories that travel.</h2><p class="lede">A selection of Ambest film work across brand stories, corporate communication, products and campaigns—created for different audiences, formats and markets.</p><div class="actions"><a class="button signal" href="/video-production/results/">Explore featured films</a><a class="button secondary" href="/services/ad-films-video-content/">Ad Films &amp; Video Content</a></div></div>${youtubeEmbed("YaaTIMUeoNs","Ambest video production showreel 2026")}</div></section>`;
}

function projectVisualSection(slug) {
  const visual = projectVisuals[slug];
  if (!visual) return "";
  return `<section class="section project-visual-section"><div class="shell project-visual-layout"><figure class="project-visual"><img src="/media/${visual.file}" alt="${e(visual.alt)}" loading="eager" decoding="async"><figcaption>Selected visual from the Ambest project archive.</figcaption></figure><div class="project-positioning"><p class="eyebrow">Why this work travels</p><h2>Clear thinking, expressed as a connected system.</h2><p class="lede">${e(visual.positioning)}</p><p>For global and multi-market teams, the transferable value is disciplined consistency: one strategic idea, adapted thoughtfully to each audience, channel and use.</p></div></div></section>`;
}

function serviceMediaSection(service) {
  const media = serviceMedia[service.id];
  if (!media) return "";
  const visual = media.type === "video"
    ? youtubeEmbed(media.youtube, media.title)
    : `<a class="service-image" href="${media.href}"><img src="/media/${media.file}" alt="${e(media.alt)}" loading="lazy" decoding="async"></a>`;
  return `<section class="section media-feature"><div class="shell media-split"><div><p class="eyebrow">${e(media.eyebrow)}</p><h2>${e(media.heading)}</h2><p class="lede">${e(media.copy)}</p>${media.type === "image" ? `<a href="${media.href}">View the related work →</a>` : `<a href="/video-production/results/">Explore featured films →</a>`}</div>${visual}</div></section>`;
}

function filmGallery() {
  return `<section class="section film-gallery-section"><div class="shell"><div class="section-head"><div class="section-kicker">Selected films</div><div><h2>Watch the work in context.</h2><p class="lede">A cross-section of Ambest’s current film portfolio, from brand and corporate storytelling to healthcare, advertising and creative technology.</p></div></div><div class="film-grid">${featuredFilms.map(film => `<article class="film-card">${youtubeEmbed(film.id,film.title)}<div class="film-copy"><span class="tag">${e(film.tag)}</span><h3>${e(film.title)}</h3></div></article>`).join("")}</div></div></section>`;
}

function applyProjectPosters(html) {
  for (const visual of Object.values(projectVisuals)) {
    const original = `<div class="case-poster" aria-hidden="true">${visual.label}</div>`;
    const replacement = `<div class="case-poster media-poster" style="--poster:url('/media/${visual.file}')" aria-hidden="true"><span>${visual.label}</span></div>`;
    html = html.replaceAll(original,replacement);
  }
  return html;
}

function projectServiceMarkup(slug) {
  return (projectServices[slug] || []).map(id => `<span>${e(mainServices.find(service => service.id === id)?.name || id)}</span>`).join("");
}

function applyProjectServicePositioning(html, path) {
  for (const [slug,ids] of Object.entries(projectServices)) {
    const needle = `href="/work/${slug}/"`;
    let searchFrom = 0;
    while (true) {
      const linkIndex = html.indexOf(needle,searchFrom);
      if (linkIndex < 0) break;
      const start = html.lastIndexOf('<article class="case-card"',linkIndex);
      const endIndex = html.indexOf("</article>",linkIndex);
      if (start < 0 || endIndex < 0) break;
      const end = endIndex + "</article>".length;
      const card = html.slice(start,end);
      const updated = card
        .replace(/data-project="([^"]*)"/,(_,existing) => `data-project="${existing} ${ids.join(" ")}"`)
        .replace(/<div class="scope-list">[\s\S]*?<\/div>/,`<div class="scope-list">${projectServiceMarkup(slug)}</div>`);
      html = html.slice(0,start) + updated + html.slice(end);
      searchFrom = start + updated.length;
    }
  }
  if (path === "/work/") {
    const filters = `<div class="filter-bar" aria-label="Filter projects"><button class="filter-button active" type="button" data-filter="all">All</button>${mainServices.map(service => `<button class="filter-button" type="button" data-filter="${service.id}">${e(service.name)}</button>`).join("")}</div>`;
    html = html.replace(/<div class="filter-bar" aria-label="Filter projects">[\s\S]*?<\/div>/,filters);
  }
  const slug = path.match(/^\/work\/([^/]+)\/$/)?.[1];
  if (slug && projectServices[slug]) {
    const serviceNames = projectServices[slug].map(id => mainServices.find(service => service.id === id)?.name).filter(Boolean).join(", ");
    html = html
      .replace(/<div class="fact"><small>Ambest role<\/small><strong>[\s\S]*?<\/strong><\/div>/,`<div class="fact"><small>Ambest role</small><strong>${e(serviceNames)}</strong></div>`)
      .replace(/<div class="scope-list">[\s\S]*?<\/div>/,`<div class="scope-list">${projectServiceMarkup(slug)}</div>`)
      .replace(/href="\/get-a-quote\/\?service=[^"]+"/,`href="/get-a-quote/?service=${projectServices[slug][0]}"`);
  }
  return html;
}

function aboutMediaSection() {
  return `<section class="section about-media"><div class="shell"><div class="about-media-card"><img src="/media/about-team.jpg" alt="Ambest team collaborating in the Mumbai studio" loading="eager" decoding="async"><div class="about-media-copy"><p class="eyebrow">Mumbai roots · Global outlook</p><h2>Made close to the brief. Built to travel.</h2><p class="lede">Ambest brings strategy, creativity, production and digital execution into one collaborative team—helping brands stay coherent while adapting communication for different audiences and markets.</p><a class="button signal" href="/work/">Explore our work</a></div></div></div></section>`;
}

function projectNarrativeSection(kicker, heading, copy, extra="") {
  return `<section class="section"><div class="shell content-grid"><div class="section-kicker">${e(kicker)}</div><div class="prose"><h2>${e(heading)}</h2><p>${e(copy)}</p>${extra}</div></div></section>`;
}

function replaceProjectSection(html, kicker, replacement) {
  const escaped = kicker.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
  const pattern = new RegExp(`<section class="section"><div class="shell content-grid"><div class="section-kicker">${escaped}<\\/div><div class="prose">[\\s\\S]*?<\\/div><\\/div><\\/section>`);
  return html.replace(pattern,replacement);
}

function enrichPage(html, path) {
  html = applyProjectPosters(html);
  html = applyProjectServicePositioning(html,path);
  const projectSlug = path.match(/^\/work\/([^/]+)\/$/)?.[1];
  if (projectSlug && projectVisuals[projectSlug]) {
    const narrative = projectNarratives[projectSlug];
    html = html
      .replace('<header class="shell project-header">', '<header class="shell project-header case-study-hero">')
      .replace("Approved qualitative scope", "Verified project scope")
      .replace('<section class="section"><div class="shell content-grid">', `${projectVisualSection(projectSlug)}<section class="section"><div class="shell content-grid">`);
    html = replaceProjectSection(html,"Starting point",projectNarrativeSection("The challenge","The business context",narrative.context));
    html = replaceProjectSection(html,"The decision",projectNarrativeSection("The strategy","The strategic direction",narrative.decision));
    html = html.replace(/(<div class="section-kicker">The work<\/div><div class="prose"><h2>Connected deliverables<\/h2>)<p>[\s\S]*?<\/p>/,`$1<p>The execution connected the documented deliverables around one strategic direction, with each output designed for its audience, channel and practical use.</p>`);
    html = replaceProjectSection(html,"Outcomes",projectNarrativeSection("Outcomes","Impact created",narrative.impact));
    html = replaceProjectSection(html,"What it demonstrates",projectNarrativeSection("Relevance","Why this work matters",narrative.why,`<div class="scope-list">${projectServiceMarkup(projectSlug)}</div>`));
  }
  if (path === "/about/") {
    html = html
      .replace("Ambest Brandcom brings its current capabilities into three clear divisions: SEO, Video Production and Digital Marketing. The structure is new; the foundation is the documented relationship between brand thinking, practical execution and moving image across India and APAC.", "Ambest Brandcom brings strategy, creative thinking, film, digital, websites and brand experiences into one connected practice. The foundation is a documented relationship between brand thinking, practical execution and moving image—with Mumbai roots and a global outlook.")
      .replace("International experience is stated from published company evidence; no unsupported worldwide office network is implied.", "A collaborative brand communications partner for companies working across teams, formats and markets.")
      .replace('<section class="section"><div class="shell content-grid">', `${aboutMediaSection()}<section class="section"><div class="shell content-grid">`);
  }
  if (path === "/work/") {
    html = html
      .replace("Actual scopes, kept in their project context.", "Selected work across brand, film, digital and experience.")
      .replace("This shared collection feeds every division's Results page. Each client engagement has one canonical record; related disciplines point back to it rather than multiplying the same story across the site.", "Ten project stories show how Ambest connects strategic clarity with coherent execution across identity, film, digital, ecommerce, websites and physical touchpoints.")
      .replace("Qualitative deliverables are intentional evidence. Disputed metrics are not required to make a card feel complete.", "Each case keeps the challenge, decisions, execution and impact together—without separating the work from its context.")
      .replace("Project associations are based on the reviewed public source pages. Client media and reported figures remain excluded until permissions and evidence fields are approved.", "Each case is mapped to Ambest’s six core services according to the documented deliverables, giving a clearer view of the connected thinking and execution behind the work.");
  }
  if (path === "/video-production/results/") {
    html = html
      .replace("Evidence that keeps the scope attached.", "Film work built for a clear role.")
      .replace("These projects are filtered from the shared Ambest work collection using actual service relationships. A film deliverable is not presented as a PPC conversion, and a reported combined result is not silently reassigned to one channel.", "Watch a selected range of Ambest films, then explore the project context behind relevant brand and product communication work.")
      .replace("Reported by Ambest, documented result and independently verified are different evidence states.", "Brand stories, corporate communication, campaigns and product films—created around audience, channel and intended use.")
      .replace("This review publishes supported deliverables. Numerical claims remain in the internal evidence register when their definitions, periods, attribution or permissions are incomplete.", "The related project stories show how film works within broader brand, creative and communication systems.")
      .replace("Discuss a Video Production scope with its evidence requirements.", "Discuss a film scope shaped around your audience and market.")
      .replace('<section class="section"><div class="shell"><div class="filter-bar"', `${filmGallery()}<section class="section"><div class="shell"><div class="filter-bar"`);
  }
  return html;
}
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
.case-poster.media-poster{min-height:205px;background-color:#f4f5fa;background-image:linear-gradient(0deg,rgba(20,10,114,.92) 0%,rgba(151,40,88,.5) 34%,rgba(255,90,0,.08) 70%),var(--poster);background-size:cover,contain;background-position:center;background-repeat:no-repeat;color:#fff}
.case-poster.media-poster span{max-width:88%;font-size:1.06rem;line-height:1.2;letter-spacing:.01em;text-shadow:0 1px 12px rgba(0,0,0,.35)}
.case-study-hero{max-width:calc(var(--max) - 2.5rem);margin-top:1.5rem;margin-bottom:3rem;padding:clamp(2rem,5vw,4rem);border-radius:20px;background:linear-gradient(112deg,#1900f5 0%,#140a72 42%,#972858 70%,#ff5a00 100%);color:#fff;box-shadow:0 24px 60px rgba(20,10,114,.18)}.case-study-hero h1,.case-study-hero .hero-copy,.case-study-hero strong{color:#fff}.case-study-hero .eyebrow,.case-study-hero .fact small{color:#e7e5ff}.case-study-hero .eyebrow:before{background:#ff8a42}.case-study-hero .facts{border-color:rgba(255,255,255,.24);background:rgba(255,255,255,.24)}.case-study-hero .fact{background:rgba(16,24,39,.28);backdrop-filter:blur(8px)}
.project-grid{gap:1rem;background:transparent;border:0}.case-card{overflow:hidden;border:1px solid var(--line);border-radius:14px}
.media-feature{background:#fff}.media-split{display:grid;grid-template-columns:minmax(0,.82fr) minmax(420px,1.18fr);gap:clamp(2rem,6vw,5rem);align-items:center}.media-split h2{max-width:700px}.video-frame{position:relative;overflow:hidden;aspect-ratio:16/9;background:#101827;border-radius:18px;box-shadow:0 24px 60px rgba(20,10,114,.16)}.video-frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0}.service-image{display:block;overflow:hidden;min-height:410px;border-radius:18px;background:linear-gradient(135deg,#fff4ed,#eff1ff);box-shadow:0 24px 60px rgba(20,10,114,.14)}.service-image img{display:block;width:100%;height:410px;object-fit:contain}.project-visual-section{background:linear-gradient(135deg,#fff 0%,#f4f5ff 58%,#fff3eb 100%)}.project-visual-layout{display:grid;grid-template-columns:minmax(0,1.12fr) minmax(320px,.88fr);gap:clamp(2rem,6vw,5rem);align-items:center}.project-visual{margin:0;overflow:hidden;border-radius:20px;background:#fff;box-shadow:0 22px 60px rgba(20,10,114,.13)}.project-visual img{display:block;width:100%;height:min(52vw,570px);min-height:360px;object-fit:contain}.project-visual figcaption{padding:.8rem 1rem;border-top:1px solid var(--line);color:var(--muted);font-size:.78rem}.project-positioning h2{font-size:clamp(2.25rem,4vw,4rem)}.film-gallery-section{background:#11182a;color:#fff}.film-gallery-section .section-kicker,.film-gallery-section .lede{color:#cfd3df}.film-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.4rem}.film-card{overflow:hidden;border:1px solid #30394c;border-radius:18px;background:#192235}.film-card .video-frame{border-radius:0;box-shadow:none}.film-copy{padding:1.1rem 1.2rem 1.3rem}.film-copy .tag{border-color:#515b70;background:transparent}.film-copy h3{margin:.75rem 0 0}.about-media{padding-top:0}.about-media-card{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(300px,.92fr);background:#11182a;color:#fff;border-radius:20px;overflow:hidden}.about-media-card img{display:block;width:100%;height:100%;min-height:480px;object-fit:cover}.about-media-copy{padding:clamp(2rem,5vw,4rem);align-self:center}.about-media-copy .eyebrow,.about-media-copy .lede{color:#d9ddea}.about-media-copy h2{font-size:clamp(2.3rem,4.5vw,4.5rem)}
  .nav-toggle{width:28px}.nav-toggle:after{content:'⌄';font-size:1rem}.nav-group.open .nav-toggle:after{content:'⌃'}.nav-menu{top:calc(100% + .45rem);padding:.45rem;border:1px solid #e1e3ea;border-radius:14px;background:#fff;box-shadow:0 16px 40px rgba(16,24,39,.12)}.nav-menu.wide{left:auto;right:0;width:570px;gap:.2rem}.nav-menu a{padding:.72rem .8rem;border-radius:9px}.nav-menu a:hover,.nav-menu a:focus-visible{background:#f4f6ff}.nav-menu small{margin-top:.12rem;font-size:.77rem;line-height:1.35;color:#697180}.mobile-panel{background:#fff;box-shadow:0 14px 30px rgba(16,24,39,.1)}
.main-service-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:1px;background:var(--line);border:1px solid var(--line)}
.main-service-card{grid-column:span 2;position:relative;overflow:hidden;background:#fff;padding:1.6rem;min-height:315px;display:flex;flex-direction:column}
.main-service-card:before{content:'';position:absolute;inset:0 0 auto;height:5px;background:linear-gradient(90deg,#ff5a00,#972858 48%,#1900f5)}
.main-service-card .number{color:var(--brand-blue);font-size:.78rem;font-weight:500}.main-service-card p{color:var(--muted)}.main-service-card a{margin-top:auto;font-weight:500}
.partner-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}.partner-point{border-left:4px solid #1900f5;padding-left:1.2rem}.partner-point:nth-child(2){border-color:#742a75}.partner-point:nth-child(3){border-color:#ff5a00}
@media(max-width:920px){.main-service-grid{grid-template-columns:repeat(2,1fr)}.main-service-card{grid-column:auto}.partner-grid{grid-template-columns:1fr 1fr}.media-split,.project-visual-layout,.about-media-card{grid-template-columns:1fr}.film-grid{grid-template-columns:1fr 1fr}.about-media-card img{min-height:360px}}
@media(max-width:620px){.main-service-grid,.partner-grid,.film-grid{grid-template-columns:1fr}.media-split{grid-template-columns:1fr}.service-image{min-height:290px}.service-image img{height:290px}.project-visual img{height:350px;min-height:0}.case-poster.media-poster{min-height:180px}.about-media-card img{min-height:300px}}
`;

function header() {
  const links = mainServices.map(service => `<a href="/services/${service.id}/"><strong>${e(service.name)}</strong><small>${e(service.summary)}</small></a>`).join("");
  const mobile = mainServices.map(service => `<a href="/services/${service.id}/">${e(service.name)}</a>`).join("");
  return `<a class="skip" href="#main">Skip to content</a><header class="site-header"><div class="header-inner"><a class="brand" href="/" aria-label="Ambest Brandcom home"><img class="brand-logo" src="${headerLogo}" alt="Ambest Brandcom"></a><nav class="desktop-nav" aria-label="Primary"><a href="/">Home</a><a href="/about/">About</a><div class="nav-group"><a class="nav-parent" href="/services/ad-films-video-content/">Services</a><button class="nav-toggle" type="button" aria-label="Open Services menu" aria-expanded="false"></button><div class="nav-menu wide">${links}</div></div><a href="/work/">Work</a><a href="/blog/">Insights</a></nav><a class="button header-cta" href="/get-a-quote/">Get Custom Quote</a><button class="mobile-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu">Menu</button><nav id="mobile-menu" class="mobile-panel" aria-label="Mobile primary"><a href="/">Home</a><a href="/about/">About</a><details><summary>Services</summary>${mobile}</details><a href="/work/">Work</a><a href="/blog/">Insights</a><a href="/get-a-quote/">Get Custom Quote</a></nav></div></header>`;
}

function footer(publicSite) {
  const releaseLabel = publicSite ? "Global experience · Mumbai roots" : "Private review build · no production cutover implied";
  const availabilityLabel = publicSite ? "Serving brands in India and global markets" : "Published contacts—operational status pending confirmation";
  return `<footer class="footer"><div class="shell"><div class="footer-grid"><div><a class="footer-logo-panel" href="/" aria-label="Ambest Brandcom home"><img class="footer-logo" src="${headerLogo}" alt="Ambest Brandcom"></a><p>A Mumbai-rooted brand communications partner with experience in India and global markets.</p><span class="availability">${availabilityLabel}</span></div><div><strong>Main services</strong><a href="/services/ad-films-video-content/">Ad Films & Video Content</a><a href="/services/brand-communication-strategy/">Brand Communication & Strategy</a><a href="/services/creative-solutions/">Creative Solutions</a></div><div><strong>More services</strong><a href="/services/digital-social/">Digital & Social</a><a href="/services/website-development/">Website Development</a><a href="/services/brand-experiences-partnerships/">Brand Experiences & Partnerships</a><a href="/work/">Work</a></div><div><strong>Start</strong><a href="/about/">About</a><a href="/blog/">Insights</a><a href="/contact/">Contact</a><a href="/get-a-quote/">Get Custom Quote</a><a href="/privacy-policy/">Privacy</a></div></div><div class="fineprint"><small>Copyrights Reserved Ambest Brandcom</small><small>${releaseLabel}</small></div></div></footer>`;
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
    .replace("its current contact footprint extends to Singapore and Canada.", "its international touchpoints include Singapore, Canada and the US.")
    .replace("Published contacts in Singapore and Canada support conversations beyond India; their current operating status remains subject to confirmation.", "Published contacts in Singapore, Canada and the US support collaboration beyond India and across international markets.")
    .replace("View our international contacts", "Connect with Ambest")
    .replace('<section class="section global-band">', `${showreelSection()}<section class="section global-band">`)
    .replace(/<section class="section"><div class="shell"><div class="section-head"><div class="section-kicker">Choose a path<\/div>[\s\S]*?<\/section>/, `${serviceCards()}${globalPartnerSection()}`)
    .replace(/<title>.*?<\/title>/, "<title>Global Brand Communications Partner | Ambest Brandcom</title>")
    .replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="Ambest is a Mumbai-rooted brand communications partner helping global companies connect strategy, creativity, content, digital and brand experiences.">');
  return html;
}

function rebrand(html, path, publicSite) {
  html = html
    .replaceAll("https://ambestmedia.com", origin)
    .replaceAll("#c7ff33", "#1900f5")
    .replaceAll("#eef1e7", "#eef3ff")
    .replaceAll("font-weight:900", "font-weight:500")
    .replaceAll("font-weight:800", "font-weight:500")
    .replaceAll("font-weight:700", "font-weight:500")
    .replaceAll("Read the project record →", "Impact Created")
    .replaceAll("Ppc Advertising", "PPC Advertising")
    .replace("</style>", `${brandCss}</style>`)
    .replace(/<a class="skip"[\s\S]*?<\/header>/, header())
    .replace(/<footer class="footer"[\s\S]*?<\/footer>/, footer(publicSite));
  if (path === "/") html = reworkHome(html);
  html = enrichPage(html,path);
  if (publicSite) {
    html = html
      .replace("The preview uses qualitative outcomes while reported figures await definition, period and approval checks.", "Selected work is presented through verified project scope and qualitative outcomes.")
      .replace("Published contacts in Singapore and Canada support conversations beyond India; their current operating status remains subject to confirmation.", "Published contacts in Singapore, Canada and the US support collaboration beyond India and across international markets.");
    if (!["/privacy-policy/","/disclaimer/","/thank-you/"].includes(path)) html = html.replace('<meta name="robots" content="noindex,nofollow">','<meta name="robots" content="index,follow">');
  }
  return html;
}

function servicePage(service, publicSite) {
  const path = `/services/${service.id}/`;
  const body = `<nav class="shell breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li>Services</li><li>${e(service.name)}</li></ol></nav><section class="shell subhero"><div class="subhero-grid"><div><p class="eyebrow">Main service</p><h1>${e(service.name)}</h1><p class="hero-copy">${e(service.summary)}</p><div class="actions"><a class="button" href="/get-a-quote/?service=${service.id}">Discuss this service</a><a class="button secondary" href="/work/">View our work</a></div></div><aside class="subhero-note">${e(service.fit)}</aside></div></section>${serviceMediaSection(service)}<section class="section"><div class="shell content-grid"><div class="section-kicker">What it can include</div><div class="prose"><h2>A connected scope, defined around the brief.</h2><ul>${service.includes.map(item => `<li>${e(item)}</li>`).join("")}</ul><p>The final scope names audiences, markets, outputs, responsibilities, review gates and measures. Capabilities can be commissioned independently or connected when the business problem genuinely requires it.</p></div></div></section><section class="section global-band"><div class="shell content-grid"><div class="section-kicker">Global collaboration</div><div class="prose"><h2>Consistent enough to travel. Relevant enough to work locally.</h2><p>For international teams, Ambest can translate a central brief into market-ready communication while keeping factual approvals, brand rules, rights, stakeholders and handoffs explicit. The work is structured for collaboration across India and global markets.</p><div class="actions">${service.links.map(([label,href],index) => `<a class="button ${index===0?'signal':''}" href="${href}">${e(label)}</a>`).join("")}</div></div></div></section><section class="section"><div class="shell"><div class="quote-band"><p class="eyebrow">Start with the brief</p><h2>Tell us what the audience must understand, feel or do.</h2><p>We will shape the service mix after understanding the objective, context, market and constraints.</p><a class="button" href="/get-a-quote/?service=${service.id}">Get Custom Quote</a></div></div></section>`;
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
  if (clean.idempotencyKey) {
    acceptedIds.set(clean.idempotencyKey,requestId);
    const cleanup = setTimeout(()=>acceptedIds.delete(clean.idempotencyKey),900000);
    cleanup?.unref?.();
  }
  return json({requestId,message:"Your enquiry has been received."},202);
}

function json(value,status=200,headers={}) { return new Response(JSON.stringify(value),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store","x-content-type-options":"nosniff",...headers}}); }
const extraRedirects = {"/blog/category/":"/blog/","/brand-anthem-video-production-mumbai-india/":"/video-production/ad-and-brand-films/","/short-film-production-india/":"/video-production/ad-and-brand-films/","/videos-podcast/":"/video-production/corporate-videos/","/drone-videosgraphy/":"/video-production/"};
const htmlHeaders = {"content-type":"text/html; charset=utf-8","x-content-type-options":"nosniff","referrer-policy":"strict-origin-when-cross-origin","x-frame-options":"SAMEORIGIN","permissions-policy":"camera=(), microphone=(), geolocation=()","content-security-policy":"default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com; frame-src https://www.youtube-nocookie.com https://challenges.cloudflare.com; connect-src 'self' https://challenges.cloudflare.com; base-uri 'self'; form-action 'self'; frame-ancestors 'self'"};
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
    const fileRoutes = new Set(["/api/quote","/favicon.svg","/robots.txt","/sitemap.xml"]);
    const isFilePath = fileRoutes.has(path) || path.startsWith("/media/");
    const slashNormalizedPath = path !== "/" && !path.endsWith("/") && !isFilePath ? `${path}/` : path;
    const mappedPath = legacyRedirects[slashNormalizedPath] || extraRedirects[slashNormalizedPath] || slashNormalizedPath;
    const isProductionHost = url.hostname === canonicalHost || url.hostname === apexHost;
    const needsProductionRedirect = isProductionHost && (url.protocol !== "https:" || url.hostname !== canonicalHost || path !== mappedPath);
    if (["GET","HEAD"].includes(request.method) && needsProductionRedirect) {
      url.protocol = "https:";
      url.hostname = canonicalHost;
      url.pathname = mappedPath;
      if (mappedPath !== slashNormalizedPath) url.search = "";
      return Response.redirect(url.toString(),301);
    }
    if (["GET","HEAD"].includes(request.method) && path !== mappedPath) {
      url.pathname = mappedPath;
      if (mappedPath !== slashNormalizedPath) url.search = "";
      return Response.redirect(url.toString(),301);
    }
    path = mappedPath;
    if (path === "/api/quote") return handleQuote(request,env);
    if (!["GET","HEAD"].includes(request.method)) return new Response("Method not allowed",{status:405,headers:{Allow:"GET, HEAD"}});
    if (path.startsWith("/media/")) {
      if (env.ASSETS?.fetch) return env.ASSETS.fetch(request);
      return new Response("Not found",{status:404,headers:{"cache-control":"no-store"}});
    }
    if (path === "/favicon.svg") return new Response(request.method==="HEAD"?null:favicon,{headers:{"content-type":"image/svg+xml","cache-control":"public,max-age=86400"}});
    if (path === "/robots.txt") { const body=publicSite?`User-agent: *\nDisallow: /thank-you/\nDisallow: /api/\nSitemap: ${origin}/sitemap.xml\n`:"User-agent: *\nDisallow: /\n"; return new Response(request.method==="HEAD"?null:body,{headers:{"content-type":"text/plain; charset=utf-8","cache-control":"public,max-age=300"}}); }
    if (path === "/sitemap.xml") { const routes=publicSite?Object.keys(generatedPages).concat(serviceRoutes).filter(route=>!["/privacy-policy/","/disclaimer/"].includes(route)):[]; const body=`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(route=>`<url><loc>${origin}${route}</loc></url>`).join("")}</urlset>`; return new Response(request.method==="HEAD"?null:body,{headers:{"content-type":"application/xml; charset=utf-8","cache-control":"public,max-age=300"}}); }
    const service = mainServices.find(item => path === `/services/${item.id}/`);
    let html = service ? servicePage(service,publicSite) : generatedPages[path] ? (path==="/get-a-quote/" ? quotePage(generatedPages[path],url,env,publicSite) : rebrand(generatedPages[path],path,publicSite)) : null;
    if (html) return new Response(request.method==="HEAD"?null:html,{headers:htmlHeaders});
    return new Response(request.method==="HEAD"?null:missingPage(path),{status:404,headers:{...htmlHeaders,"x-robots-tag":"noindex"}});
  }
};
