// Read-only page-level SEO and content inventory for the public Worker render.
import worker from "../worker/index.js";

const env = { PUBLIC_SITE: "true" };
const base = "https://www.ambestbrandcom.com";
const sitemap = await (await worker.fetch(new Request(`${base}/sitemap.xml`), env, {})).text();
const paths = [...sitemap.matchAll(/<loc>https:\/\/www\.ambestbrandcom\.com([^<]+)<\/loc>/g)].map(match => match[1]);
const unescape = value => value?.replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'") || "";
const inventory = [];
for (const path of paths) {
  const response = await worker.fetch(new Request(`${base}${path}`), env, {});
  const html = await response.text();
  const main = html.match(/<main id="main">([\s\S]*?)<\/main>/)?.[1] || "";
  const bodyText = main.replace(/<script[\s\S]*?<\/script>/g," ").replace(/<style[\s\S]*?<\/style>/g," ").replace(/<[^>]+>/g," ").replace(/&[a-zA-Z#0-9]+;/g," ").replace(/\s+/g," ").trim();
  const title = unescape(html.match(/<title>(.*?)<\/title>/)?.[1]);
  const description = unescape(html.match(/<meta name="description" content="([^"]*)">/)?.[1]);
  const headings = [...main.matchAll(/<h1(?:\s[^>]*)?>([\s\S]*?)<\/h1>/g)].map(match => unescape(match[1].replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim()));
  const images = [...main.matchAll(/<img\b[^>]*>/g)].map(match => match[0]);
  const missingAlt = images.filter(image => !/\balt="[^"]*"/.test(image)).length;
  const internalLinks = [...main.matchAll(/href="(\/[^"#?]*)/g)].map(match => match[1]);
  inventory.push({path,status:response.status,title,description,h1:headings,words:bodyText.split(/\s+/).length,images:images.length,missingAlt,internalLinks:internalLinks.length});
}
const repeats = field => Object.entries(Object.groupBy(inventory.filter(page => page[field]), page => page[field])).filter(([,items]) => items.length > 1).map(([value,items]) => ({value,paths:items.map(item => item.path)}));
const problems = inventory.flatMap(page => [
  ...(page.status !== 200 ? [`${page.path}: HTTP ${page.status}`] : []),
  ...(page.h1.length !== 1 ? [`${page.path}: ${page.h1.length} H1 headings`] : []),
  ...(!page.description ? [`${page.path}: missing meta description`] : []),
  ...(page.missingAlt ? [`${page.path}: ${page.missingAlt} images without alt`] : []),
  ...(page.internalLinks === 0 ? [`${page.path}: no internal content links`] : []),
]);
console.log(JSON.stringify({pages:inventory.length,problemCount:problems.length,problems,duplicateTitles:repeats("title"),duplicateDescriptions:repeats("description"),inventory},null,2));
