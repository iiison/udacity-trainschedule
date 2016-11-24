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
require('../.globals');
import Promised from 'bluebird';
import Idbstore from 'serviceworkers/idb/idb';

const db = new Idbstore('udacity', 'cache');
db.dbPromise.then(
  () => {
    appFuncs.consoleThis(db, 'dir');
    if (db.success) appFuncs.consoleThis(`db instantiated successfully: ${db.success}`);
    else appFuncs.consoleThis('db did not successfully instantiate', 'error');
  },
  (bad) => {
    appFuncs.consoleThis(bad, 'dir', true);
    appFuncs.consoleThis('db rejected on instantiation', 'error');
  }
);

// self = ServiceWorkerGlobalScope
self.addEventListener('install', (event) => {
  const urlsToPrefetch = [
    "/",
  ];

  /**
   * all prefetch urls are required or installation will fail
   */
  event.waitUntil(new Promised((resolve, reject) => {
    const complete = urlsToPrefetch.map((prefetchThisUrl) =>
      fetch(new Request(prefetchThisUrl, { mode: 'no-cors' }))
        .then((resp) =>
          resp.blob()
            .then((blob) => {
              appFuncs.consoleThis(`blob is: ${blob.size}, ${blob.type}`, 'info');

              return db.set(prefetchThisUrl, blob);
            })
        )
    );

    if (complete.length)
      resolve(complete);
    else {
      appFuncs.consoleThis(`did not complete fetching: ${complete.length}`, 'error');
      reject();
    }
  })
    .catch((addAllError) => appFuncs.consoleThis(`error in adding prefetch urls: ${addAllError}`, 'error'))
  );
});

/**
 * event api: https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent
 * event.request API https://developer.mozilla.org/en-US/docs/Web/API/Request
 * headers https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 */
self.addEventListener('fetch', (event) => {
  const neverCacheUrls = [
    // wtf is up with this mime type?
    'http://fonts.googleapis.com/css?family=Muli|Eczar|Varela%20Round',
    // wtf is up with caching svgs ?
    'https://travis-ci.org/noahehall/udacity-trainschedule.svg?branch=master',
    'https://api.travis-ci.org/noahehall/udacity-trainschedule.svg?branch=master',
  ];

  if (neverCacheUrls.indexOf(event.request.clone().url) > -1) {
    appFuncs.consoleThis(`not caching: ${event.request.url} `);

    return event.respondWith(fetch(event.request));
  }

  return event.respondWith(new Promised((resolve, reject) => {
    db.get(event.request.url).then((blobFound) => {
      if (!blobFound) {
        appFuncs.consoleThis(`content not found in DB, requesting from the matrix`, 'info');

        return fetch(event.request.clone())
          .then((response) => {
            if (!response) {
              appFuncs.consoleThis(`received invalid response from fetch: ${response}`);

              return reject(response);
            }

            // insert response body in db
            response.clone().blob().then(
              (blob) => {
                appFuncs.consoleThis(`updating db with: ${JSON.stringify(event.request.clone().url)}`, 'info');
                db.set(
                  event.request.url,
                  blob
                ).then(
                  (success) => appFuncs.consoleThis(`success in setting: ${success}`),
                  (error) => appFuncs.consoleThis(`error in setting: ${error}`, 'error')
                );
              },
              (noBlob) => appFuncs.consoleThis(`blob not generated from cloned response:${noBlob}`)
            );

            return resolve(response);
          });
      }

      const contentType = appFuncs.getBlobType(blobFound, event.request.url);
      appFuncs.consoleThis(`responding from cache: ${event.request.url}, ${contentType}, ${blobFound.size}`);

      const myHeaders = {
        "Content-Length": String(blobFound.size),
        "Content-Type": contentType,
        "X-Custom-type": "Provided by Serviceworker",
      };

      const init = {
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
  appFuncs.consoleThis(`sync event: ${JSON.stringify(event)}`);
});

self.addEventListener('push', (event) => {
  appFuncs.consoleThis(`push event: ${JSON.stringify(event)}`);
});

self.addEventListener('message', (event) => {
  // event.data === whatever sent from Client.postMessage
  appFuncs.consoleThis(`message event: ${JSON.stringify(event)}`);
});
