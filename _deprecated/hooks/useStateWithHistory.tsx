import {useState, useRef, useCallback} from 'react'
    
/**
 * useStateWithHistory()
 * ---
 * 
 * useState with history traversal functions
 * 
 * @param {any} initialValue - initial state
 * @param {number} capacity - capacity of history
 * @returns void
 * 
 * @example
 * 
 */

type T_UseStateWithHistory = <T>(initialValue:any, maxHistory: number) => {
    value:T;
    history: T[],
    pointer: number,
    setValue: (value:any) => void;
    forward: (amount?:number) => void;
    back: (amount?:number) => void;
    goto: (index:number) => void;
}


const useStateWithHistory: T_UseStateWithHistory = (initialValue: any, maxHistory: number) => {
    let capacity = maxHistory ?? 10
    const [value, setValue] = useState<any>(initialValue)
    const historyRef = useRef<any[]>([value])
    const pointerRef = useRef<number>(0)


    const set = useCallback((v: any) => {
        const resolvedValue = typeof v === 'function' ? v(value) : v
        if(historyRef.current[pointerRef.current] !== resolvedValue){
            if(pointerRef.current < historyRef.current.length){
                historyRef.current.splice(pointerRef.current + 1)
            }
            historyRef.current.push(resolvedValue)

            if(historyRef.current.length > capacity){
                historyRef.current.shift()
            }

            pointerRef.current = historyRef.current.length - 1
        }
        setValue(resolvedValue)
    }, [capacity, value])


    const back = useCallback((i?: number)=>{
        if(typeof i === 'number'){
            console.log(`go back custom amount ${i}`)
            if(pointerRef.current >= i){
                pointerRef.current = pointerRef.current - i
                setValue(historyRef.current[pointerRef.current])
            }else{
                pointerRef.current = 0
                setValue(historyRef.current[0])
            }
        }else{
            if(pointerRef.current > 0){
                pointerRef.current--
                setValue(historyRef.current[pointerRef.current])
            }
        }
    }, [])

    const forward = useCallback((i?: number)=>{
        if(typeof i === 'number'){
            if(pointerRef.current + i < historyRef.current.length - 1){
                console.log(`FORWARD | go forward ${i} - from ${pointerRef.current} to ${pointerRef.current + i}`)
                pointerRef.current = pointerRef.current + i
                setValue(historyRef.current[pointerRef.current])
            }else{
                pointerRef.current = historyRef.current.length - 1
                setValue(historyRef.current[pointerRef.current])
            }
        }else{
            if(pointerRef.current < historyRef.current.length - 1){
                pointerRef.current++
                setValue(historyRef.current[pointerRef.current])
            }
        }
        
    }, [])

    
    const goto = useCallback(index => {
        if(index > 0 || index < historyRef.current.length){
            pointerRef.current = index
            setValue(historyRef.current[pointerRef.current])
        }
    }, [])

    return {
        value,
        history: historyRef.current,
        pointer: pointerRef.current,
        setValue: set,
        forward,
        back,
        goto,
    }

}

export default useStateWithHistory