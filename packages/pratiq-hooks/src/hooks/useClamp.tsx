import {useState, useCallback, useEffect, useMemo, useRef} from 'react'
    
//~ IN DEVELOPMENT

/**
 * useClamp()
 * ---
 * 
 * useState with built-in clamp
 * 
 * ---
 * 
 * @param {string} value - the state value
 * @param {string} min - the minimum used for clamp
 * @param {string} max - the maximum used for clamp
 * @returns value
 * @example
 * 
 */

export interface I_UseClampConfig {
    min?: number;
    max?: number;
    value?: number;
}



const useClamp = (config: I_UseClampConfig) => {

    const settings = useMemo(() => { return {
        min: config.min     ?? undefined,
        max: config.max     ?? undefined,
        value: config.value ?? 0,
    }}, [config])

    const [actual, setActual] = useState(settings.value)
    const wasInit = useRef(false)

    const handleValue = useCallback((x: number | Function) => {
        if(typeof x === 'function'){
            let _x = x(actual) ?? actual
            if(settings.max && _x && _x > settings.max) setActual(settings.max) 
            else if(settings.min && _x && _x < settings.min) setActual(settings.min) 
            else setActual(_x) 
        }

        if(typeof x === 'number'){
            if(settings.max && x > settings.max) setActual(settings.max) 
            else if(settings.min && x < settings.min) setActual(settings.min) 
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