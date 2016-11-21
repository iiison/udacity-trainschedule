/**
 * @file service worker for root
 * @author @noahedwardhall
 * general pattern taken from: https://github.com/react-europe/www/blob/cfp/app/sw.js
 */

/* eslint-disable indent */

import Promised from 'bluebird';

 const CACHE_VERSION = 1;
 const CURRENT_CACHES = {
   app: `app-cache-v${CACHE_VERSION}`,
   prefetch: `prefetch-cache-v${CACHE_VERSION}`,
 };

// self = ServiceWorkerGlobalScope
self.addEventListener('install', (event) => {
  const urlsToPrefetch = [
    "/",
    // css files
    // font files
    // images
    // etc
  ];

  /**
   * prefetch all required urls before continuing
   */
  event.waitUntil(
    caches.open(CURRENT_CACHES.prefetch).then((cache) =>
      cache.addAll(urlsToPrefetch.map((prefetchThisUrl) =>
        new Request(prefetchThisUrl, { mode: 'no-cors' })
        // https://w3c.github.io/ServiceWorker/#cross-origin-resources
      ))
      .catch((addAllError) => console.error(`error in adding prefetch urls: ${addAllError}`))
      .then(() => console.info('All resources have been fetched and cached.'))
    )
    .catch((openError) => console.error(`opening cache failed: ${openError}`))
  );
});

self.addEventListener('activate', (event) => {
  const expectedCacheNames = Object.keys(CURRENT_CACHES).map((key) =>
    CURRENT_CACHES[key]
  );

  /**
   * Delete all caches that aren't named in CURRENT_CACHES.
   */
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promised.all(
        cacheNames.map((cacheName) =>
          expectedCacheNames.indexOf(cacheName) === -1 ?
            caches.delete(cacheName) :
            null
        )
      )
    )
  );
});

self.addEventListener('fetch', (event) => {
  // event api: https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent
  // event.request API https://developer.mozilla.org/en-US/docs/Web/API/Request

  const neverCacheUrls = [
    'bundle.js'
  ];

  event.respondWith(
    caches.match(event.request)
      .then((respOriginal) =>
        respOriginal || fetch(event.request)
          .then((respNew) =>
            caches.open(CURRENT_CACHES.app).then((cache) => {
              console.info(`updating cache with: ${JSON.stringify(event.request.url)}`);
              cache.put(event.request, respNew.clone());

              return respNew;
            })
          )
      )
      .catch((err) => {
        new Response(`<p>Hello from your friendly neighbourhood spider man!<br /><br/> Sorry our servers are out getting coffee: ${err}</p>`, {
          headers: { 'Content-Type': 'text/html' }
        });
      })
  );
});

self.addEventListener('sync', (event) => {
  console.log(`sync event: ${JSON.stringify(event)}`);
});

self.addEventListener('push', (event) => {
  console.log(`push event: ${JSON.stringify(event)}`);
});

self.addEventListener('message', (event) => {
  // event.data === whatever sent from Client.postMessage
  console.log(`message event: ${JSON.stringify(event)}`);
});
