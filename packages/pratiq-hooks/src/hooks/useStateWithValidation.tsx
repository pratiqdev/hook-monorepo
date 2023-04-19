import {useState, useCallback, useEffect, useMemo} from 'react'
    
/**
 * useState with validation callback handler
 * 
 * @param {function} validator - the function used for validation
 * @param {any} initialValue - initial state value
 * @returns state, setter, and boolean isValid
 * 
 * 
 */

export type T_UseStateWithValidationConfig = {
    validator?: RegExp | string | ((value:any) => boolean);
    value?: any;
}

export type T_UseStateWithValidation = <T>(config?: T_UseStateWithValidationConfig) => {
    value: T;
    setValue: (v:any) => void;
    isValid: boolean;
    lastValidValue: any;
}


const useStateWithValidation = <T,>(config: T_UseStateWithValidationConfig = {}) => {
    
    type T_UseStateWithValidationReturn = {
        value: T;
        setValue: (v:any) => void;
        isValid: boolean;
        lastValidValue: any;
    }

    const settings = useMemo(() => ({
        validator:  config.validator    ?? function(){},
        value:      config.value        ?? null
    }), [config])


    const handleValidate = (v: any) => {
        return typeof settings.validator === 'function' 
                ? settings.validator(v) 
                : settings.validator instanceof RegExp
                    ? v.test(settings.validator)
                    : v === settings.validator
    }


    const [value, setValue] = useState<T>(settings.value)
    const [lastValidValue, setLastValidValue] = useState<null | T>(null)
    const [isValid, setIsValid] = useState<boolean>(() => handleValidate(settings.value))


    const handleChange = useCallback(newValue => {
        const v = typeof newValue === 'function' ? newValue(value) : newValue
        setValue(v)
        let isV = handleValidate(v)
        setIsValid(isV)
        isV && setLastValidValue(v)
    }, [settings.validator, value])


    useEffect(()=>{
        let isV = handleValidate(value)
        setIsValid(isV)
        isV && setLastValidValue(value)
    },[])

    // return [value, handleChange, isValid, lastValidValue]
    return {
        value,
        setValue: handleChange,
        isValid,
        lastValidValue
    }
}

export default useStateWithValidation