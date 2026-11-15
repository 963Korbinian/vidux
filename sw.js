/* VIDUX · Service Worker
   Die Huelle wird einmal gespeichert und danach IMMER aus dem Speicher
   bedient. Der Laden kann die App im Stromausfall oeffnen, ohne Netz, ohne
   Wartezeit. Neue Fassungen holt er sich im Hintergrund. */
const CACHE = "vidux-b9a5f4c1";
const SHELL = ["./", "index.html", "fonts.css", "manifest.webmanifest", "icon-192.png", "icon-512.png", "icon-maskable.png", "fonts/inter-300-latin-ext.woff2", "fonts/inter-300-latin.woff2", "fonts/inter-400-latin-ext.woff2", "fonts/inter-400-latin.woff2", "fonts/inter-500-latin-ext.woff2", "fonts/inter-500-latin.woff2", "fonts/inter-600-latin-ext.woff2", "fonts/inter-600-latin.woff2", "fonts/inter-700-latin-ext.woff2", "fonts/inter-700-latin.woff2", "fonts/inter-800-latin-ext.woff2", "fonts/inter-800-latin.woff2", "fonts/inter-900-latin-ext.woff2", "fonts/inter-900-latin.woff2", "fonts/jetbrains-mono-400-latin-ext.woff2", "fonts/jetbrains-mono-400-latin.woff2", "fonts/jetbrains-mono-500-latin-ext.woff2", "fonts/jetbrains-mono-500-latin.woff2", "fonts/jetbrains-mono-600-latin-ext.woff2", "fonts/jetbrains-mono-600-latin.woff2", "fonts/jetbrains-mono-700-latin-ext.woff2", "fonts/jetbrains-mono-700-latin.woff2", "fonts/jetbrains-mono-800-latin-ext.woff2", "fonts/jetbrains-mono-800-latin.woff2", "fonts/noto-sans-sinhala-400.woff2", "fonts/noto-sans-sinhala-500.woff2", "fonts/noto-sans-sinhala-700.woff2", "fonts/noto-sans-tamil-400.woff2", "fonts/noto-sans-tamil-500.woff2", "fonts/noto-sans-tamil-700.woff2"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if(req.method !== "GET") return;
  const url = new URL(req.url);
  if(url.origin !== self.location.origin) return;   /* wa.me und Co. nie abfangen */
  e.respondWith(
    caches.match(req, {ignoreSearch:true}).then(hit => {
      /* zuerst aus dem Speicher, dann still im Hintergrund auffrischen */
      const net = fetch(req).then(res => {
        if(res && res.ok) caches.open(CACHE).then(c => c.put(req, res.clone()));
        return res;
      }).catch(() => hit || caches.match("index.html"));
      return hit || net;
    })
  );
});
