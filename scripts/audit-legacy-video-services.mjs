const defaultPaths = [
  "/digital-ad-films-video-production/",
  "/brand-films-video-production/",
  "/best-corporate-video-production-services-company-agency-mumbai/",
  "/corporate-communication-video-production/",
  "/corporate-film-production/",
  "/brand-anthem-video-production-mumbai-india/",
  "/micro-drama-production-india/",
  "/ai-video-production/",
  "/testimonial-video-production/",
  "/explainer-video-production/",
  "/2d-animation-video-production/",
  "/product-video-production/",
  "/social-media-video-production/",
  "/drone-videosgraphy/",
  "/commercial-photoshoots-services/",
  "/videos-podcast/",
  "/short-film-production-india/",
];
const requestedPaths = process.argv.slice(2).filter(value => !value.startsWith("--"));
const paths = requestedPaths.length ? requestedPaths : defaultPaths;

const decode = value => String(value || "")
  .replace(/<[^>]+>/g, " ")
  .replace(/&amp;/g, "&")
  .replace(/&#8211;|&ndash;/g, "–")
  .replace(/&#8217;|&rsquo;/g, "'")
  .replace(/&nbsp;/g, " ")
  .replace(/\s+/g, " ")
  .trim();

for (const path of paths) {
  const url = `https://www.ambestbrandcom.in${path}`;
  const response = await fetch(url);
  const html = await response.text();
  const title = decode(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]);
  const meta = decode(html.match(/<meta[^>]+(?:name|property)=["'](?:description|og:description)["'][^>]+content=["']([^"']*)/i)?.[1]);
  const headings = [...html.matchAll(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/gi)]
    .map(match => decode(match[1]))
    .filter(Boolean)
    .slice(0, 18);
  const media = [...html.matchAll(/(?:src|poster|data-src|href)=["']([^"']+\.(?:webm|mp4|jpg|jpeg|png|webp)(?:\?[^"']*)?)/gi)]
    .map(match => new URL(match[1], url).href);
  const frames = [...html.matchAll(/<iframe[^>]+src=["']([^"']+)/gi)]
    .map(match => new URL(match[1], url).href);
  const youtube = [...html.matchAll(/(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([A-Za-z0-9_-]{6,20})/gi)]
    .map(match => match[1]);

  const record = {
    path,
    status: response.status,
    title,
    meta,
    headings,
    media: [...new Set(media)].slice(0, 24),
    frames: [...new Set(frames)].slice(0, 18),
    youtube: [...new Set(youtube)],
  };
  if (process.argv.includes("--compact")) {
    record.headings = headings.slice(0, 4);
    record.media = record.media
      .filter(item => !/favicon|cropped-|delete-sign|TVC-Ads-Showreel/i.test(item))
      .slice(0, 8);
    record.frames = [];
  }
  console.log(JSON.stringify(record));
}
