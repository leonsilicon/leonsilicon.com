const cacheName = __CACHE_NAME__;
const precache = __PRECACHE_URLS__;
const assets = new Set(precache);
const pages = new Map([
  ["/", "/"],
  ["/index.html", "/"],
  ["/install", "/install"],
  ["/install/", "/install"],
  ["/install.html", "/install"],
]);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) =>
      cache.addAll(precache.map((path) => new Request(path, { cache: "reload" }))),
    ),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter((key) => key.startsWith("leon-site-") && key !== cacheName)
      .map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    const page = pages.get(url.pathname);
    if (!page) return;
    event.respondWith(fetch(request).catch(async () =>
      (await (await caches.open(cacheName)).match(page)) ?? Response.error(),
    ));
  } else if (assets.has(url.pathname)) {
    event.respondWith((async () => {
      const cache = await caches.open(cacheName);
      return (await cache.match(url.pathname)) ?? fetch(request);
    })());
  }
});
