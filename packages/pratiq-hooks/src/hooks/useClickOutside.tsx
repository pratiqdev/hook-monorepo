import { useEffect, useRef } from 'react'
import { isBrowser } from '@pratiq/utils'

/**
 * [useClickOutside](https://hooks.pratiq.dev/docs/hooks/useClickOutside)
 * 
 * Handle click events outside of referenced elements
 * ________________________________________________________________________
 * @param
 * | keys           | type          | description                       |
 * | :--            |:--            |:--                                |
 * | **callback**   | `() => void`  | The callback function to invoke   |
 * ________________________________________________________________________
 * @returns 
 * | keys           | type                                  | description |
 * |:--             |:--                                    |:--                                                               |                           
 * | **clickOut**   | `(el: HTMLElement | null) => void`    | A function used as a react ref for adding the current element    |           
 * ________________________________________________________________________
 * @interface
 * ```
 * export namespace UseClickOutside {
 *   export type Callback = (e: MouseEvent) => void;
 *   export type Return = (el: HTMLElement | null) => void;
 *   export interface Hook {
 *     (): Return;
 *     (callback: Callback): Return;
 *   }
 * }
 * ```
 * ________________________________________________________________________
 * @example
 * const [isOpen, setIsOpen] = useState<boolean>(false)
 * 
 * const clickOut = useClickOutside(() => {
 *  setIsOpen(false)
 * })
 * 
 * <button ref={clickOut} onClick={() => setIsOpen(true)}>Open</button>
 * <button ref={clickOut}>Safe to Click</button>
 */




const useClickOutside: UseClickOutside.Hook = (callback: UseClickOutside.Callback = (e) => {}): UseClickOutside.Return => {
    if(!isBrowser() || !callback) return (el: HTMLElement | null) => {};

    const refArr = useRef<(HTMLElement | null)[]>([]);

    const handler = (e: MouseEvent) => {
        // console.log(`Running handler...`)
        refArr.current.every(ref => !ref || !ref.contains(e.target as HTMLElement)) && callback(e)
    }

    const clickOut = (el: HTMLElement | null) => {
        refArr.current.push(el)
    }

    useEffect(() => {
        window.addEventListener('click', handler)
        return () => window.removeEventListener('click', handler)
    })


    return clickOut

}

export namespace UseClickOutside {
    export type Callback = (e: MouseEvent) => void;
    export type Return = (el: HTMLElement | null) => void;
    export interface Hook {
        (): Return;
        (callback: Callback): Return;
    }
}


export default useClickOutside