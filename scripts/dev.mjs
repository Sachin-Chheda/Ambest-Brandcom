import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve } from "node:path";
import worker from "../worker/index.js";

const port = Number(process.env.PORT || 4173);
const publicRoot = resolve(import.meta.dirname, "..", "public");
const contentTypes = {".jpg":"image/jpeg",".jpeg":"image/jpeg",".png":"image/png",".svg":"image/svg+xml",".webp":"image/webp",".mp4":"video/mp4"};
const assets = {
  async fetch(request) {
    const pathname = decodeURIComponent(new URL(request.url).pathname);
    const file = resolve(publicRoot, `.${pathname}`);
    if (!file.startsWith(`${publicRoot}\\`) && file !== publicRoot) return new Response("Not found", {status:404});
    try {
      const data = await readFile(file);
      return new Response(request.method === "HEAD" ? null : data, {headers:{"content-type":contentTypes[extname(file).toLowerCase()] || "application/octet-stream","cache-control":"public,max-age=86400"}});
    } catch {
      return new Response("Not found", {status:404});
    }
  },
};
const server = http.createServer(async (req, res) => {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const body = chunks.length ? Buffer.concat(chunks) : undefined;
  const request = new Request(`http://127.0.0.1:${port}${req.url}`, {
    method: req.method,
    headers: req.headers,
    body: ["GET", "HEAD"].includes(req.method || "GET") ? undefined : body,
  });
  const response = await worker.fetch(request, {ASSETS:assets}, {});
  res.statusCode = response.status;
  response.headers.forEach((value, key) => res.setHeader(key, value));
  if (req.method === "HEAD") return res.end();
  res.end(Buffer.from(await response.arrayBuffer()));
});
server.listen(port, "127.0.0.1", () => console.log(`Local: http://127.0.0.1:${port}`));
