/**
 * @file service worker for root
 * @author @noahedwardhall
 * general pattern taken from: https://github.com/react-europe/www/blob/cfp/app/sw.js
 * good readme: https://developers.google.com/web/fundamentals/getting-started/primers/service-workers
 * good tuts: https://jakearchibald.github.io/isserviceworkerready/resources.html
 * good Q&A: http://stackoverflow.com/questions/tagged/service-worker
 * see all service workers: chrome://serviceworker-internals
 */

/* eslint-disable indent */

import Promised from 'bluebird';
import IdbKeyval from './idb/idb';
import * as consts from 'constants.js';

const CURRENT_CACHES = {
 app: `app-cache-v${consts.CACHE_VERSION}`,
 prefetch: `prefetch-cache-v${consts.CACHE_VERSION}`,
};

const db = new IdbKeyval('udacity', 'cache');
console.log(db.dbPromise.then(
  (suc) => console.info(`success in creating: ${suc.length}`),
  (err) => console.error(`error in creating: ${err}`)
));

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
   * all prefetch urls are required or installation will fail
   */
  event.waitUntil(
    caches.open(CURRENT_CACHES.prefetch).then((cache) =>
      cache.addAll(urlsToPrefetch.map((prefetchThisUrl) => {
        // set initialvalue
        console.log('setting prefetch');
        fetch(new Request(prefetchThisUrl, { mode: 'no-cors' }))
          .then((resp) => {
            resp.text()
              .then((text) => {
                console.log(`text is: ${text.length}`);
                db.set(
                  prefetchThisUrl,
                  text
                );
              });
          });

        return new Request(prefetchThisUrl, { mode: 'no-cors' });
        // https://w3c.github.io/ServiceWorker/#cross-origin-resources
      }))
      .catch((addAllError) => console.error(`error in adding prefetch urls: ${addAllError}`))
      .then(() => console.info('All resources have been fetched and cached.'))
    )
    .catch((openError) => console.error(`opening cache failed: ${openError}`))
  );
});

self.addEventListener('fetch', (event) => {
  // event api: https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent
  // event.request API https://developer.mozilla.org/en-US/docs/Web/API/Request

  const neverCacheUrls = [
    // insert urls never to cache
    "http://fonts.googleapis.com/css?family=Muli|Eczar|Varela%20Round",
    "http://fonts.gstatic.com/s/varelaround/v7/APH4jr0uSos5wiut5cpjrhampu5_7CjHW5spxoeN3Vs.woff2",
    "http://fonts.gstatic.com/s/muli/v9/zscZFkjVRGyfQ_Pw-5exXPesZW2xOQ-xsNqO47m55DA.woff2"
  ];

  if (neverCacheUrls.indexOf(event.request.clone().url) > -1) {
    console.log(`not caching: ${event.request.url} `);
    event.respondWith(fetch(event.request));
  } else
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            console.log('responding with item from cache');

            console.log(db.get(event.request.url).then(
              (suc) => console.info(`item in db: ${typeof suc}`),
              (err) => console.info(`err in db: ${err}`)
            ));

            return response;
          }

          return fetch(event.request.clone())
            .then((responseTwo) => {
              // only cache valid responses
              if (!responseTwo) {
                console.error(`received invalid response from fetch: ${responseTwo}`);

                return responseTwo;
              }

              caches.open(CURRENT_CACHES.app).then((cache) => {
                responseTwo.clone().text().then(
                  (text) => {
                    console.log(`text in setting: ${text.length}`);
                    db.set(
                      event.request.url,
                      text
                    ).then(
                      (suc) => console.log(`success in setting`),
                      (err) => console.error(`error in setting: ${err}`)
                    );
                  }
                )

                console.info(`updating cache with: ${JSON.stringify(event.request.clone().url)}, then returning`);
                cache.put(event.request.clone(), responseTwo.clone());

                // set value in store
              });

              return responseTwo.clone();
            })
            .catch((err) => console.err(`error in fetch: ${err}`));
        })
        .catch((err) => {
          new Response(`<p>Hello from your friendly neighbourhood spider man!<br /><br/> Sorry our servers are out getting coffee: ${err}</p>`, {
            headers: { 'Content-Type': 'text/html' }
          });
        })
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
