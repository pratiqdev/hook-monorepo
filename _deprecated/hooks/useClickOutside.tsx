import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import isBrowser from '../utils/isBrowser'
    
/**
* useClickOutside()
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

type T_UseClickOutside = (callback: (e:React.MouseEvent) => void) => (el:any) => void;

const useClickOutside: T_UseClickOutside = (callback: (e:React.MouseEvent) => void) => {
    if(!isBrowser()) return () => {};

    const refArr:any[] = []

    const handler = (e: Event) => {
        console.log(`Running handler...`)
        refArr.every(ref => !ref || !ref.contains(e.target)) && callback(e)
    }

    const clickOut = (el:any) => {
        refArr.push(el)
    }

    useEffect(() => {
        window.addEventListener('click', handler)
        return () => window.removeEventListener('click', handler)
    })


    return clickOut

}

export default useClickOutside