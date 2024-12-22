self.addEventListener('activate', function (event) {
  event.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (key) {
      return !cacheIDs.includes(key);
		}).map(function (key) {
      if(!/\b(workbox)\b/.test(key))
      return caches.delete(key);
		}));
	}));
});

import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from 'workbox-strategies';

self.__WB_MANIFEST;

const version = `v4.12.2023.2${import.meta.env.ENV_SERVER_URL}`;
const coreID = version + '_core';
const pageID = version + '_pages';
const imgID = version + '_assets';
const apiID = version + '_api';
const cacheIDs = [coreID, pageID, imgID,apiID];

precacheAndRoute(self.__WB_MANIFEST);
self.skipWaiting();
clientsClaim();

registerRoute(
  /.*\.(png|jpg|jpeg|svg|gif|webp|css)/,
  new CacheFirst({
    cacheName: imgID,
  }),
);

registerRoute(
  /\/profile/,
  new CacheFirst({
    cacheName: pageID,
    plugins: [
      {
        cacheWillUpdate: async ({ request, response }) => {
          if (response) {
            const data = await response.json();
            const currentDate = new Date().toLocaleDateString();
            if (data.date !== currentDate) {
              const updatedResponse = await fetch(request);
              const updatedData = await updatedResponse.json();
              const cache = await caches.open('dataa-cache');
              await cache.put(request, new Response(JSON.stringify(updatedData)));
            }
          }
          return response;
        },
      },
    ],
  }),
);

registerRoute(
  /.*\/apim\/.*/,
  new CacheFirst({
    cacheName: apiID,
    expiration: {
      maxAgeSeconds: 3000,
    },
  }),
);

registerRoute(
  /.*\/gw\/.*/,
  new NetworkFirst({
    cacheName: apiID,
  }),
);

registerRoute(
  /(?!.*index.*.js$).*\/.*/,
  new StaleWhileRevalidate({
    cacheName: coreID,
  }),
);
