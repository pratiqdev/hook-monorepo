import {useState, useEffect} from 'react'
// import ResizeObserver from 'resize-observer-polyfill';
/**
* usePosition()
* ---
* 
* useState that returns if CSS prop/value is valid
* 
* @requires resize-observer-polyfill
* @param {string} cssProp - the prop used to validate the value
* @param {string} cssString - the prop used to validate the value
* @returns A stateful value and true if valid

* @example
* 
*/

const usePosition = (ref: any ) => {

    const [position, setPosition] = useState({
        width: 0,
        height: 0,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    })



    const handler = () => {
        if(ref.current === null) return
        
        let rect = ref.current.getBoundingClientRect()
        setPosition({
            width: rect.width,
            height: rect.height,
            top: rect.top,
            bottom: rect.bottom,
            left: rect.left,
            right: rect.right,
        })
    }



    useEffect(() => {
        if(ref.current === null) return
        let rc = ref.current
        const observer = new ResizeObserver(handler)
        observer.observe(ref.current)
        rc.addEventListener('resize', handler)
        rc.addEventListener('change', handler)
        window.addEventListener('scroll', handler)

        return () => {
            if(rc === null) return
            observer.disconnect()
            window.removeEventListener('scroll', handler)
            rc.removeEventListener('change', handler)
            rc.removeEventListener('resize', handler)
        }
    })



    return position
}

export default usePosition