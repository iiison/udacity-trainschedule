import idb from 'idb';

/**
 * Wrapper around jake's idb for connecting to indexdb
 * @class Idbstore
 */
export class Idbstore {
  constructor (dbName = appConsts.dbName, initialStore = appConsts.initialStore) {
    this.dbName = dbName;
    // 0 indexed
    this.store = `${initialStore}${appConsts.appVersion - 1}`;
    this.dbPromise = idb.open(
      this.dbName,
      appConsts.appVersion,
      (upgradeDB) => {
        const curVer = upgradeDB.oldVersion;
        // 1 indexed
        const neededVer = appConsts.appVersion;
        const curStores = upgradeDB.objectStoreNames || [];
        let idx = curStores.length || 0;

        appFuncs.console('info')(`curVer: ${curVer}, neededVer: ${neededVer}, idx: ${idx}`);
        while (idx < neededVer) {
          appFuncs.console()(`idx in loop: ${idx}, ${curStores[idx]}`);
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

  getAll () {
    return this.dbPromise.then((db) =>
      db.transaction(this.store).objectStore(this.store).getAll())
      .then((allObjs) => allObjs);
  }
}

export default Idbstore;
