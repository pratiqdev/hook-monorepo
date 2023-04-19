import { useState, useEffect } from 'react'
    
/**
* useAsync()
* ---
* 
* useEffect hook that doesn't run on the first call
* 
* @param {string} key - the key for the storage item
* @returns void
* 
* @example
* 
*/ 

const useAsync = (callback: any, dependencies: any[] = []) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any>(undefined)
    const [value, setValue] = useState<any>(undefined)

    // const cbMemo = useCallback(() => {
    //     setLoading(true)
    //     setError()
    //     setValue()
    //     callback()
    //         .then(setValue)
    //         .catch(setError)
    //         .finally(()=>setLoading(false))
    // }, dependencies)

    const deps = [...dependencies]

    useEffect(() => {
        setLoading(true)
        setError(undefined)
        setValue(undefined)
        callback()
            .then(setValue)
            .catch(setError)
            .finally(()=>setLoading(false))
    }, [deps, callback])

    return {value, loading, error}
}

export default useAsync




//! Added extra step to convert array of dependencies to deps object