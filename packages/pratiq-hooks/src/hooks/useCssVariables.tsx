import {useState, useCallback, useEffect} from 'react'
    


/**
 * useCssVariables
 */



const useCssVariables = (match: string = '--', element?: HTMLElement | React.RefObject<HTMLElement>) => {
    const [actual, setActual] = useState({})

    const update = useCallback(() => {
        let el: any;
        if(element){
            if('current' in element){
                el = element.current
            }else{
                el = element
            }
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