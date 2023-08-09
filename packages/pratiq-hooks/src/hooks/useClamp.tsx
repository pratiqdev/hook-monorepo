import {useState, useCallback, useEffect, useMemo, useRef, SetStateAction, Dispatch} from 'react'
    
export type I_UseClampConfig = {
    min?: number;
    max?: number;
    value?: number;
}

export type T_UseClampReturn = {
    value: number,
    setValue: Dispatch<SetStateAction<number>>,
    reset: () => void,
    min: number | undefined;
    max: number | undefined;
    setMin: Dispatch<SetStateAction<number | undefined>>,
    setMax: Dispatch<SetStateAction<number | undefined>>,
    initialValue: number;
    expectedValue: number
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
    // Use state for min, max, and expected value so they can be updated dynamically
    const [min, setMin] = useState(config?.min);
    const [max, setMax] = useState(config?.max);
    const [expectedValue, setExpectedValue] = useState<number>(config?.value || 0);
    
    // Function to calculate the clamped value based on min, max, and expected value
    const clampValue = (value: number) => {
        if (typeof max === 'number' && value > max) return max;
        if (typeof min === 'number' && value < min) return min;
        return value;
    };
    
    const [clampedValue, setClampedValue] = useState(() => clampValue(expectedValue));

    const handleClamp = (cb: SetStateAction<number>) => {
        if(typeof cb === 'function'){
            setClampedValue(clampValue(cb(clampedValue)))
        }else{
            setClampedValue(clampValue(cb))
        }
    }
    

    // Update the clamped value whenever the expected value or bounds change
    useEffect(() => {
        setClampedValue(clampValue(expectedValue));
    }, [expectedValue, min, max]);

    useEffect(() => setMin(config?.min), [config?.min]);
    useEffect(() => setMax(config?.max), [config?.max]);
    useEffect(() => setExpectedValue(config?.value || 0), [config?.value]);


    // Function to reset the value to its initial state
    const reset = () => {
        setExpectedValue(config?.value || 0);
        setClampedValue(clampValue(config?.value || 0))
    };

    return {
        value: clampedValue,
        setValue: handleClamp,
        reset,
        min,
        setMin, // Function to set a new minimum bound
        max,
        setMax, // Function to set a new maximum bound
        initialValue: config?.value || 0,
        expectedValue,
    };
};


// const useClamp = (config: I_UseClampConfig): T_UseClampReturn => {

//     const settings = useMemo(() => ({
//         min: config && typeof config.min === 'number' ? config.min : null,
//         max: config && typeof config.max === 'number' ? config.max : null,
//         value: config && typeof config.value === 'number' ? config.value : 0,
//     }), [config?.min, config?.max, config?.value])

//     const [actual, setActual] = useState(settings.value)

//     const handleValue: SetStateAction<number> = useCallback((x) => {
//         if(typeof x === 'function'){
//             let _x:number = x(actual) ?? actual
//             if(typeof settings.max === 'number' && _x && _x > settings.max) setActual(settings.max) 
//             else if(typeof settings.min === 'number' &&  _x < settings.min) setActual(settings.min) 
//             else if (typeof _x === 'number') setActual(_x) 
//         }

//         if(typeof x === 'number'){
//             if(typeof settings.max === 'number'  && x > settings.max) setActual(settings.max) 
//             else if(typeof settings.min === 'number'  && x < settings.min) setActual(settings.min) 
//             else setActual(x) 
//         }
        
//         return x
//     }, [actual, settings.min, settings.max])

//     const reset = () => {
//         handleValue(settings.value)
//     }
    
//     useEffect(() => {
//         handleValue(settings.value)
//     }, [handleValue, settings.value, settings.max, settings.min])

//     return {
//         value: actual, 
//         setValue: handleValue, 
//         reset,
//         min: settings.min,
//         max: settings.max,
//         initialValue: settings.value
//     }
// }

export default useClamp