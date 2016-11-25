import idb from 'idb';

/**
 * Connect to indexeddb
 * @class idbKeyval
 */
export class idbKeyval {
  constructor (dbName = appConsts.dbName, initialStore = appConsts.initialStore) {
    this.dbName = dbName;
    this.store = `${initialStore}${appConsts.appVersion}`;
    this.dbPromise = idb.open(
      this.dbName,
      appConsts.appVersion || 1,
      (upgradeDB) => {
        const curVer = upgradeDB.oldVersion;
        const neededVer = appConsts.appVersion || 1;

        // works for creating stores starting at index 0 and no stores exist
        let idx = Number(neededVer) > Number(curVer) ?
          curVer :
          0;
        if (curVer === idx && idx !== 0) idx++;

        appFuncs.console()(`curVer: ${curVer}, neededVer: ${neededVer}, idx: ${idx}, names ${JSON.stringify(upgradeDB.objectStoreNames)}`);
        while (idx <= neededVer) {
          appFuncs.console()(`idx in loop: ${idx}, ${upgradeDB.objectStoreNames[idx]}`);
          upgradeDB.createObjectStore(`${initialStore}${idx++}`);
        }
      }
    ).then(
      (good) => good,
      (bad) => this.error = bad
    ).catch((err) => this.catch = err);
    this.success = true;
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

export default idbKeyval;
