import {useState, useCallback, useEffect} from 'react'

/**
 * useIDB()
 * ---
 * 
 * useState hook that uses IndexedDB to store and retrieve complex objects.
 * 
 * 
 * @param {string} key - the key for the storage item
 * @param {any} initialValue - initial state value
 * @param {function} get - the function used to get the value
 * @param {function} set - the function used to set the value
 * @returns void
 * 
 * @example
 * 
 */

const useIDB = (storeKey: string, initialValue: any, useInitialValueOnStart: boolean = false) => {

  type UseStore = <T>(
    txMode: IDBTransactionMode,
    callback: (store: IDBObjectStore) => T | PromiseLike<T>,
  ) => Promise<T>;

  let defaultGetStoreFunc: UseStore | undefined;

  const [reactStateValue, setReactStateValue] = useState<any>(useInitialValueOnStart && initialValue)
  const [stateLoading, setStateLoading] = useState<boolean | undefined>(false)
  const [stateError, setStateError] = useState<boolean | undefined>(false)

  const safariFix = (): Promise<void> => {
    let navigator: any = window.navigator
    const isSafari =
        !navigator.userAgentData &&
        /Safari\//.test(navigator.userAgent) &&
        !/Chrom(e|ium)\//.test(navigator.userAgent);

    if (!isSafari || !indexedDB.databases) return Promise.resolve();

    let intervalId: any;

    return new Promise<void>((resolve) => {
        const tryIdb = () => indexedDB.databases().finally(resolve);
        intervalId = setInterval(tryIdb, 100);
        tryIdb();
    }).finally(() => clearInterval(intervalId));
  }  

  const promisifyRequest = (request: IDBRequest | IDBTransaction): Promise<any> => {
    return new Promise((resolve, reject) => {
      // @ts-ignore - file size hacks
      request.oncomplete = request.onsuccess = () => resolve(request.result);
      // @ts-ignore - file size hacks
      request.onabort = request.onerror = () => reject(request.error);
    });
  }

  const createStore = useCallback((dbName: string, storeName: string): UseStore=>{
    const dbp = safariFix().then(() => {
      const request = indexedDB.open(dbName);
      request.onupgradeneeded = () => request.result.createObjectStore(storeName);
      return promisifyRequest(request);
    });

    return (txMode, callback) =>
      dbp.then((db: any) =>
        callback(db.transaction(storeName, txMode).objectStore(storeName)),
      );
  }, [])

  const defaultGetStore = useCallback(() => {
    if (!defaultGetStoreFunc) {
      defaultGetStoreFunc = createStore('keyval-store', 'keyval');
    }
    return defaultGetStoreFunc;
  }, [])

  const get:any = useCallback((key: IDBValidKey, customStore = defaultGetStore()): Promise<any> => {
    return customStore('readonly', (store: any) => promisifyRequest(store.get(key)));
  }, [defaultGetStore])

  const set = (value: any, customStore = defaultGetStore()): Promise<void> => {
    return customStore('readwrite', (store) => {
        store.put(value, storeKey);
        return promisifyRequest(store.transaction);
    });
  }

  const del = (customStore = defaultGetStore()): Promise<void> => {
    setReactStateValue(undefined)
    return customStore('readwrite', (store) => {
      store.delete(storeKey);
      return promisifyRequest(store.transaction);
    });
  }

  const setValueHandler = (val: any) => {
    setStateLoading(true)
    setStateError(undefined)
    setReactStateValue(val)
    set(val)
      .then(() => setStateLoading(false))
      .catch((e) => setStateError(e))
  }

  const resetValueHandler = () => {
    setStateLoading(true)
    setStateError(undefined)
    setReactStateValue(initialValue)
    set(initialValue)
      .then(() => setStateLoading(false))
      .catch((e) => setStateError(e))
  }

  const deleteValueHandler = () => {
    setStateLoading(true)
    setStateError(undefined)
    setReactStateValue(undefined)
    del()
      .then(() => setStateLoading(false))
      .catch((e) => setStateError(e))
  }

  useEffect(()=>{
    setStateLoading(true)
    get(storeKey)
    .then((v: any)=> { 
      if(typeof v !== 'undefined'){ setReactStateValue(v) }
      else{ setReactStateValue(initialValue) }
      setStateLoading(false)
    })
    .catch((e:any)=>{
      setStateError(e)
      setStateLoading(false)
    })
  }, [get, initialValue, storeKey, setStateLoading])

  return [
    reactStateValue, 
    setValueHandler, 
    stateLoading, 
    stateError,
    resetValueHandler,
    deleteValueHandler
  ]
}

export default useIDB