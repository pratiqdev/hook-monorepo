import {useState, useEffect} from 'react'
    
/**
* useValidCss()
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

const useValidCss = (cssProp: string, cssValue: any) => {
    const [value, setValue] = useState(cssValue)
    const [isValid, setIsValid] = useState(false)
    
    useEffect(() => {
        if(!value){
            setIsValid( CSS.supports(cssProp) ? true : false )
        }else{
            setIsValid( CSS.supports(cssProp, value) ? true : false )
        }
    }, [cssValue, cssProp, value])

    return [value, setValue, isValid]
}

export default useValidCss