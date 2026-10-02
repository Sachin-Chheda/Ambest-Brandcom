import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = new URL("../public/media/", import.meta.url);
const source = "https://www.ambestbrandcom.in/wp-content/uploads/";
const assets = [
  ["gallery-purobien-commerce.webp", "2025/11/PN4.webp"],
  ["gallery-purobien-content.jpg", "2025/11/PN10.jpg"],
  ["gallery-shreeji-identity.png", "2025/12/SH-5.png"],
  ["gallery-shreeji-website.png", "2025/12/Shreeji-mockup.png"],
  ["gallery-bhoomi-stationery.png", "2025/12/Stationery-bhoomi.png"],
  ["gallery-bhoomi-social.png", "2025/12/post-bhoomi1.png"],
  ["gallery-bryan-packaging.png", "2025/12/BC-2.png"],
  ["gallery-bryan-campaign.png", "2025/12/BC-mockup.png"],
  ["gallery-amyn-web.png", "2025/12/DrR2-2.png"],
  ["gallery-amyn-content.png", "2025/12/DrR3-2.png"],
  ["gallery-recons-technical.png", "2025/12/RG8-2.png"],
  ["gallery-sigma-project.png", "2025/12/sigma-building-img.png"],
  ["gallery-sigma-web.png", "2025/12/sigma-laptop-img.png"],
  ["gallery-red-product.png", "2025/12/rm-hand.png"],
  ["gallery-red-web.png", "2025/12/rm-laptop.png"],
  ["gallery-aarya-packaging.png", "2025/11/A2-2-.png"],
  ["gallery-aarya-commerce.png", "2025/11/A3-2-.png"],
  ["gallery-timex-catalogue.png", "2025/12/TI3.png"],
  ["gallery-timex-interior.png", "2025/12/TI4.png"],
  ["gallery-ad-brand-story.webp", "2026/04/Brand-storytelling-films-scaled.webp"],
  ["gallery-ad-product-launch.webp", "2026/04/Product-and-launch-films-scaled.webp"],
  ["gallery-brand-communication.jpg", "2025/10/Brand-Communication.jpg"],
  ["gallery-events-stage.jpg", "2025/11/8Event-scaled.jpg"],
  ["gallery-events-space.jpg", "2025/11/2Event-scaled.jpg"],
  ["gallery-film-medtech.webp", "2026/01/MedTech-Experience-Centre-Film.webp"],
  ["gallery-anthem-story.webp", "2026/08/Beyond-Video-Production-Brand-Anthem-page.webp"],
  ["gallery-anthem-music.webp", "2026/08/Original-Music-Composition.webp"],
  ["gallery-product-demo.webp", "2026/06/Product-Demonstration-Videos.webp"],
  ["gallery-product-launch.webp", "2026/06/Product-Launch-Videos.webp"],
  ["gallery-drone-flight.webp", "2026/07/Professional-Drone-Videography.webp"],
  ["gallery-micro-drama.webp", "2026/07/micro-drama.webp"],
  ["gallery-video-podcast.webp", "2026/07/Video-Podcast.webp"],
  ["gallery-internal-workspace.jpg", "2025/10/IT-Corporate-Workspaces-New-Images.jpg"],
  ["gallery-internal-manufacturing.jpg", "2025/10/Manufacturing-Units-RD-Centers-New-Images.jpg"],
];

for (const [name, path] of assets) {
  const response = await fetch(source + path);
  if (!response.ok || !response.headers.get("content-type")?.startsWith("image/")) throw new Error(`${path}: ${response.status} ${response.headers.get("content-type")}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (!bytes.length || bytes.length > 8_000_000) throw new Error(`${path}: unexpected size ${bytes.length}`);
  if (process.argv.includes("--download")) await writeFile(fileURLToPath(new URL(name, root)), bytes);
  console.log(`${name}\t${(bytes.length / 1024).toFixed(0)} KB\t${source + path}`);
}

const videoPath = "2025/12/bhoomi-reel-video1.mp4";
const videoResponse = await fetch(source + videoPath);
if (!videoResponse.ok || !videoResponse.headers.get("content-type")?.startsWith("video/mp4")) throw new Error(`${videoPath}: invalid video response`);
const videoBytes = Buffer.from(await videoResponse.arrayBuffer());
if (!videoBytes.length || videoBytes.length > 5_000_000) throw new Error(`${videoPath}: unexpected size ${videoBytes.length}`);
if (process.argv.includes("--download")) await writeFile(fileURLToPath(new URL("gallery-bhoomi-reel.mp4", root)), videoBytes);
console.log(`gallery-bhoomi-reel.mp4\t${(videoBytes.length / 1024).toFixed(0)} KB\t${source + videoPath}`);
