import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import "./generate-install-qr";

const root = join(import.meta.dir, "..");
const app = join(root, "apps/leonsilicon-expo");
const dist = join(root, "dist");

const exportWeb = Bun.spawn(
  ["bun", "x", "--no-install", "expo", "export", "--platform", "web", "--output-dir", dist],
  { cwd: app, stdout: "inherit", stderr: "inherit" },
);
const exitCode = await exportWeb.exited;
if (exitCode !== 0) process.exit(exitCode);

const pages = new Map([["index.html", "/"], ["install.html", "/install"]]);
const files = await readdir(dist, { withFileTypes: true, recursive: true });
const paths = files
  .filter((entry) => entry.isFile() && !entry.name.startsWith(".") && !["sw.js", "_headers"].includes(entry.name))
  .map((entry) => join(entry.parentPath.slice(dist.length + 1), entry.name))
  .filter((path) => !path.endsWith(".html") || pages.has(path))
  .sort();

for (const page of pages.keys()) {
  if (!paths.includes(page)) throw new Error(`Expo did not export ${page}`);
}

const hash = createHash("sha256");
const source = await readFile(join(import.meta.dir, "service-worker.js"), "utf8");
hash.update(source);
for (const path of paths) {
  hash.update(path);
  hash.update(await readFile(join(dist, path)));
}
const precache = paths.map((path) => pages.get(path) ?? `/${path}`);
const worker = source
  .replace("__CACHE_NAME__", JSON.stringify(`leon-site-${hash.digest("hex").slice(0, 16)}`))
  .replace("__PRECACHE_URLS__", JSON.stringify(precache));

await writeFile(join(dist, "sw.js"), worker);
