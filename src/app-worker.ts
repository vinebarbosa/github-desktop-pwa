import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import {
  ExpirationPlugin,
  NetworkFirst,
  NetworkOnly,
  Serwist,
} from "serwist";
import { ROUTES } from "./modules/shared/routes";

export const PAGES_CACHE_NAME = {
  rscPrefetch: "pages-rsc-prefetch",
  rsc: "pages-rsc",
  html: "pages",
} as const;

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    ...defaultCache,
    {
      matcher: ({ sameOrigin, url: { pathname } }) =>
        sameOrigin && pathname.startsWith("/api/auth"),
      method: "GET",
      handler: new NetworkOnly(),
    },
    {
      matcher: ({ url: { pathname }, sameOrigin }) =>
        sameOrigin && !pathname.startsWith("/api/"),
      handler: new NetworkFirst({
        cacheName: "others",
        plugins: [
          new ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60,
          }),
        ],
      }),
    },
  ],
});

serwist.addEventListeners();

const urlsToPrecache = [
  ROUTES.followingUsers,
  ROUTES.profile,
  ROUTES.repositories,
  "/offline",
] as const;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("static-cache").then((cache) =>
      cache.addAll(urlsToPrecache as any)
    )
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.mode === "navigate") {
    console.log("passow aqui")
    event.respondWith(
      fetch(request)
        .then((response) => response)
        .catch(() =>
          caches.match("/offline").then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;

            return new Response("Offline fallback not available.", {
              status: 503,
              headers: { "Content-Type": "text/plain" },
            });
          })
        )
    );
  }
});
