if ('serviceWorker' in navigator)
//next up
//https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
//https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer
//https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope
//https://serviceworke.rs/
//https://github.com/MicheleBertoli/react-worker/blob/master/public/worker.js
  // navigator.serviceWorker === https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer
  navigator.serviceWorker.register('./rootworker.js', {
    // scope
    scope: './'
  }).then((reg) => {
    console.log(`Controller! ${reg}`);
    if (reg.installing) {
      const sw = reg.installing;
      console.log(`state is installing ${sw}`);
    } else if (reg.waiting) {
      const sw = reg.waiting;
      console.log(`state is waiting ${sw}`);
    }

    // reg.installing is now the current worker
    reg.addEventListener('updatefound', () => {
      // whenever sw.state changes
      reg.installing.addEventListener('statechange', () => {
        if (reg.state === 'installed')
          console.log(`please refresh your browser! ${reg}`);
      });
    });
  // registration failed
  }).catch((error) => {
    console.log(`Registration failed: ${error}`);
  });
