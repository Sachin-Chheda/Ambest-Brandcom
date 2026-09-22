import { cpSync, mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");
rmSync(dist, { recursive: true, force: true });
mkdirSync(resolve(dist, "server"), { recursive: true });
mkdirSync(resolve(dist, ".openai"), { recursive: true });
for (const file of ["index.js", "content.js", "generated-pages.js", "logo-data.js"]) {
  cpSync(resolve(root, "worker", file), resolve(dist, "server", file));
}
cpSync(resolve(root, ".openai", "hosting.json"), resolve(dist, ".openai", "hosting.json"));
console.log(`Built ${dist}`);
