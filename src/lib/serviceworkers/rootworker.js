self.addEventListener('install', (event) => {
  //event.waitUntil(somePromise);
    //retrieve files from network and create cache
    //promise resolve === accept SW continue with install
    //promise reject === reject SW and discard
    //
  console.log(`installed ${event}`);
});
