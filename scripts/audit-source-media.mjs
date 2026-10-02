const site = "https://www.ambestbrandcom.in";
const pages = [
  "digital-ad-films-video-production", "best-brand-management-and-advertising-agency-company-mumbai", "best-logo-design-services-agency-company-mumbai", "digital-marketing-services-agency-company-mumbai", "website-design-and-development-services-agency-company-mumbai", "exhibition-and-event-branding-agency-mumbai", "internal-branding-agency-mumbai",
  "brand-films-video-production", "corporate-communication-video-production", "corporate-film-production", "brand-anthem-video-production-mumbai-india", "micro-drama-production-india", "ai-video-production", "testimonial-video-production", "explainer-video-production", "2d-animation-video-production", "product-video-production", "social-media-video-production", "drone-videosgraphy", "commercial-photoshoots-services", "videos-podcast", "short-film-production-india",
  "purobien-nutrition", "shreeji", "bhoomi", "bryan-and-candy", "dr-amyn-rajani", "recons-group", "sigma-group", "red-moments", "aarya-menstrual-care", "timex-micas",
];

for (const slug of pages) {
  const response = await fetch(`${site}/${slug}/`);
  if (!response.ok) throw new Error(`${slug}: ${response.status}`);
  const html = await response.text();
  const images = [];
  const seen = new Set();
  for (const [tag] of html.matchAll(/<img\b[^>]*>/gi)) {
    const attr = name => tag.match(new RegExp(`(?:^|\\s)${name}="([^"]*)"`, "i"))?.[1] || "";
    const src = attr("data-lazy-src") || attr("src");
    if (!src.startsWith(`${site}/wp-content/uploads/`) || seen.has(src)) continue;
    seen.add(src);
    const width = Number(attr("width"));
    const height = Number(attr("height"));
    if ((width && width < 300) || (height && height < 200) || /logo|icon|flag/i.test(src.split("/").at(-1))) continue;
    images.push({file: src.split("/").at(-1), width, height, alt: attr("alt"), url: src});
  }
  const videos = [...new Set([...html.matchAll(/(?:youtube(?:-nocookie)?\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([A-Za-z0-9_-]{6,20})/g)].map(match => match[1]))];
  const files = [...new Set([...html.matchAll(/https?:\/\/[^\s"'<>]+\.(?:mp4|webm)/gi)].map(match => match[0]))];
  console.log(JSON.stringify({slug, images, videos, files}));
}
