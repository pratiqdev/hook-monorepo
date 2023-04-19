import {useState} from 'react'
    
/**
* useClipboard()
* ---
* 
* useState that returns if CSS prop/value is valid
* 
* @param {string} cssProp - the prop used to validate the value
* @param {string} cssString - the prop used to validate the value
* @returns A stateful value and true if valid

* @example
* 
*/

const useClipboard = () => {
    const [value, setValue] = useState('')
    const [success, setSuccess] = useState(false)


    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        .then(() => {
            setValue(text)
            setSuccess(true)
        })
        .catch(()=> {
            setValue('')
            setSuccess(false) 
        })

    }

    const reset = () => {
        navigator.clipboard.writeText('')
        setValue('')
        setSuccess(false)
    }

    return {
        copy:copyToClipboard, 
        value, 
        success, 
        reset
    }
}

export default useClipboard