self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) =>
      cache.addAll([
        '/',
        '/start',
      ])
    )
  );
  console.log(`install event: ${JSON.stringify(event)}`);
});

self.addEventListener('activate', (event) => {
  console.log(`activate event: ${JSON.stringify(event)}`);
});

self.addEventListener('fetch', (event) => {
  // event api: https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent
  // event.request API https://developer.mozilla.org/en-US/docs/Web/API/Request
  console.log(`fetch event: ${event.request.url}`);
  event.respondWith(
    caches.match(event.request)
      .then((respOriginal) => {
        console.log(`response is: ${respOriginal}`);

        return respOriginal || fetch(event.request)
          .then((respNew) =>
            caches.open('v1').then((cache) => {
              cache.put(event.request, respNew.clone());
              console.log('updated cache');

              return respNew;
            })
          );
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
