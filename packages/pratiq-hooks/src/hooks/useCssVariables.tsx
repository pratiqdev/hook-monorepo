import {useState, useCallback, useEffect} from 'react'
    
export type RefOrElement = HTMLElement | React.RefObject<HTMLElement>

export interface I_UseCssVariablesConfig {
    /** A string used to match css properties */
    match?: string;
    /** The element to parse styles from */
    element?: RefOrElement;
}


export type T_UseCssVariablesReturn = [
    /** The object containing css properties and values */
    cssMap: { [key:string]: string },
    /** A function to force refresh the css properties and values */
    update: () => void
]

export type UseCssVariables = (match?:string, element?: RefOrElement) => T_UseCssVariablesReturn


/**
 * [@pratiq/hooks - useCssVariables](https://hooks.pratiq.dev/docs/hooks/useCssVariables)
 * 
 * Load and parse css variables from the provided or root element.
 * 
 * @param {string} match - A string used to match css properties
 * @param {ref|el} element - The element to parse styles from
 * 
 * ---
 * 
 * @returns
 * 
 * | keys | type | description |
 * |:--|:--|:--|
 * | cssMap |  `Object` | The object containing css properties and values
 * | update | `()=>void` | Force refresh the css properties and values
 * ---
 * 
 * @interface
 * ```
 * export type RefOrElement = HTMLElement | React.RefObject<HTMLElement>
 * 
 * export interface I_UseCssVariablesConfig {
 *      // A string used to match css properties
 *      match?: string;
 *      // The element to parse styles from
 *      element?: RefOrElement;
 * }
 * 
 * export type T_UseCssVariablesReturn = [
 *      // The object containing css properties and values
 *      cssMap: { [key:string]: string },
 *      // A function to force refresh the css properties and values
 *      update: () => void
 * ]
 * 
 * export type UseCssVariables = (match?:string, element?: RefOrElement) => T_UseCssVariablesReturn
 * ```
 * ---
 * 
 * @example
 * const elementRef = useRef()
 * const [css, update] = useCssVariables('--cust', elementRef)
 */



const useCssVariables:UseCssVariables = (match: string = '', element?: RefOrElement) => {
    const [actual, setActual] = useState({})

    const update = useCallback(() => {
        let el: any;
        if(element){
            if('current' in element){
                el = element.current
            }else{
                el = element
            }
        }
        else{
            if(typeof document !== 'object' || !('documentElement' in document)) return [{}, () => {}]
            el = element ?? document.documentElement
        }

        if(match === ''){
            setActual(getComputedStyle(el))
        }else{
            const cssMap:any = {}
            
            Object.values(getComputedStyle(el))
            .filter(item => item.includes(match))
            .forEach(item => { cssMap[item] = getComputedStyle(el).getPropertyValue(item) })
            
            setActual(cssMap)
        }
    }, [match])

    
    useEffect(() => {
        update()
    }, [match])

    return [actual, update]
}

export default useCssVariables