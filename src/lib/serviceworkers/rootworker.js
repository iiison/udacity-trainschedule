self.addEventListener('install', (event) => {
  //event.waitUntil(somePromise);
    //retrieve files from network and create cache
    //promise resolve === accept SW continue with install
    //promise reject === reject SW and discard
    //
  console.log(`install event: ${event}`);
});

self.addEventListener('message', (event) => {
  // event.data === whatever sent from Client.postMessage
  console.log(`message event: ${event}`);
});

self.addEventListener('fetch', (event) => {
  console.log(`fetch event: ${event}`);
  // put all your caching logic in here
});
