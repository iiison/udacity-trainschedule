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
import IdbKeyval from 'serviceworkers/idb/idb';
import * as consts from 'constants.js';

const db = new IdbKeyval('udacity', 'cache');

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
  event.waitUntil(new Promised((resolve, reject) => {
    const complete = urlsToPrefetch.map((prefetchThisUrl) =>
      fetch(new Request(prefetchThisUrl, { mode: 'no-cors' }))
        .then((resp) => {
          resp.blob()
            .then((blob) => {
              console.log(`blob is: ${blob.size}, ${blob.type}`);

              return db.set(prefetchThisUrl, blob);
            });
        })
    );
    if (complete.length)
      resolve(complete);
     else {
      console.error(`did not complete fetching: ${complete.length}`);
      reject();
    }
  })
    .catch((addAllError) => console.error(`error in adding prefetch urls: ${addAllError}`))
  );
});

self.addEventListener('fetch', (event) => {
  // event api: https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent
  // event.request API https://developer.mozilla.org/en-US/docs/Web/API/Request

  const neverCacheUrls = [
    // insert urls never to cache
    // wtf is up with this mime type?
    'http://fonts.googleapis.com/css?family=Muli|Eczar|Varela%20Round',
    // wtf is up with caching svgs ?
    'https://travis-ci.org/noahehall/udacity-trainschedule.svg?branch=master',
  ];

  if (neverCacheUrls.indexOf(event.request.clone().url) > -1) {
    console.log(`not caching: ${event.request.url} `);
    event.respondWith(fetch(event.request));
  } else event.respondWith(new Promised((resolve, reject) => {
    db.get(event.request.url).then((blobFound) => {
      if (!blobFound) {
        console.info(`content fot found in DB, requesting from the matrix`);

        return fetch(event.request.clone())
          .then((response) => {
            // only cache valid responses
            if (!response) {
              console.error(`received invalid response from fetch: ${response}`);

              return reject(response);
            }

            // insert response body in db
            response.clone().blob().then(
              (blob) => {
                console.info(`updating cache with: ${JSON.stringify(event.request.clone().url)}, then returning`);
                db.set(
                  event.request.url,
                  blob
                ).then(
                  (suc2) => console.log(`success in setting: ${suc2}`),
                  (err2) => console.error(`error in setting: ${err2}`)
                );
              }
            );

            return resolve(response);
          });
      }

      const contentType = consts.getBlobType(blobFound, event.request.url);
      console.log('responding from cache', event.request.url, contentType, blobFound.size);
      // on this page https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
      const myHeaders = {
        "Content-Length": String(blobFound.size),
        "Content-Type": contentType,
        "X-Custom-type": "Provided by Serviceworker",
      };

      const init = {
        'content-type': 'text/html; charset=utf-8',
        'headers': myHeaders,
        'status' : 200,
        'statusText' : 'OKS',
      };
      const response = new Response(blobFound, init);

      return resolve(response);
    });
  }));
});

/*
self.addEventListener('activate', (event) => {
  const expectedCacheNames = Object.keys(CURRENT_CACHES).map((key) =>
    CURRENT_CACHES[key]
  );

  /**
   * Delete all caches that aren't named in CURRENT_CACHES.
   *
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
*/

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
