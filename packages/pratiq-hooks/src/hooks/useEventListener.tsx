import React, {useRef, useEffect, useState} from 'react'
import isBrowser from '../utils/isBrowser.js'
    
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
type T_UseEventListener = (event:string, callback:Function, element: any) => [
    isEnabled:boolean,
    toggle: () => void
]

const useEventListener: T_UseEventListener = (event: string, callback: Function, element: any) => {
    if(!isBrowser()) return [false, () => {}];
    const [hasListener, setHasListener] = useState(false)
    
    const callbackRef = useRef<any>(callback)
    const handlerRef = useRef<any>(null)
    const elementRef = useRef<any>(null)

    const removeListener = () => {
        try{
            if(elementRef.current && handlerRef.current && callbackRef.current){
                elementRef.current.removeEventListener(event, handlerRef.current)
            }
            setHasListener(false)
        }catch(err){}
    }


    const addListener = () => {
        try{
            if(!element && typeof window !== 'undefined'){ element = window }
            else{ return; }
            elementRef.current = element
            handlerRef.current = (e: Event) => callbackRef.current(e)
            elementRef.current.addEventListener(event, handlerRef.current)
            setHasListener(true)
        }catch(err){}
    }

    const toggle = () => hasListener ? removeListener() : addListener()

    const listen = useRef((element: any) => {
        if (!element) return;
        elementRef.current = element;
        addListener();
    });
    
    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    useEffect(() => {
        removeListener()
        addListener()
        return () => elementRef.current.removeEventListener(event, handlerRef.current)
    }, [event, element])

    return [ hasListener, toggle ]
}

export default useEventListener