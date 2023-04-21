import {useState, useCallback, useEffect, useMemo, useRef} from 'react'
    
//~ IN DEVELOPMENT

export interface I_UseClampConfig {
    min?: number;
    max?: number;
    value?: number;
}

/**
 * useState with built-in clamped range and reset method
 * 
 * ---
 * 
 * @param {string} value - the state value
 * @param {string} min - the minimum used for clamp
 * @param {string} max - the maximum used for clamp
 * @returns {number}
 * 
 * @example
 * cosnt [value, setValue, reset] = useClamp({
 *   min: 0,
 *   max: 10,
 *   value: 5
 * })
 * 
 */



const useClamp = (config: I_UseClampConfig) => {

    const settings = useMemo(() => ({
        min: config.min     ?? undefined,
        max: config.max     ?? undefined,
        value: config.value ?? 0,
    }), [config])

    const [actual, setActual] = useState(settings.value)
    const wasInit = useRef(false)

    const handleValue = useCallback((x: number | Function) => {
        if(typeof x === 'function'){
            let _x = x(actual) ?? actual
            if(typeof settings.max === 'number' && _x && _x > settings.max) setActual(settings.max) 
            else if(typeof settings.min === 'number' &&  _x < settings.min) setActual(settings.min) 
            else if (typeof _x === 'number') setActual(_x) 
        }

        if(typeof x === 'number'){
            if(typeof settings.max === 'number'  && x > settings.max) setActual(settings.max) 
            else if(typeof settings.min === 'number'  && x < settings.min) setActual(settings.min) 
            else setActual(x) 
        }

    }, [config])

    const reset = () => {
        handleValue(settings.value)
    }
    
    useEffect(() => {
        if(wasInit.current) return;
        handleValue(settings.value)
        wasInit.current = true
    }, [config, settings, handleValue])

    return [actual, handleValue, reset]
}

export default useClamp