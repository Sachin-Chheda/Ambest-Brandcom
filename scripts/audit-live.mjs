// Read-only audit of the published site. Run: node scripts/audit-live.mjs
const origin = process.argv[2] || "https://www.ambestbrandcom.com";
const root = new URL(origin);
const sitemap = await fetch(new URL("/sitemap.xml", root));
if (!sitemap.ok) throw new Error(`Sitemap: ${sitemap.status}`);
const xml = await sitemap.text();
const pages = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const references = new Map();
const pageProblems = [];

async function checkPage(page) {
  try {
    const response = await fetch(page, {headers:{"cache-control":"no-cache"}});
    if (!response.ok) { pageProblems.push({page,status:response.status}); return; }
    const html = await response.text();
    const media = new Set();
    for (const match of html.matchAll(/\b(?:src|poster|href)="([^"]+\.(?:png|jpe?g|webp|gif|svg|avif|mp4|webm)(?:\?[^"]*)?)"/gi)) media.add(match[1]);
    for (const match of html.matchAll(/url\(['"]?([^)'"\s]+\.(?:png|jpe?g|webp|gif|svg|avif)(?:\?[^)'"\s]*)?)['"]?\)/gi)) media.add(match[1]);
    for (const item of media) {
      const url = new URL(item.replaceAll("&amp;","&"), page).href;
      if (!references.has(url)) references.set(url, []);
      references.get(url).push(new URL(page).pathname);
    }
  } catch (error) { pageProblems.push({page,error:String(error)}); }
}

for (let index=0; index<pages.length; index+=8) await Promise.all(pages.slice(index,index+8).map(checkPage));
const mediaProblems = [];
for (const [url,usedOn] of references) {
  try {
    const response = await fetch(url,{method:"HEAD"});
    const type = response.headers.get("content-type") || "";
    if (!response.ok || type.includes("text/html")) mediaProblems.push({url,status:response.status,type,usedOn});
  } catch (error) { mediaProblems.push({url,error:String(error),usedOn}); }
}
console.log(JSON.stringify({pages:pages.length,media:references.size,pageProblems,mediaProblems},null,2));
