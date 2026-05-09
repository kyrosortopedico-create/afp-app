const CACHE_NAME = "afp-cache-v2";

const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icono.png"
];

// INSTALACIÓN
self.addEventListener("install", event => {

  self.skipWaiting();

  event.waitUntil(

    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })

  );

});

// ACTIVACIÓN
self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys().then(keys => {

      return Promise.all(

        keys.map(key => {

          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }

        })

      );

    })

  );

  self.clients.claim();

});

// FETCH
self.addEventListener("fetch", event => {

  // SOLO GET
  if (event.request.method !== "GET") return;

  event.respondWith(

    fetch(event.request)

      .then(response => {

        const responseClone = response.clone();

        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseClone);
          });

        return response;

      })

      .catch(() => {

        return caches.match(event.request);

      })

  );

});