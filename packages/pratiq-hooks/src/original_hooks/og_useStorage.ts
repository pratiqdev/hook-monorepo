import {useState, useEffect, useRef} from 'react'
    
/**
 * useStorage()
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

const useStorage = (key: string, initialValue: any, storageObject: any) => {

    const [value, setValue] = useState(()=>{
        const jsonValue = storageObject.getItem(key)

        if (jsonValue != null) return JSON.parse(jsonValue)

        if (typeof initialValue === 'function'){
            return initialValue()
        }else{
            return initialValue
        }
    })



    const remove = () => { 
        storageObject.removeItem(key);
    }

    useEffect(()=>{
        storageObject.setItem(key, JSON.stringify(value))
    }, [key, value, storageObject])

    return [value, setValue, remove]
}

export const useLocalStorage = (key: string, initialValue: any) => {
    return useStorage(key, initialValue, window.localStorage)
}

export const useSessionStorage = (key: string, initialValue: any) => {
    return useStorage(key, initialValue, window.sessionStorage)
}
