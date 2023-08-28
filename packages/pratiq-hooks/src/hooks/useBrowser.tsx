import { useState, useEffect } from 'react'
     

/**
 * [useBrowser](https://hooks.pratiq.dev/docs/hooks/useBrowser)
 * 
 * Returns true after the first render / component mount.
 * 
 * ________________________________________________________________________
 * @returns
 * | keys                  | type                           | description                                              |
 * |:--                    |:--                             |:--                                                       |
 * | **browser**           | `boolean`                      | True after first render/component mount                       |
 * ________________________________________________________________________
 * @interface
 * ```
 * export namespace UseBrowser {
 *     export interface Hook {
 *         (): boolean;
 *     }
 * }
 * ```
 * ________________________________________________________________________
 * @example
 * const browser = useBrowser();
 * 
 * <p>{ browser ? 'In the browser' : 'Not in the browser' }</p>
 */




const useBrowser: UseBrowser.Hook = (): boolean => {
    const [browser, setBrowser] = useState(false);

    useEffect(() => {
        setBrowser(true)
    }, [])

    return browser
}


export namespace UseBrowser {
    export interface Hook {
        (): boolean;
    }
}



export default useBrowser