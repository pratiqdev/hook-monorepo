import {useState, useRef, useEffect} from 'react'


// const defaultOptions = {
//     headers: {
//         "Content-Type":"application/json",
//         "Access-Control-Allow-Origin": "*"
//     },
// }

export interface I_Fetch {
    url: string,
    options: object,
    watch: any[],
    expire: number
}

/**
* useFetch()
* ---
* 
* Handler for fetch requests
* 
* @param {string} url - the url of the request
* @param {object} options - request options
* @param {number} expire - expiration of the request in seconds 
* @param {array} watch - array of dependencies to trigger a new request
* @returns {object} states {loading, value, error}
* 
* @example
* 
*/

const useFetch = (config: I_Fetch) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any>()
    const [value, setValue] = useState<any>()
    let done = false

    let expireHandle: any = useRef()



    const handleExpire = () => {
        if(!done){
            clearTimeout(expireHandle.current)
            setError(`Request expired. Expiration set to ${config.expire} seconds`)
            setValue(undefined)
            setLoading(false)
            done = true
        }
    }

    function errorIntercept(response: any) {
    if (!response.ok) {
        setError(response.statusText)
        done = true
    }
    return response;
}
    

    const handleError = (e: any) => {
        if(!done){
            clearTimeout(expireHandle.current)
            done = true
            try{
                if(e && e instanceof TypeError){ setError(e.message)}
                else if(e && typeof e === 'object'){ setError(e) }
                else if(e){ setError(e) }
                else{ setError(true) }
            }catch(err){
                setError(true)
                setValue('handleError removed value')
            }finally{ 
                setLoading(false)
            }
        }
    }

    const handleValue = (v: any) => {
        if(!done){
            clearTimeout(expireHandle.current)
            done = true
            setValue(v)
            setError(undefined)
            setLoading(false)
        }
    }
    
    useEffect(() => {
        clearTimeout(expireHandle.current)
        expireHandle.current = setTimeout(handleExpire, config.expire * 1000);
        setLoading(true)
        setError(undefined)
        setValue(undefined)
        
        try{
                
                fetch(config.url, {...config.options})
                .then(errorIntercept)
                .then(res => {
                    if (res && res.ok) { return res.json() }
                    else if(!res){ handleError('No response') }
                })
                .then(res => {
                    handleValue(res)
                })
                .catch(err => {
                    handleError(err)
                })



        }catch(err){ handleError(err) }
        return clearTimeout(expireHandle.current)
        // eslint-disable-next-line
    }, [...config.watch, config.url, config.expire, config.options])

    return {loading, value, error}
}

export default useFetch