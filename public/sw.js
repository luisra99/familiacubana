import { clientsClaim } from "workbox-core";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute, setCatchHandler } from "workbox-routing";
import {
  StaleWhileRevalidate,
  CacheFirst,
  NetworkFirst,
} from "workbox-strategies";

self.__WB_MANIFEST;

const version = `v4.12.2023.2${import.meta.env.ENV_SERVER_URL}`;
const coreID = version + "_core";
const pageID = version + "_pages";
const imgID = version + "_assets";
const apiID = version + "_api";
const cacheIDs = [coreID, pageID, imgID, apiID];

// Precache the offline page
precacheAndRoute(
  self.__WB_MANIFEST.concat([{ url: "/offline.html", revision: null }])
);
self.skipWaiting();
clientsClaim();

// Clear outdated caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) => !cacheIDs.includes(key) && !/\b(workbox)\b/.test(key)
            )
            .map((key) => caches.delete(key))
        )
      )
  );
});

// Image and assets cache
registerRoute(
  /.*\.(png|jpg|jpeg|svg|gif|webp|css)/,
  new CacheFirst({
    cacheName: imgID,
  })
);

// Profile route cache with data validation
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
              const cache = await caches.open("dataa-cache");
              await cache.put(
                request,
                new Response(JSON.stringify(updatedData))
              );
            }
          }
          return response;
        },
      },
    ],
  })
);

// API caching
registerRoute(
  /.*\/apim\/.*/,
  new CacheFirst({
    cacheName: apiID,
    expiration: {
      maxAgeSeconds: 3000,
    },
  })
);

registerRoute(
  /.*\/gw\/.*/,
  new NetworkFirst({
    cacheName: apiID,
  })
);

// Core resources cache
registerRoute(
  /(?!.*index.*.js$).*\/.*/,
  new StaleWhileRevalidate({
    cacheName: coreID,
  })
);

// Catch handler for errors
setCatchHandler(async ({ event }) => {
  if (event.request.destination === "document") {
    // Return the offline page for navigation requests
    return caches.match("/offline.html");
  } else if (
    event.request.destination === "script" ||
    event.request.destination === "style"
  ) {
    // Optionally return a placeholder response for scripts or styles
    return new Response(null, {
      status: 503,
      statusText: "Service Unavailable",
    });
  } else {
    // For other types (like APIs), return a generic error response
    return new Response(
      JSON.stringify({ message: "Fallo conectándose con el servidor." }),
      {
        headers: { "Content-Type": "application/json" },
        status: 503,
      }
    );
  }
});
