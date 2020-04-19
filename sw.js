"use strict";
const cacheName = "hello-pwa";
const filesToCache = [
  "./",
  "./index.html",
  "./favicon.ico",
  "./css/style.css",
  "./js/main.js",
  "./images/Untitled.jpg",
  "./acme-v9-latin/acme-v9-latin-regular.eot",
  "./acme-v9-latin/acme-v9-latin-regular.svg",
  "./acme-v9-latin/acme-v9-latin-regular.ttf",
  "./acme-v9-latin/acme-v9-latin-regular.woff",
  "./acme-v9-latin/acme-v9-latin-regular.woff2",
];

/* Start the service worker and cache all of the app's content */
self.addEventListener("install", (e) => {
  e.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(cacheName);
        // console.log(cache);
        return cache.addAll(filesToCache);
      } catch (e) {
        console.log("after install", e.message);
      }
    })()
  );
});

/* Serve cached content when offline */
self.addEventListener("fetch", (e) => {
  // console.log(e.request);
  e.respondWith(
    (async () => {
      try {
        const response = await caches.match(e.request);
        // console.log('resp', response);
        return response || fetch(e.request);
      } catch (e) {
        console.log("load cache", e.message);
      }
    })()
  );
});
