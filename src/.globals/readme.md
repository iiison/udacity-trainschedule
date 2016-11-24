# Globals!

## why are we here?
- dont you hate importing and requiring your constants and lib functions all over the friggin place?
  + include constants and functions one time:
    - on the server, e.g. server.js
    - in the main client thread, e.g. client.js
    - in worker thread, e.g. rootWorker.js
  + on the client main thread: window.appFuncs.somefunction (or just appFuncs.blah)
  + on the client worker thread: self.appConsts.someconst (or just appConsts.blah)
  + in node: global.appFuncs.someFunc (or just appFuncs)


thank me later...
