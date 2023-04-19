import {useState, useRef, useEffect} from 'react'
    
/**
 * useStable()
 * ---
 * 
 * useEffect hook that doesn't run on the first call
 * 
 * @param {string} key - the key for the storage item
 * @param {any} initialValue - initial state value
 * @param {function} get - the function used to get the value
 * @param {function} set - the function used to set the value
 * @returns void
 * 
 * @example
 * 
 */

const useStable = (initialValue: any, key: string | undefined) => {
    const storage = window.localStorage
    const [trigger, setTrigger] = useState(false)

    const value = useRef(key ? null : initialValue)
    
    


    const setValue = (newValue: any) => {
        key && storage.setItem(key, JSON.stringify(newValue))
        value.current = newValue
        setTrigger(!trigger)
    }

    const remove = () => { 
        key && storage.removeItem(key) 
        setTrigger(!trigger)
    }

    const reset = () => {
        key && storage.setItem(key, JSON.stringify(initialValue))
        value.current = initialValue
        setTrigger(!trigger)
    }

    useEffect(()=>{
        let jsonValue

        if(key){
            jsonValue = storage.getItem(key)
        }
        
        if (key && jsonValue != null){
            value.current = JSON.parse(jsonValue)
        }else{
            if (typeof initialValue === 'function'){
                value.current = initialValue()
                key && storage.setItem(key, JSON.stringify(initialValue()))
            }else{
                value.current = initialValue 
                key && storage.setItem(key, JSON.stringify(initialValue))
            }
        }
    }, [key, initialValue, storage])

    return [value.current, setValue, reset, remove]
}

export default useStable