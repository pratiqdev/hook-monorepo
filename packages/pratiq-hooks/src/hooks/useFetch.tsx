import {useState, useRef, useEffect, useMemo, useCallback} from 'react'
import extend from '../utils/logger.js'
const log = extend('local_useFetch')


export type UseFetchConfig = {
    watch?: any[];
    expire?: number;
    options?: Record<string, any>;
    initialData?: any;
    autoLoad?: boolean;
}
export type UseFetchSettings = {
    watch: any[];
    expire: number;
    options: Record<string, any>;
    initialData: any;
    autoLoad: boolean;
}


// Cache object outside the hook
const cache: Record<string, { data: any; timestamp: number }> = {};

const useFetch = (url: string = '', config: UseFetchConfig) => {
    console.log('useFetch v0.2')

    const {
        options, watch, expire, initialData, autoLoad
    }:UseFetchSettings = useMemo(() => ({
        options: config.options ?? {},
        watch: config.watch ?? [],
        expire: config.expire ?? 5_000,
        initialData: config.initialData ?? null,
        autoLoad: config.autoLoad ?? true,
    }), [config]);

    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState<any>(null);
    const [data, setData] = useState<any>(initialData);
    const done = useRef(true);
    const abortController = useRef(new AbortController());
    const expireHandle: any = useRef();

    const cacheKey = useMemo(() => `${url}_${expire}_${JSON.stringify(watch)}_${JSON.stringify(options)}`, [url, watch, options, expire]);
    // console.log('cacheKey:', cacheKey)

    const handleExpire = () => {
        if (!done.current) {
            console.log('Force expiring request...')
            clearTimeout(expireHandle.current);
            setError(`Request expired. Expiration set to ${expire} ms`);
            setData(initialData);
            setLoading(false);
            setLoaded(false);
            done.current = true;
        }
    };

    const errorIntercept = (response: any) => {
        console.log('Error intercept:', response)

        if (!response.ok) {
            setError(response.statusText);
            done.current = true;
        }
        return response;
    };

    const handleError = (e: any) => {
        if (!done.current) {
            console.log('handleError:', e)
            clearTimeout(expireHandle.current);
            done.current = true;
            setError(e);
            setLoading(false);
            setLoaded(false);
        }
    };

    const handleValue = (v: any) => {
        if (!done.current) {
            console.log('handleValue:', v)
            clearTimeout(expireHandle.current);
            cache[cacheKey] = { data: v, timestamp: Date.now() }; // Cache the response
            done.current = true;
            setData(v);
            setError(undefined);
            setLoading(false);
            setLoaded(true);
        }
    };

    const reset = () => {
        console.log('resetting...')

        abortController.current.abort();
        abortController.current = new AbortController();
        setLoaded(false);
        setLoading(false);
        setError(null);
        setData(initialData);
    };

    const reload = useCallback(() => {
        console.log('reloading...')

        if (!done.current) {
            console.log('NOT DONE: abort and clear timeout')

            abortController.current.abort();
            abortController.current = new AbortController();
            clearTimeout(expireHandle.current);
        }
        console.log('Continuing to reload...')

        setLoading(true);
        setLoaded(false);
        setError(null);
        setData(initialData);
        done.current = false;

        // Check cache
        const cachedData = cache[cacheKey];
        if (cachedData) {
            console.log('Checking cache...')
            if (Date.now() - cachedData.timestamp < expire) {
                console.log('>>> Cache hit:', cacheKey)
                setData(cachedData.data); // Set cached data if available and not expired
                setLoading(false)
                setLoaded(true)
                setError(null)
                done.current = true
                return
            }
            // delete expired entries
            console.log('>>> Cache miss:', cacheKey)
            // delete cache[cacheKey]
        } 

        // setLoading(true);
        // setLoaded(false);
        // setError(null);
        // setData(initialData);

        expireHandle.current = setTimeout(handleExpire, expire); // Set expiration timeout

        try {
            options.signal = abortController.current.signal;
            console.log('Running fetch:', url)
            fetch(url, { ...options, signal: abortController.current.signal })
                .then(errorIntercept)
                .then(res => res.json())
                .then(res => {
                    console.log('Request success. setting cache, state and clearing timeouts', res)
                    cache[cacheKey] = { data: res, timestamp: Date.now() }
                    clearTimeout(expireHandle.current);
                    handleValue(res);
                    done.current = true
                })
                .catch(err => {
                    if (err.name !== 'AbortError') handleError(err);
                });
        } catch (err) {
            if ((err as any).name !== 'AbortError') handleError(err);
        }
    }, [url, expire, options]); // Include the dependencies that the `reload` function relies on

    useEffect(() => {
        autoLoad && reload();

        return () => {
            abortController.current.abort();
            clearTimeout(expireHandle.current);
        };
    }, [reload, autoLoad]);


    return { data, loading, loaded, error, reload, reset };
};

export default useFetch;






















//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// const defaultOptions = {
//     headers: {
//         "Content-Type":"application/json",
//         "Access-Control-Allow-Origin": "*"
//     }, 
// }



// export interface I_UseFetch {
//     watch?: any[];
//     expire?: number;
//     options?: object;
//     initialData?: any;
//     autoLoad?: boolean;
// }


/**
* useFetch()
* ---
* 
* Handler for fetch requests
* 
* @param {string} url - the url of the request
* @param {object} options - request options
* @param {number} expire - expiration of the request in seconds 
* @param {array} watch - array of dependencies to trigger a new request
* @returns {object} states {loading, value, error}
* 
* @example
* 
*/

// const useFetch_original = (url: string = '', config: I_UseFetch) => {

    
//     const settings: = useMemo(() => ({
//         options: config.options         ?? {},
//         watch: config.watch             ?? [],
//         expire: config.expire           ?? 5_000,
//         initialData: config.initialData ?? null,
//         autoLoad: config.autoLoad       ?? true,
//     }), [config])


//     const [loading, setLoading] = useState(false)
//     const [loaded, setLoaded] = useState(false)
//     const [error, setError] = useState<any>(null)
//     const [data, setData] = useState<any>(initialData)
//     let done = useRef(true)
//     let init = useRef(false)
//     let triggerSignalRef = useRef<any>(null)
//     let watchRef = useRef<any>(null)
//     let abortRef = useRef<any>(new AbortController())

//     let expireHandle: any = useRef()

//     // const abort_ctrl = new AbortController()
//     //@ts-ignore
//     // options.signal = abort_ctrl.signal
//     // sigRef.current = abort_ctrl.signal


//     const handleExpire = () => {
//         if(!done.current){
//             clearTimeout(expireHandle.current)
//             setError(`Request expired. Expiration set to ${expire} ms`)
//             setData(initialData)
//             setLoading(false)
//             setLoaded(false)
//             done.current = true
//         }
//     }

//     function errorIntercept(response: any) {
//         if (!response.ok) {
//             setError(response.statusText)
//             done.current = true
//         }
//         return response;
//     }
    

//     const handleError = (e: any) => {
//         if(!done.current){
//             clearTimeout(expireHandle.current)
//             done.current = true
//             try{
//                 if(e && e instanceof TypeError){ setError(e.message)}
//                 else if(e && typeof e === 'object'){ setError(e) }
//                 else if(e){ setError(e) }
//                 else{ setError(true) }
//             }catch(err){
//                 setError(true)
//                 setData(initialData)
//             }finally{ 
//                 setLoading(false)
//                 setLoaded(false)
//             }
//         }
//     }

//     const handleValue = (v: any) => {
//         if(!done.current){
//             clearTimeout(expireHandle.current)
//             done.current = true
//             setData(v)
//             setError(undefined)
//             setLoading(false)
//             setLoaded(true)
//         }
//     }


//     const reset = () => {
//         setLoaded(false)
//         setLoading(false)
//         setError(null)
//         setData(initialData)

//     }

//     const reload = () => {
//         // if(!done.current){
//         //     abortRef.current.abort()
//         //     abortRef.current = new AbortController()
//         //     clearTimeout(expireHandle.current)
//         // }
//         watchRef.current = JSON.stringify(watch)
//         done.current = false

//         log('reload')
//         clearTimeout(expireHandle.current)
//         expireHandle.current = setTimeout(handleExpire, expire);
//         setLoading(true)
//         setLoaded(false)
//         setError(null)
//         setData(initialData)

//         // console.log('reload...', watch, url)
        
//         try{
//             //@ts-ignore
//             options.signal = abortRef.current.signal
//             fetch(url, options)
//             .then(errorIntercept)
//             .then(res => {
//                 if (res && res.ok) { return res.json() }
//                 else if(!res){ handleError('No response') }
//             })
//             .then(res => {
//                 if(watchRef.current !== JSON.stringify(watch)){
//                     // console.log('mismatch:', {ref: watchRef.current, watch: watch})
//                     // abortRef.current.abort()
//                     clearTimeout(expireHandle.current)
//                 }else{
//                     handleValue(res)
//                 }
//             })
//             .catch(err => {
//                 handleError(err)
//             })

//         }catch(err){ 
//             handleError(err) 
//         }
//     }
    
//     useEffect(() => {
//         if(!init.current) return;
//         log('useFetch | use effect')
//         // if(abort_ctrl){
//             // abort_ctrl.abort()
//         // }
//         reload()
        
//         return () => clearTimeout(expireHandle.current)
//         // eslint-disable-next-line
//     }, watch)

//     useEffect(()=>{
//         log('autoload')
//         autoLoad && reload()
//         init.current = true
//     },[])

//     return {data, loading, loaded, error, reload, reset}
// }

// export default useFetch

/*
--------------------------------------------------------------------- CHANGELOG

- converted return object to an array and altered order of return values
- altered config interface to allow optional values
- added default config object with empty string url



-------------------------------------------------------------------------- TODO

! loaded
- consider adding loaded boolean state to return

! initialData
- consider adding initialData item to config, with reset function provided in 
- return object to reset state to initial values

! config.autoLoad: boolean
- consider adding a config flag for autoLoad that can prevent the request from
- loading until the user invokes `reload` function

? should loading / reloading remove the current state?
> this would prevent old data from showing while loading... makes sense for now 

*/