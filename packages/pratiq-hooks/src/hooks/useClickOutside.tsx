import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import isBrowser from '../utils/isBrowser.js'

type T_UseClickOutside = (callback: (e: MouseEvent) => any) => (el:any) => unknown;

/**
 * [@pratiq/hooks - useClickOutside](https://hooks.pratiq.dev/docs/hooks/useClickOutside)
 * 
 * Handle click events outside of referenced elements
 * 
 * @param
 * | type | keys | description |
 * |:--|:--|:--|
 * | `function` | **callback** | The callback function to invoke
 * 
 * 
 * @returns 
 * | type | keys | description |
 * |:--|:--|:--|
 * | `RefObject` | **clickOut** | A function used as a react ref for adding the current element  
 * 
 * 
 * ___________________________________________
 * 
 * @interface
 * ```
 * export interface I_UseCountdownConfig {   //  example
 *   duration?: number;                        //  10_000
 *   interval?: number;                        //  100
 *   callbacks?: { [key: string]: Function };  //  { 5000: () => fn() }
 * }
 * 
 * export interface I_CountdownTimeObject {
 *   days: number;
 *   hours: number;
 *   minutes: number;
 *   seconds: number;
 *   realSeconds: number;
 *   milliseconds: number;
 *   total: number;
 * }
 * 
 * export interface I_UseCountdownReturn{
 *   time: <I_CountdownTimeObject>;
 *   start: Function;
 *   stop: Function;
 *   reset: Function;
 *   done: boolean;
 *   started: boolean;
 *   running: boolean;
 *   interval: number;
 *   duration: number;
 * };
 * ```
 * 
 * ___________________________________________
 * 
 * @example
 * const [isOpen, setIsOpen] = useState<boolean>(false)
 * const clickOut = useClickOutside(() => setIsOpen(false) )
 * <button ref={clickOut}>Open</button>
 */


const useClickOutside: T_UseClickOutside = (callback: (e: MouseEvent) => any) => {
    if(!isBrowser()) return () => {};

    const refArr:any[] = []

    const handler = (e: MouseEvent) => {
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