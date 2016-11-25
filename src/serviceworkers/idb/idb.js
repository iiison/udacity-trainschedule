import idb from 'idb';

/**
 * Wrapper around jake's idb for connecting to indexdb
 * @class Idbstore
 */
export class Idbstore {
  constructor (dbName = appConsts.dbName, initialStore = appConsts.initialStore) {
    this.success = false;
    this.error = false;
    this.dbName = dbName;
    // 0 indexed
    this.store = `${initialStore}${appConsts.appVersion ? appConsts.appVersion - 1 : 0}`;
    this.dbPromise = idb.open(
      this.dbName,
      appConsts.appVersion,
      (upgradeDB) => {
        // 1 indexed
        let idx = upgradeDB.objectStoreNames ?
          upgradeDB.objectStoreNames.length :
          0;

        appFuncs.console('info')(`oldVersion: ${upgradeDB.oldVersion}, appVersion: ${appConsts.appVersion}, idx: ${idx}`);
        while (idx < appConsts.appVersion)
          upgradeDB.createObjectStore(`${initialStore}${idx++}`);
      }
    ).then(
      (good) => {
        this.success = true;

        return good;
      },
      (bad) => this.error = bad
    ).catch((err) => this.catch = err);
  }

  clear (store = this.store) {
    return this.dbPromise.then((db) => {
      const tx = db.transaction(store, 'readwrite');
      tx.objectStore(store).clear(key);

      return tx.complete;
    });
  }

  delete (key, store = this.store) {
    return this.dbPromise.then((db) => {
      const tx = db.transaction(store, 'readwrite');
      tx.objectStore(store).delete(key);

      return tx.complete;
    });
  }

  get (key, store = this.store) {
    return this.dbPromise.then((db) =>
      db.transaction(store).objectStore(store).get(key)
    );
  }

  getAll () {
    return this.dbPromise.then((db) =>
      db.transaction(this.store).objectStore(this.store).getAll())
      .then((allObjs) => allObjs);
  }

  keys (store = this.store) {
    return this.dbPromise.then((db) => {
      const tx = db.transaction(store);
      const keys = [];
      const thisStore = tx.objectStore(store);
      // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
      // openKeyCursor isn't supported by Safari, so we fall back
      (thisStore.iterateKeyCursor || thisStore.iterateCursor).call(store, (cursor) => {
        if (!cursor) return;
        keys.push(cursor.key);
        cursor.continue();
      });

      return tx.complete.then(() => keys);
    });
  }

  set (key, val, store = this.store) {
    return this.dbPromise.then((db) => {
      const tx = db.transaction(store, 'readwrite');
      tx.objectStore(store).put(val, key);

      return tx.complete;
    });
  }
}

export default Idbstore;
