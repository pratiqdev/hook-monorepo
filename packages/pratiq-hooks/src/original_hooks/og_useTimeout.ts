import { useCallback, useRef, useEffect } from 'react'

/**
 * useTimeout()
 * ---
 * 
 * Run a timeout on component mount. Optionally clear or reset the timeout
 * 
 * @param {function} callback
 * @param {number} delay
 * 
 * @example
 * 
 * // invoke myFunction after 1000ms
 * useTimeout(myFunction, 1000)
 * // desctructure reset and clear
 * const {clear, reset} = useTimeout(myFunction, 1000)
 * 
 */

const useTimeout = (callback: Function, delay: number) => {
    const callbackRef = useRef(callback)
    const timeoutRef = useRef<any>()

    useEffect(()=>{
        callbackRef.current = callback
    }, [callback])

    const set = useCallback(()=>{
        timeoutRef.current = setTimeout(()=>callbackRef.current(), delay)
    }, [delay])
    
    const clear = useCallback(()=>{
        timeoutRef.current && clearTimeout(timeoutRef.current)
    }, [])

    useEffect(() => {
        set()
        return clear
    }, [delay, set, clear])

    const reset = useCallback(() => {
        console.log(`useTimeout | reset`)
        clear()
        set()
    }, [clear, set])

    return { reset, clear }
}

export default useTimeout