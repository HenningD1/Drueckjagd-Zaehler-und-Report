/* Offline-Speicher der Drückjagd-App.
   Bei jeder neuen Version VERSION hochzählen, dann lädt das iPhone die neuen Dateien. */
const VERSION = 'drueckjagd-v2';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon-192.png', './icon-512.png'];
const EXTERN = ['https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    await cache.addAll(CORE);
    for (const url of EXTERN) {
      try { const res = await fetch(url, { mode: 'cors' }); if (res.ok) await cache.put(url, res); } catch (e) { /* wird beim nächsten Start nachgeholt */ }
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) if (key !== VERSION) await caches.delete(key);
    await self.clients.claim();
  })());
});

/* Erst aus dem Speicher antworten, im Hintergrund aktualisieren.
   So startet die App im Wald sofort, auch bei schwachem oder fehlendem Netz. */
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  event.respondWith((async () => {
    const cache = await caches.open(VERSION);
    const isPage = req.mode === 'navigate';
    const hit = isPage
      ? (await cache.match(req, { ignoreSearch: true })) || (await cache.match('./index.html')) || (await cache.match('./'))
      : await cache.match(req);
    const fresh = fetch(req).then(res => {
      if (res && (res.ok || res.type === 'opaque')) {
        cache.put(req, res.clone());
        if (isPage) cache.put('./index.html', res.clone());
      }
      return res;
    }).catch(() => null);
    if (hit) { event.waitUntil(fresh); return hit; }
    return (await fresh) || new Response('Offline und noch nicht gespeichert. Öffne die App einmal mit Netz.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  })());
});
