import {useRef, useEffect, useCallback} from 'react'

/**
 * useInterval()
 * ---
 * 
 * Run a timeout on component mount. Optionally clear or reset the timeout
 * 
 * @param {function} callback
 * @param {number} delay
 * 
 * @example
 * 
 * useTimeout(myFunction, 1000)
 * const {clear, reset} = useTimeout(myFunction, 1000)
 * 
 */

export interface I_UseIntervalOptions {
    autoStart?: boolean;
    callbackOnClear?: boolean;
}

const useInterval = (callback: any = () => {}, delay: number = 1000, options: I_UseIntervalOptions = {}) => {
    const callbackRef = useRef(callback)
    const intervalRef = useRef<any>()
    const incrementRef = useRef(0)

    useEffect(()=>{
        callbackRef.current = callback
    }, [callback])

    const set = useCallback(()=>{
        intervalRef.current = setInterval(()=>{
            incrementRef.current = incrementRef.current + 1
            callbackRef.current(incrementRef.current)
        }, delay)
    }, [delay])
    
    const clear = useCallback(()=>{
        incrementRef.current = 0
        intervalRef.current && clearInterval(intervalRef.current)
    }, [])

    useEffect(() => {
        options?.autoStart && set()
        return clear
    }, [delay, set, clear])

    const reset = useCallback(() => {
        clear()
        set()
    }, [clear, set])

    return { reset, stop: clear }
};

export default useInterval