import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
//@ts-ignore
import extend from '../utils/logger'
const log = extend('useAsync')


export interface UseAsyncConfig {
    /** Supply default data while the promise is pending */
    initialData?: any;

    /** Load automatically on mount */
    autoLoad?: boolean;

    /** An array of dependencies to watch and reload on change */
    deps?: any[];
}

type UseAsyncReturn = {
    loading: boolean;
    done: boolean;
    error: any;
    data: any;
    reload: Function;
    reset: Function;
}


type UseAsyncType = (callback: Function, config?: UseAsyncConfig) => UseAsyncReturn;





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
 * export interface UseAsyncConfig {
 *   // Supply default data while the promise is pending
 *   initialData?: any;
 *
 *   // Load automatically on mount 
 *   autoLoad?: boolean;
 *
 *   // An array of dependencies to watch and reload on change 
 *   deps?: any[];
 * }
 *
 * interface UseAsyncReturn {
 *   loading: boolean;
 *   done: boolean;
 *   error: any;
 *   data: any;
 *   reload: Function;
 *   reset: Function;
 * }
 */
const useAsync: UseAsyncType = (_callback: Function, _config: UseAsyncConfig = {}) => {

    const empty = {
        loading: false,
        done: false,
        error: null,
        data: null,
        reload: () => {},
        reset: () => {}
    }
    
    if(!_callback) return empty;

    const settings = useMemo(() => { return {
        deps: _config.deps                       ?? [],
        initialData: _config.initialData         ?? null,
        autoLoad: _config.autoLoad               ?? false
    }}, [_config])

    
    const [loading, setLoading] = useState(false)
    const [done, setDone] = useState(false)
    const [data, setData] = useState<any>(settings.initialData)
    const [error, setError] = useState<any>(null)
    const isLoading = useRef(false)
    const wasInit = useRef(false)
    const depsAtStart = useRef<any>(null)

    const reset = () => {
        setDone(false)
        setLoading(false)
        setError(null)
        setData(settings.initialData)
    }

    let _cb:Function = _callback



    const reload = useCallback((realDeps) => {
        if(loading || isLoading.current) return;

        isLoading.current = true

        setDone(false)
        setLoading(true)
        setError(null)
        setData(settings.initialData)

        _callback(...settings.deps)
            .then((data:any) => {
                if(loading || isLoading.current) return;
                
                setData(data)
                setError(null)
                // log('useAsync | data:', data)
            })
            .catch((err:any) => {
                if(loading || isLoading.current) return;
                setError(err)
                // log('useAsync | error:', err)
                setData(settings.initialData)
            })
            .finally(()=>{
                if(loading || isLoading.current) return;
                setLoading(false)
                setDone(true)
                // log('useAsync | done:', true)
                isLoading.current = false

                // console.log(`comparing deps:`, realDeps, depsAtStart.current)

                // if(JSON.stringify(realDeps) !== JSON.stringify(depsAtStart.current)){
                //     console.log(`Deps dont match...`)
                //     reload(depsAtStart.current)
                // }
            })


    }, [...settings.deps, _callback])


    useEffect(() => {
        settings.autoLoad && reload(settings.deps)
    }, [])

    useEffect(() => {
        console.log('>> Reload '+settings.deps)
        depsAtStart.current = settings.deps
        reload(settings.deps)

    }, settings.deps)
    

    return {data, loading, error, done, reload, reset}
}

export default useAsync
