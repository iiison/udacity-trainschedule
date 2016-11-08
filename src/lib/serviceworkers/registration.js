if ('serviceWorker' in navigator)
  navigator.serviceWorker.register('./rootworker.js', {
    scope: './'
  }).then((reg) => {
    console.log('Yey!', reg);
    if (reg.installing) {
      const sw = reg.installing;
      console.log(sw.state);
    }
  }).catch((error) => {
    console.log('Boo!', error);
  });
