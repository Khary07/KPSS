const CACHE_NAME = "artemiah-gunceleri-v2";
const urlsToCache = [
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./bg/1.jpg", "./bg/2.jpg", "./bg/3.jpg", "./bg/4.jpg", "./bg/5.jpg",
  "./bg/6.jpg", "./bg/7.jpg", "./bg/8.jpg", "./bg/9.jpg", "./bg/10.jpg",
  "./bg/11.jpg", "./bg/12.jpg", "./bg/13.jpg", "./bg/14.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
