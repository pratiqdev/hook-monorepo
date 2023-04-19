import {useState, useCallback, useEffect} from 'react'
    


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


let useClamp: (obj: {min?: number, max?: number, value?: number}) => any;

useClamp = ({min, max, value}) => {
    const [actual, setActual] = useState(value)

    const handleValue = useCallback((x: number | undefined) => {
        if(max && x && x > max){ setActual(max) }
        else if(min && x && x < min){ setActual(min) }
        else{ setActual(x) }
    }, [min, max])
    
    useEffect(() => {
        handleValue(value)
    }, [min, max, value, handleValue])

    return [actual, handleValue]
}

export default useClamp