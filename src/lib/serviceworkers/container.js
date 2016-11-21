/**
 * @file manages all service workers in the client
 * @author @noahedwardhall
 */
// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer
// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope
// https://serviceworke.rs/
// https://github.com/MicheleBertoli/react-worker/blob/master/public/worker.js
if ('serviceWorker' in navigator) {
  // navigator.serviceWorker === https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer

  // register the root worker
  navigator.serviceWorker.register('./rootworker.js', {
    scope: './'
  })
  // registration was successful
  .then((reg) => {
    if (reg.installing) {
      const sw = reg.installing;
      sw.postMessage(`installed worker message`);
      console.log(`state is installing ${JSON.stringify(sw)}`);
    } else if (reg.waiting) {
      const sw = reg.waiting;
      console.log(`state is waiting ${JSON.stringify(sw)},`);
    }

    // reg.installing is now the current worker
    reg.addEventListener('updatefound', () => {
      // whenever sw.state changes
      reg.installing.addEventListener('statechange', () => {
        if (reg.state === 'installed')
          console.log(`please refresh your browser! ${JSON.stringify(reg)}`);
      });
    });
  })
  // registration failed
  .catch((error) => {
    console.error(`Registration failed: ${error}`);
  });

  // the controlling service worker has changed
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('controller has changed, reload');
    // reload the page if the user has consented, if not ask for permission
    // for some changes (e.g. minor, or security fixes) you may want to force changes to users
    window.location.reload();
  });
} else console.info('Your browser does not offline apps :( try switching to chrome, firefox, or opera)');
