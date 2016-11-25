/**
 * Constants made available to entire application
 * @see https://www.hacksparrow.com/global-variables-in-node-js.html
 * @author @noahehall
 * @type {Object}
 */
const appConsts = {
  apiKey: 'Z44S-5LSG-9QVT-DWE9',
  appVersion: 1, // non 0 integer, incremented by 1
  dbName: 'udacity',
  initialStore: 'cache',
  isProd: process.env.NODE_ENV === 'production',
}
/**
 * Set global variables on worker & main threads, else node
 * @type {[type]}
 */
const self = self || null;
if (!self) global.appConsts = appConsts;
else self.appConsts = appConsts;
