import {useState, useEffect} from 'react'
    
/**
* useGeolocation()
* ---
* 
* useState that returns if CSS prop/value is valid
* 
* @param {string} options - options passed to navigator
* @returns geolocation data

* @example
* 
*/

const useGeolocation = (options: any) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any>(null)
    const [data, setData] = useState({})

    useEffect(()=>{
        const successHandler = (e: any) => {
            setLoading(false)
            setError(null)
            setData(e.coords)
        }

        const errorHandler = (e:any) => {
            setLoading(false)
            setError(e.message)
        }

        navigator.geolocation.getCurrentPosition(
            successHandler,
            errorHandler,
            options
        )

        const id = navigator.geolocation.watchPosition(
            successHandler,
            errorHandler,
            options
        )
        return () => navigator.geolocation.clearWatch(id)
    }, [options])

    return {loading, error, data}

}

export default useGeolocation