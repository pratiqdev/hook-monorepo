import {useState, useEffect} from 'react'
import isBrowser from '../utils/isBrowser.js'  


/**
 * useScript()
 * ---
 * 
 * Load a script after component is mounted to the DOM
 * 
 * ---
 * 
 * @param {string} url - the state value
 * @returns void
 * 
 * @example
 * // standard usage
 * const {ready, loading, error} = useScript('https://script.org')
 * // most simple usage
 * const {ready} = useScript('https://script.org')
 */

const useScript = (url: string) => {
    if (!isBrowser()) return;

    const useAsync = (callback: Function, dependencies: any[] = []) => {
        const [loading, setLoading] = useState(false)
        const [error, setError] = useState<any>(undefined)
        const [ready, setReady] = useState(false)
    
        useEffect(() => {
            setLoading(true)
            setError(undefined)
            setReady(false)
            callback()
                .then(() => setReady(true))
                .catch(setError)
                .finally(()=>setLoading(false))
        // eslint-disable-next-line
        }, [...dependencies, callback])
    
        return {loading, ready, error}
    }


    return useAsync(() => {
        const script = document.createElement('script')
        script.src = url
        script.async = true

        return new Promise((resolve, reject) => {
            script.addEventListener('load', resolve )
            script.addEventListener('error', (e)=> reject(JSON.stringify(e)) )
            document.body.appendChild(script)
        })

    }, [url])

}

export default useScript