import { pathToFileURL } from "node:url";
import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const entry = resolve(import.meta.dirname, "..", "dist", "server", "index.js");
const worker = (await import(pathToFileURL(entry))).default;
if (!worker || typeof worker.fetch !== "function") throw new Error("Worker must export a default fetch handler.");
const home = await worker.fetch(new Request("https://example.test/"), {}, {});
if (home.status !== 200 || !(home.headers.get("content-type") || "").includes("text/html")) throw new Error("Home route did not return HTML.");
const missing = await worker.fetch(new Request("https://example.test/not-a-real-route/"), {}, {});
if (missing.status !== 404) throw new Error("Unknown routes must return 404.");
const mediaDir = resolve(import.meta.dirname, "..", "dist", "public", "media");
if (!existsSync(mediaDir) || readdirSync(mediaDir).length < 19) throw new Error("Built media assets are incomplete.");
console.log("Artifact validation passed.");
