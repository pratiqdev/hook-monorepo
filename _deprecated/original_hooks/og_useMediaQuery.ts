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

const useMediaQuery = (mediaQuery: string) => {
    const [isMatch, setIsMatch] = useState(false)
    const [mediaQueryList, setMediaQueryList] = useState<any>(undefined)
    
    useEffect(()=>{
        const list: any = window.matchMedia(`(${mediaQuery})`)
        setMediaQueryList(list)
        setIsMatch(list.matches)
    }, [mediaQuery])
    
    useEffect(()=>{
        const handler: any = (e: any) => setIsMatch(e.matches)
        mediaQueryList && mediaQueryList.addEventListener('change', handler)
        return () => mediaQueryList && mediaQueryList.removeEventListener('change', handler)
        // console.log(`type of MQ list: ${typeof mediaQueryList} isArray:${Array.isArray(mediaQueryList)}`)
    }, [mediaQueryList])

    return isMatch
}

export default useMediaQuery