import { readFile, writeFile } from "node:fs/promises";

const source = new URL("../worker/ambest-logo-header.png", import.meta.url);
const target = new URL("../worker/logo-data.js", import.meta.url);
const base64 = (await readFile(source)).toString("base64");
await writeFile(target, `export const headerLogo = "data:image/png;base64,${base64}";\n`);
console.log(`Embedded header logo (${base64.length} base64 characters).`);
