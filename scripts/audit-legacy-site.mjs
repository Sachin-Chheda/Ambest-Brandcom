import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const base = "https://www.ambestbrandcom.in";
const sitemapNames = ["post-sitemap1.xml", "post-sitemap2.xml", "page-sitemap.xml"];
const decode = value => String(value || "")
  .replace(/<[^>]+>/g, " ")
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
  .replace(/&amp;/g, "&")
  .replace(/&quot;/g, '"')
  .replace(/&#039;|&apos;/g, "'")
  .replace(/&nbsp;/g, " ")
  .replace(/\s+/g, " ")
  .trim();
const csv = value => `"${String(value ?? "").replaceAll('"', '""')}"`;

const sitemapXml = await Promise.all(sitemapNames.map(async name => {
  const response = await fetch(`${base}/${name}`);
  if (!response.ok) throw new Error(`${name}: ${response.status}`);
  return response.text();
}));
const urls = [...new Set(sitemapXml.flatMap(xml => [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1])))];

function sectionFor(path) {
  if (path === "/") return "home";
  if (path.startsWith("/blog/")) return "insight";
  if (/thank-you/.test(path)) return "thank-you";
  if (/case-stud|\/social-case-study\//.test(path)) return "case-study";
  if (/video|film|drama|animation|podcast|photograph/.test(path)) return "video-production";
  if (/seo|search-growth/.test(path)) return "seo";
  if (/digital|social-media|marketplace|website/.test(path)) return "digital";
  if (/brand|logo|exhibition|event/.test(path)) return "brand-creative";
  return "other";
}

const rows = [];
let cursor = 0;
async function worker() {
  while (cursor < urls.length) {
    const url = urls[cursor++];
    const path = new URL(url).pathname;
    try {
      const response = await fetch(url, { redirect: "follow" });
      const html = await response.text();
      rows.push({
        url,
        path,
        section: sectionFor(path),
        status: response.status,
        title: decode(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]),
        description: decode(html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i)?.[1]),
        h1: decode(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]),
        canonical: html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)/i)?.[1] || "",
      });
    } catch (error) {
      rows.push({ url, path, section: sectionFor(path), status: "fetch-error", title: "", description: "", h1: "", canonical: String(error.message) });
    }
  }
}
await Promise.all(Array.from({ length: 8 }, () => worker()));
rows.sort((a, b) => a.url.localeCompare(b.url));

const header = ["url", "path", "section", "status", "title", "meta_description", "h1", "canonical"];
const body = rows.map(row => [row.url, row.path, row.section, row.status, row.title, row.description, row.h1, row.canonical].map(csv).join(","));
await writeFile(resolve(import.meta.dirname, "..", "docs", "legacy-page-audit.csv"), `${header.join(",")}\n${body.join("\n")}\n`, "utf8");

const counts = Object.entries(rows.reduce((result, row) => {
  result[row.section] = (result[row.section] || 0) + 1;
  return result;
}, {})).sort((a, b) => b[1] - a[1]);
const issues = {
  missingTitle: rows.filter(row => !row.title).length,
  missingDescription: rows.filter(row => !row.description).length,
  missingH1: rows.filter(row => !row.h1).length,
  non200: rows.filter(row => row.status !== 200).length,
};
const summary = `# Legacy .in sitemap audit\n\nGenerated from the three published XML sitemaps on ${new Date().toISOString().slice(0, 10)}. The inventory is evidence for migration and keyword planning; it is not a recommendation to reproduce every thin nested URL.\n\n- Published URLs audited: ${rows.length}\n- Missing titles: ${issues.missingTitle}\n- Missing meta descriptions: ${issues.missingDescription}\n- Missing H1 headings: ${issues.missingH1}\n- Non-200 or fetch errors: ${issues.non200}\n\n## Inventory by content family\n\n${counts.map(([section, count]) => `- ${section}: ${count}`).join("\n")}\n\n## Migration decision\n\nThe .com site should consolidate repeated benefit/process URLs into authoritative service pages, while preserving distinct user intents such as digital ad films, brand films, corporate communication, corporate films, brand anthems, micro-drama, AI video, testimonials, explainers, 2D animation, product video, social video, drone videography, commercial photography, video podcasts and short films.\n`;
await writeFile(resolve(import.meta.dirname, "..", "docs", "legacy-page-audit-summary.md"), summary, "utf8");
console.log(JSON.stringify({ urls: rows.length, counts: Object.fromEntries(counts), issues }));
