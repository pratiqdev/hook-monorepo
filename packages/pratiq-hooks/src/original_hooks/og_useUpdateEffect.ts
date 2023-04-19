import { useRef, useEffect } from 'react'
    
/**
 * useUpdateEffect()
 * ---
 * 
 * useEffect hook that doesn't run on the first call
 * 
 * @param {function} callback
 * @param {array} dependencies
 * @returns void
 * 
 * @example
 * 
 * useUpdateEffect(myFunction, [someValue])
 */

const useUpdateEffect = (callback: Function, dependencies: any[] = []) => {
    const firstRenderRef = useRef(true)

    useEffect(() => {
        if(firstRenderRef.current){
            firstRenderRef.current = false
            return
        }
        return callback()
    // eslint-disable-next-line
    }, dependencies)
}

export default useUpdateEffect