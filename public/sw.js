/* Worth Fighting For — service worker.
 * Intentionally conservative: it makes the app installable and speeds up
 * repeat loads of hashed static assets, without ever caching navigations,
 * API calls, or cross-origin requests (so auth/live data stay fresh).
 */
const CACHE = "wff-static-v1";

self.addEventListener("install", () => {
  // Activate this SW as soon as it's installed.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Drop caches from older versions, then take control of open pages.
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  // Only touch our own origin — never the API, sockets, or third parties.
  if (url.origin !== self.location.origin) return;

  // Cache-first for immutable build assets and bundled images only.
  const isStatic =
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/assets/") ||
    url.pathname.startsWith("/icons/");
  if (!isStatic) return;

  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(request);
      if (cached) return cached;
      const response = await fetch(request);
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
  );
});
