import {useRef, useEffect} from 'react'
    
/**
* useEventListener()
* ---
* 
* useState that returns if CSS prop/value is valid
* 
* @param {string} cssProp - the prop used to validate the value
* @param {string} cssString - the prop used to validate the value
* @returns A stateful value and true if valid

* @example
* 
*/

const useEventListener = (eventType: string, callback: Function, element: any = window) => {
    const callbackRef = useRef<any>(callback)
    
    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    useEffect(() => {
        const handler = (e: Event) => callbackRef.current(e)
        element.addEventListener(eventType, handler)
        return () => element.removeEventListener(eventType, handler)
    }, [eventType, element])
}

export default useEventListener