import {useState, useCallback, useEffect, useMemo} from 'react'

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

export interface I_UseDBReturn {
  value: any; 
  setValue: (value:any) => void; 
  loading: boolean; 
  error: boolean;
  reset: () => void;
  remove: (key:string) => void;
}

type T_UseIDBConfig = {
  key?: string;
  value?: any;
  startWithValue?: boolean;
}


type T_UseIDB = (config?: T_UseIDBConfig) => ({
  value: any; 
  setValue: (value:any) => void; 
  loading: boolean; 
  error: boolean;
  reset: () => void;
  remove: (key:string) => void;
})

const useIDB: T_UseIDB = (config: T_UseIDBConfig = {}) => {

  const settings = useMemo(() => ({
    storeKey:               config.key                      ?? Date.now(),
    initialValue:           config.value                    ?? null,
    startWithValue: config.startWithValue   ?? false
  }),[config])

  type UseStore = <T>(
    txMode: IDBTransactionMode,
    callback: (store: IDBObjectStore) => T | PromiseLike<T>,
  ) => Promise<T>;

  let defaultGetStoreFunc: UseStore | undefined;

  const [reactStateValue, setReactStateValue] = useState<any>(settings.startWithValue ? settings.initialValue : null)
  const [stateLoading, setStateLoading] = useState<boolean>(false)
  const [stateError, setStateError] = useState<boolean>(false)

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
        store.put(value, settings.storeKey);
        return promisifyRequest(store.transaction);
    });
  }

  const del = (customStore = defaultGetStore()): Promise<void> => {
    setReactStateValue(undefined)
    return customStore('readwrite', (store) => {
      store.delete(settings.storeKey);
      return promisifyRequest(store.transaction);
    });
  }

  const setValueHandler = (val: any) => {
    setStateLoading(true)
    setStateError(false)
    setReactStateValue(val)
    set(val)
      .then(() => setStateLoading(false))
      .catch((e) => setStateError(e))
  }

  const resetValueHandler = () => {
    setStateLoading(true)
    setStateError(false)
    setReactStateValue(settings.initialValue)
    set(settings.initialValue)
      .then(() => setStateLoading(false))
      .catch((e) => setStateError(e))
  }

  const deleteValueHandler = () => {
    setStateLoading(true)
    setStateError(false)
    setReactStateValue(null)
    del()
      .then(() => setStateLoading(false))
      .catch((e) => setStateError(e))
  }

  useEffect(()=>{
    setStateLoading(true)
    get(settings.storeKey)
    .then((v: any)=> { 
      if(typeof v !== 'undefined'){ setReactStateValue(v) }
      else if(settings.startWithValue){ setReactStateValue(settings.initialValue) }
      setStateLoading(false)
    })
    .catch((e:any)=>{
      setStateError(e)
      setStateLoading(false)
    })
  }, [get, settings.initialValue, settings.storeKey, setStateLoading])

  const ret: I_UseDBReturn = {
    value: reactStateValue, 
    setValue: setValueHandler, 
    loading: stateLoading, 
    error: stateError,
    reset: resetValueHandler,
    remove: deleteValueHandler
  }
  return ret
}

export default useIDB