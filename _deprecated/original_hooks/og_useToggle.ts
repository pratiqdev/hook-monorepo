import { useState } from 'react'

/**
 * useToggle()
 * ---
 * 
 * set or toggle a boolean
 * 
 * @param {boolean} initialValue
 * @returns boolean
 * 
 * @example
 * // use an initial value like useState
 * const [value, setValue] = useToggle(true) 
 * // set a value to false
 * setValue(false) 
 * // toggle the value
 * setValue() 
 */

const useToggle = (initialValue: boolean) => {
    const [value, setValue] = useState(initialValue)

    const toggleValue = (v: any) => {
        setValue(currentValue => 
            typeof v === "boolean" ? v : !currentValue
        )
    }

    return [value, toggleValue]
}

export default useToggle