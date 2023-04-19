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

const useClipboard= () => {
    const [value, setValue] = useState('')
    const [success, setSuccess] = useState(false)


    const copyToClipboard = (text: any) => {
        navigator.clipboard.writeText(text)
        .then(() => {
            setValue(text)
            setSuccess(true)
        })
        .catch(()=> setSuccess(false) )

    }

    return [copyToClipboard, success, value]
}

export default useClipboard