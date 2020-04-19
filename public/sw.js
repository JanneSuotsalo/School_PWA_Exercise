"use strict";
self.importScripts("./js/example.js");
const cacheName = "PWA-chargemap";

const filesToCache = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/example.js",
  "./img/icon.png",
  "./img/logo.svg",
  "./img/splash.png",
  "./modules/@fortawesome/fontawesome-free/css/all.min.css",
  "./modules/leaflet/dist/leaflet.css",
  "./modules/esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css",
  "./modules/leaflet/dist/leaflet.js",
  "./modules/esri-leaflet/dist/esri-leaflet.js",
  "./modules/esri-leaflet-geocoder/dist/esri-leaflet-geocoder.js",
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
