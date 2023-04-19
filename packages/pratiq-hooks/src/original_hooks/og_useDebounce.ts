import {useRef, useCallback, useEffect} from 'react'

/**
 * useDebounce()
 * ---
 * 
 * Debounce the callback function provided.
 * Is invoked anytime a dependency changes
 * 
 * @param {function} callback
 * @param {number} delay
 * @param {array} dependencies
 * @returns void
 * 
 * @example
 * 
 * useDebounce(myFunction, 1000, [count])
 */

const useDebounce = (callback: Function, delay: number, dependencies: any) => {
    const callbackRef = useRef<any>(callback)
    const timeoutRef = useRef<any>()

    const set = useCallback(()=>{
        timeoutRef.current = setTimeout(()=>callbackRef.current(), delay)
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

    useEffect(reset, [...dependencies, reset])
    useEffect(clear)
}

export default useDebounce