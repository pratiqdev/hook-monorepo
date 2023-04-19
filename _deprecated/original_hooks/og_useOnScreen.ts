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

const useOnScreen = (ref: any, rootMargin = '0px') => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(()=>{
        if(ref.current == null) return
        let rc = ref.current
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { rootMargin }
        )
        observer.observe(ref.current)
        return () => {
            if(rc === null) return
            observer.unobserve(rc)
        }

    }, [ref, rootMargin])

    return isVisible
}

export default useOnScreen