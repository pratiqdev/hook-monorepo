import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { isBrowser } from '@pratiq/utils'


/**
 * [useClickOutside](https://hooks.pratiq.dev/docs/hooks/useClickOutside)
 * 
 * Handle click events outside of referenced elements
 * ________________________________________________________________________
 * @param
 * | type | keys | description |
 * |:--|:--|:--|
 * | `function` | **callback** | The callback function to invoke
 * 
 * @returns 
 * | type | keys | description |
 * |:--|:--|:--|
 * | `RefObject` | **clickOut** | A function used as a react ref for adding the current element
 * ________________________________________________________________________
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
 * ________________________________________________________________________
 * @example
 * const [isOpen, setIsOpen] = useState<boolean>(false)
 * const clickOut = useClickOutside(() => setIsOpen(false) )
 * <button ref={clickOut}>Open</button>
 */



export namespace UseClickOutside {
    export type Callback = (e: MouseEvent) => any;
    export type Return = (el: any) => unknown;

    export interface Hook {
        (callback: Callback): Return;
        (callback: Callback, someOption: boolean): Return; // An overload with an additional parameter
        // Add more overloads as needed...
    }
}


const useClickOutside: UseClickOutside.Hook = (callback: UseClickOutside.Callback): UseClickOutside.Return => {
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