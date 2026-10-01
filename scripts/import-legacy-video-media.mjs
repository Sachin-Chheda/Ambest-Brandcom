import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const legacy = "https://www.ambestbrandcom.in/wp-content/uploads";
const assets = [
  ["service-digital-ad.webp", `${legacy}/2026/01/Mouni-Roy-%E2%80%93-Bryan-Candy-Body-Wash-Ad.webp`],
  ["service-brand-film.webp", `${legacy}/2026/01/MedTech-Experience-Centre-Film.webp`],
  ["service-corporate-film.webp", `${legacy}/2026/01/Global-Capability-Centre-Launch-Film.jpg.webp`],
  ["service-corporate-communication.webp", `${legacy}/2026/07/Strategic-Discovery-Alignment.webp`],
  ["service-brand-anthem.webp", `${legacy}/2026/08/Beyond-Video-Production-Brand-Anthem-page.webp`],
  ["service-micro-drama.webp", `${legacy}/2026/07/Creative-Strategy.webp`],
  ["service-ai-video.webp", `${legacy}/2026/06/Industries-Using-AI-Video-Production.webp`],
  ["service-testimonial.webp", `${legacy}/2026/07/Customer-Testimonial-Videos.webp`],
  ["service-explainer.webp", `${legacy}/2026/07/Product-Explainer-Videos.webp`],
  ["service-2d-animation.webp", `${legacy}/2026/07/Illustration-Design.webp`],
  ["service-product-video.webp", `${legacy}/2026/06/Product-Demonstration-Videos.webp`],
  ["service-social-video.webp", `${legacy}/2026/01/Mouni-Roy-%E2%80%93-Bryan-Candy-Body-Wash-Ad.webp`],
  ["service-drone.webp", `${legacy}/2026/07/Professional-Drone-Videography.webp`],
  ["service-photography.webp", `${legacy}/2026/07/Professional-Photoshoot.webp`],
  ["service-video-podcast.webp", `${legacy}/2026/07/Branded-Video-Podcast-Production.webp`],
  ["service-short-film.webp", `${legacy}/2026/07/Branded-Short-Films.webp`],
  ["brand-strategy.jpg", `${legacy}/2025/10/Brand-Strategy-1.jpg`],
  ["brand-logo-design.jpg", `${legacy}/2025/11/Initial-Consultation-scaled-uai-2560x1097.jpg`],
  ["brand-internal-space.jpg", `${legacy}/2025/10/Facility-Factory-Branding-New-1-scaled.jpg`],
  ["brand-events.jpg", `${legacy}/2025/11/7Event-scaled.jpg`],
];

const posters = [
  ["poster-digital-ad.jpg", "Ohj3Uh9IEjo"],
  ["poster-brand-film.jpg", "k6pT2-H-YjU"],
  ["poster-corporate-film.jpg", "AmWmXZFY9kw"],
  ["poster-corporate-communication.jpg", "05D6fky6tU4"],
  ["poster-brand-anthem.jpg", "G8YYucmws7s"],
  ["poster-micro-drama.jpg", "ZezQ6XcavuA"],
  ["poster-ai-video.jpg", "sNsCuniNPjg"],
  ["poster-testimonial.jpg", "ad3GwW_mQhc"],
  ["poster-explainer.jpg", "6cLBPHIERrc"],
  ["poster-2d-animation.jpg", "s5Qskk4fpqQ"],
  ["poster-product-video.jpg", "Ohj3Uh9IEjo"],
  ["poster-social-video.jpg", "u6JHB1t2Kzs"],
  ["poster-drone.jpg", "7h1w8TwUUoo"],
  ["poster-photography.jpg", "jC1MGmY9tfo"],
  ["poster-video-podcast.jpg", "qWIsgPHeJDw"],
  ["poster-short-film.jpg", "3V5f5QvD-iE"],
].map(([name, id]) => [name, `https://i.ytimg.com/vi/${id}/hqdefault.jpg`]);

const output = resolve(import.meta.dirname, "..", "public", "media");
await mkdir(output, { recursive: true });

for (const [name, url] of [...assets, ...posters]) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} while importing ${url}`);
  const body = new Uint8Array(await response.arrayBuffer());
  if (body.byteLength < 2_000) throw new Error(`Imported file is unexpectedly small: ${name}`);
  await writeFile(resolve(output, name), body);
  console.log(`${name}\t${body.byteLength}`);
}
