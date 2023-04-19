import {useState, useCallback} from 'react'
    
/**
 * useStateWithValidation()
 * ---
 * 
 * useState with validation callback handler
 * 
 * @param {function} validator - the function used for validation
 * @param {any} initialValue - initial state value
 * @returns state, setter, and boolean isValid
 * 
 * @example
 * 
 */

const useStateWithValidation = (validator: Function, initialValue: any = undefined) => {
    const [value, setValue] = useState(initialValue)
    const [isValid, setIsValid] = useState(() => typeof validator === 'function' ? validator(value) : 'unvalidated')

    const handleChange = useCallback(newValue => {
        const v = typeof newValue === 'function' ? newValue(value) : newValue
        setValue(v)
        setIsValid(validator(v))
    }, [validator, value])

    return [value, handleChange, isValid]
}

export default useStateWithValidation