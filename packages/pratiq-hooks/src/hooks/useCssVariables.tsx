import {useState, useCallback, useEffect} from 'react'
    


/**
 * useCssVariables
 */



const useCssVariables = (match: string = '--', element?: HTMLElement) => {
    const [actual, setActual] = useState({})

    const update = useCallback(() => {
        let el: HTMLElement
        if(element){
            el = element
        }
        else{
            if(typeof document !== 'object' || !('documentElement' in document)) return [{}, () => {}]
            el = element ?? document.documentElement
        }
        const cssMap:any = {}

        Object.values(getComputedStyle(el))
        .filter(item => item.includes(match))
        .forEach(item => { cssMap[item] = getComputedStyle(el).getPropertyValue(item) })

        setActual(cssMap)
    }, [match])

    
    useEffect(() => {
        update()
    }, [match])

    return [actual, update]
}

export default useCssVariables