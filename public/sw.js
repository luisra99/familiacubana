import { clientsClaim } from "workbox-core";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import {
  StaleWhileRevalidate,
  CacheFirst,
  NetworkFirst,
} from "workbox-strategies";

self.addEventListener("activate", function (event) {
  const regex = new RegExp(`/\b(${version})\b/`);
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.map(function (key) {
          if (!regex.test(key)) return caches.delete(key);
        })
      );
    })
  );
});

self.__WB_MANIFEST;

const version = `v0.1${Date.now().toString()}`;
const coreID = version + "_core";
const imgID = version + "_assets";
const apiID = version + "_api";
precacheAndRoute(self.__WB_MANIFEST, {
  // Other options...
  maximumFileSizeToCacheInBytes: 100 * 1024 * 1024, // Set max file size to 10MB
});
self.skipWaiting();
clientsClaim();

registerRoute(
  /.*\.(png|jpg|jpeg|svg|gif|webp|css)/,
  new CacheFirst({
    cacheName: imgID,
  })
);

registerRoute(
  /.*\/gw\/.*/,
  new NetworkFirst({
    cacheName: apiID,
  })
);

registerRoute(
  /(?!.*index.*.js$).*\/.*/,
  new StaleWhileRevalidate({
    cacheName: coreID,
  })
);
