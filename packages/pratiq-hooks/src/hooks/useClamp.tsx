import {useState, useCallback, useEffect, useMemo, useRef, SetStateAction} from 'react'
    
export interface I_UseClampConfig {
    min?: number;
    max?: number;
    value?: number;
}

export type T_UseClampReturn = {
    value: number,
    setValue: SetStateAction<number>,
    reset: () => void,
    min: number | null;
    max: number | null;
    initialValue: number;
}

export type UseClamp = (config: I_UseClampConfig) => T_UseClampReturn

/**
 * [@pratiq/hooks - useClamp](https://hooks.pratiq.dev/docs/hooks/useClamp)
 * 
 * useState with built-in clamped range and reset method
 * 
 * @param 
 * | type | keys | description |
 * |:--|:--|:--|
 * | `number` | **value** | The initial value 
 * | `number` | **min** | The minimum value used for clamping
 * | `number` | **max** | The maximum value used for clamping
 * 
 * 
 * @returns 
 * | type | keys | description |
 * |:--|:--|:--|
 * | `number` | **value** | The clamped value 
 * | `SetStateAction` | **update** | A function for setting the value 
 * | `()=>void` | **reset** | A function for resetting the value to the `initalValue`
 * 
 * ___________________________________________
 * 
 * @interface
 * ```
 * export interface I_UseClampConfig {
 *     min?: number;
 *     max?: number;
 *     value?: number;
 * }
 * 
 * export type T_UseClampReturn = [
 *     value: number,
 *     setValue: SetStateAction<number>,
 *     reset: () => void,
 * ]
 * 
 * const useClamp = (config: I_UseClampConfig) => T_UseClampReturn
 * ```
 * 
 * ___________________________________________
 * 
 * @example
 * const [value, setValue, reset] = useClamp({
 *   min: 0,
 *   max: 10,
 *   value: 5
 * })
 * 
 */



const useClamp = (config: I_UseClampConfig): T_UseClampReturn => {

    const settings = useMemo(() => ({
        min: config && typeof config.min === 'number' ? config.min : null,
        max: config && typeof config.max === 'number' ? config.max : null,
        value: config && typeof config.value === 'number' ? config.value : 0,
    }), [config])

    const [actual, setActual] = useState(settings.value)
    const wasInit = useRef(false)

    const handleValue: SetStateAction<number> = useCallback((x) => {
        if(typeof x === 'function'){
            let _x:number = x(actual) ?? actual
            if(typeof settings.max === 'number' && _x && _x > settings.max) setActual(settings.max) 
            else if(typeof settings.min === 'number' &&  _x < settings.min) setActual(settings.min) 
            else if (typeof _x === 'number') setActual(_x) 
        }

        if(typeof x === 'number'){
            if(typeof settings.max === 'number'  && x > settings.max) setActual(settings.max) 
            else if(typeof settings.min === 'number'  && x < settings.min) setActual(settings.min) 
            else setActual(x) 
        }
        
        return x
    }, [config])

    const reset = () => {
        handleValue(settings.value)
    }
    
    useEffect(() => {
        if(wasInit.current) return;
        handleValue(settings.value)
        wasInit.current = true
    }, [config, settings, handleValue])

    return {
        value: actual, 
        setValue: handleValue, 
        reset,
        min: settings.min,
        max: settings.max,
        initialValue: settings.value
    }
}

export default useClamp