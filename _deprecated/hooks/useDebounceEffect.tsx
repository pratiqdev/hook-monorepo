import {useRef, useCallback, useEffect} from 'react'

/**
 * useDebounce()
 * ---
 * 
 * Debounce the callback function provided.
 * Is invoked anytime a dependency changes
 * 
 * @param {function} callback
 * @param {array} dependencies
 * @param {number} delay
 * @returns void
 * 
 * @example
 * 
 * useDebounce(myFunction, 1000, [count])
 */

const useDebounceEffect = (callback: Function, dependencies: any[] = [], delay: number = 250, maxWait?: number) => {
    const callbackRef = useRef<any>(callback)
    const timeoutRef = useRef<any>()
    const eventualRef = useRef<any>()

    const handleEventual = () => {
        if(!maxWait || typeof maxWait !== 'number') return;

        if(!eventualRef.current){
            eventualRef.current = setTimeout(()=>{
                callbackRef.current()
                timeoutRef.current && clearTimeout(timeoutRef.current)
                eventualRef.current && clearTimeout(eventualRef.current)
                eventualRef.current = null
            }, maxWait)
        }
    }

    const set = useCallback(()=>{
        clear()
        handleEventual()
        timeoutRef.current = setTimeout(()=>{
            callbackRef.current()
            eventualRef.current && clearTimeout(eventualRef.current)
            eventualRef.current = null
        }, delay)
    }, [delay])
    
    const clear = useCallback(()=>{
        timeoutRef.current && clearTimeout(timeoutRef.current)
    }, [])
    
    const reset = useCallback(() => {
        clear()
        set()
    }, [clear, set])


    useEffect(()=>{
        callbackRef.current = callback
    }, [callback])

    useEffect(() => {
        set()
        return clear()
    }, [delay, set, clear])

    useEffect(clear)
    useEffect(reset, [...dependencies, reset])
    useEffect(set, dependencies)
}

export default useDebounceEffect