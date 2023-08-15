// import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
//@ts-ignore
import { isBrowser } from '@pratiq/utils'
import debug from 'debug'
const log = debug('@pq:useAsync')


// export type UseAsyncConfig = {
//     /** Supply default data while the promise is pending */
//     initialData?: any;

//     /** Load automatically on mount */
//     autoLoad?: boolean;

//     /** An array of dependencies to watch and reload on change */
//     deps?: any[];
// }

// type UseAsyncReturn = {
//     loading: boolean;
//     done: boolean;
//     error: any;
//     data: any;
//     reload: Function;
//     reset: Function;
// }


// type UseAsyncType = (callback: Function, config?: UseAsyncConfig) => UseAsyncReturn;





/**
 * useAsync
 * ---
 * 
 * Handle async functions with loading and error states
 * 
 * @param callback - The callback function to invoke
 * @param config 
 * @returns {loading:boolean, error:any, data:any}
 * @example
 * export type UseAsyncConfig = {
 *   // Supply default data while the promise is pending
 *   initialData?: any;
 *
 *   // Invoke the callback function automatically on mount
 *   autoLoad?: boolean;
 *
 *   // An array of dependencies to watch.
 *   // passed as arguments to the callback function
 *   // unless new arguments are provided to `reload(...newArgs)`
 *   deps?: any[];
 * }
 *
 * export type UseAsyncReturn = {
 *   loading: boolean;
 *   done: boolean;
 *   error: any;
 *   data: any;
 *   reload: Function;
 *   reset: Function;
 * }
 */


import { useCallback, useEffect, useRef, useState } from 'react';

export type UseAsyncConfig = {
    initialData?: any;
    autoLoad?: boolean;
    deps?: any[];
};

export type UseAsyncReturn = {
    loading: boolean;
    done: boolean;
    error: any;
    data: any; 
    reload: Function;
    reset: Function;
};

type UseAsyncType = (callback: (...args: any[]) => Promise<any>, config?: UseAsyncConfig) => UseAsyncReturn;

const useAsync: UseAsyncType = (callback, config = {}) => {
    const cache = useRef<Map<string, any>>(new Map());
    const abortControllerRef = useRef<AbortController | null>(null);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [data, setData] = useState<any>(config.initialData ?? null);
    const [error, setError] = useState<any>(null);

    const settings = {
        deps: config.deps || [],
        initialData: config.initialData || null,
        autoLoad: config.autoLoad || false,
    };

    const reset = (disableAutoLoad = false) => {
        setDone(false);
        setLoading(false);
        setError(null);
        setData(settings.initialData);
        disableAutoLoad && (settings.autoLoad = false)
    };

    const reload = useCallback((...realDeps: any[]) => {
        if (loading) return;

        // Abort the previous request if exists
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();

        setLoading(true);
        setDone(false);
        setError(null);
        setData(settings.initialData);

        // If realDeps are not provided, use settings.deps instead
        const deps = realDeps.length > 0 ? realDeps : settings.deps;
        const depsKey = JSON.stringify(deps);

        if (cache.current.has(depsKey)) {
            setData(cache.current.get(depsKey));
            setLoading(false);
            setDone(true);
            return;
        }

        callback(...deps, { signal: abortControllerRef.current.signal })
            .then((responseData: any) => {
                setData(responseData);
                setError(null);
                setLoading(false);
                setDone(true);
                cache.current.set(depsKey, responseData);
            })
            .catch((err: any) => {
                if (err.name === 'AbortError') return; // Ignore aborted requests
                setError(err);
                setData(settings.initialData);
                setLoading(false);
                setDone(false)
            })
    }, [settings.deps, callback]);

    useEffect(() => {
        settings.autoLoad && reload(...settings.deps);
    }, [settings.autoLoad, reload, settings.deps]);

    return { data, loading, error, done, reload, reset };
};




export default useAsync





// const useAsync: UseAsyncType = (_callback: Function, _config: UseAsyncConfig = {}) => {

//     const empty = {
//         loading: false,
//         done: false,
//         error: null,
//         data: null,
//         reload: () => {},
//         reset: () => {}
//     }

//     if(!_callback) return empty;

//     const settings = useMemo(() => { return {
//         deps: _config.deps                       ?? [],
//         initialData: _config.initialData         ?? null,
//         autoLoad: _config.autoLoad               ?? false
//     }}, [_config])


//     const [loading, setLoading] = useState(false)
//     const [done, setDone] = useState(false)
//     const [data, setData] = useState<any>(settings.initialData)
//     const [error, setError] = useState<any>(null)
//     const isLoading = useRef(false)
//     const wasInit = useRef(false)
//     const depsAtStart = useRef<any>(null)

//     const reset = () => {
//         setDone(false)
//         setLoading(false)
//         setError(null)
//         setData(settings.initialData)
//     }




//     const reload = useCallback((realDeps) => {
//         if(loading || isLoading.current) return;

//         isLoading.current = true

//         setDone(false)
//         setLoading(true)
//         setError(null)
//         setData(settings.initialData)

//         _callback(...settings.deps)
//             .then((data:any) => {
//                 if(loading || isLoading.current) return;

//                 setData(data)
//                 setError(null)
//                 // log('useAsync | data:', data)
//             })
//             .catch((err:any) => {
//                 if(loading || isLoading.current) return;
//                 setError(err)
//                 // log('useAsync | error:', err)
//                 setData(settings.initialData)
//             })
//             .finally(()=>{
//                 if(loading || isLoading.current) return;
//                 setLoading(false)
//                 setDone(true)
//                 // log('useAsync | done:', true)
//                 isLoading.current = false

//                 // console.log(`comparing deps:`, realDeps, depsAtStart.current)

//                 // if(JSON.stringify(realDeps) !== JSON.stringify(depsAtStart.current)){
//                 //     console.log(`Deps dont match...`)
//                 //     reload(depsAtStart.current)
//                 // }
//             })


//     }, [...settings.deps, _callback])


//     useEffect(() => {
//         settings.autoLoad && reload(settings.deps)
//     }, [])

//     useEffect(() => {
//         console.log('>> Reload '+settings.deps)
//         depsAtStart.current = settings.deps
//         reload(settings.deps)

//     }, [JSON.stringify(settings.deps)])


//     return {data, loading, error, done, reload, reset}
// }

// ...

// const useAsync: UseAsyncType = (_callback: Function, _config: UseAsyncConfig = {}) => {

//     const settings = useMemo(() => { return {
//         deps: _config.deps                       ?? [],
//         initialData: _config.initialData         ?? null,
//         autoLoad: _config.autoLoad               ?? false
//     }}, [_config])

//     const [loading, setLoading] = useState(false)
//     const [done, setDone] = useState(false)
//     const [data, setData] = useState<any>(settings.initialData)
//     const [error, setError] = useState<any>(null)
//     const isLoading = useRef(false)

//     const reset = () => {
//         setDone(false)
//         setLoading(false)
//         setError(null)
//         setData(settings.initialData)
//     }

//     const reload = useCallback((realDeps) => {
//         if (isLoading.current) return;

//         isLoading.current = true;

//         // Rest of the code...

//         _callback(...settings.deps)
//         .then((data: any) => {
//             if (isLoading.current) return;

//             // Rest of the code...
//         })
//         .catch((err: any) => {
//             if (isLoading.current) return;

//             // Rest of the code...
//         })
//         .finally(() => {
//             if (isLoading.current) return;

//             // Rest of the code...
//         });
//     }, [settings.deps, _callback]); // Fixed dependencies

//     useEffect(() => {
//         const cleanup = () => { isLoading.current = false; }; // Added cleanup function
//         settings.autoLoad && reload(settings.deps);
//         return cleanup; // Returning cleanup function
//     }, [settings.autoLoad, settings.deps, reload]); // Fixed dependencies


//     return {data, loading, error, done, reload, reset};
// };
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// import { useCallback, useEffect, useRef, useState } from 'react';

// type UseAsyncConfig = {
//     initialData?: any;
//     autoLoad?: boolean;
//     deps?: any[];
// };

// type UseAsyncReturn = {
//     loading: boolean;
//     done: boolean;
//     error: any;
//     data: any;
//     reload: Function;
//     reset: Function;
// };

// type UseAsyncType = (callback: (...args: [...any[], AbortSignal]) => Promise<any>, config?: UseAsyncConfig) => UseAsyncReturn;

// const useAsync: UseAsyncType = (callback, config = {}) => {
//     const cache = useRef<Map<string, any>>(new Map());
//     const abortControllerRef = useRef<AbortController | null>(null);
//     const [loading, setLoading] = useState(false);
//     const [done, setDone] = useState(false);
//     const [data, setData] = useState<any>(config.initialData);
//     const [error, setError] = useState<any>(null);

//     const settings = {
//         deps: config.deps || [],
//         initialData: config.initialData || null,
//         autoLoad: config.autoLoad || false,
//     };

//     const reset = () => {
//         setDone(false);
//         setLoading(false);
//         setError(null);
//         setData(settings.initialData);
//     };

//     const reload = useCallback((...realDeps: any[]) => {
//         if (loading) return;

//         // Abort the previous request if exists
//         abortControllerRef.current?.abort();
//         abortControllerRef.current = new AbortController();

//         setLoading(true);
//         setDone(false);
//         setError(null);
//         setData(settings.initialData);

//         const depsKey = JSON.stringify(realDeps);

//         if (cache.current.has(depsKey)) {
//             setData(cache.current.get(depsKey));
//             setLoading(false);
//             setDone(true);
//             return;
//         }

//         callback(...realDeps, abortControllerRef.current.signal)
//             .then((responseData: any) => {
//                 setData(responseData);
//                 setError(null);
//                 setLoading(false);
//                 setDone(true);
//                 cache.current.set(depsKey, responseData);
//             })
//             .catch((err: any) => {
//                 if (err.name === 'AbortError') return; // Ignore aborted requests
//                 setError(err);
//                 setData(settings.initialData);
//                 setLoading(false);
//             });
//     }, [settings.deps, callback]);

//     useEffect(() => {
//         settings.autoLoad && reload(...settings.deps);
//     }, [settings.autoLoad, reload, settings.deps]);

//     return { data, loading, error, done, reload, reset };
// };

// export default useAsync;
