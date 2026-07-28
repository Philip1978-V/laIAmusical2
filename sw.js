// Service Worker básico para La IA Musical - Storycards
// Permite funcionamiento offline mínimo y cumple los requisitos de PWA Builder

const CACHE_NAME = "laiamusical-storycards-v1";
const OFFLINE_URLS = [
  "./",
  "./index.html",
  "./manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(OFFLINE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request).catch(() => {
          // Si falla la red y no hay caché, devuelve la portada como respaldo
          return caches.match("./index.html");
        })
      );
    })
  );
});
