import debug from 'debug'
const log = debug('useStateSet')
debug.enable('useStateSet')
import { useState, useEffect } from 'react'


export type T_UseStateSetReturn<T> = {
    value: Set<T>,
    add: (item: T) => boolean,
    remove: (item: T) => boolean,
    clear: () => void,
    reset: () => void,
}

const useStateSet = <T extends any>(initialState?: Iterable<T>): T_UseStateSetReturn<T> => {

    const [value, setValue] = useState<Set<T>>(new Set(initialState))


    const add = (item: T) => {
        log(`Adding item to set:`, item)
        let newSet = new Set(value)
        let ret = !newSet.has(item)
        newSet.add(item)
        setValue(newSet)
        return ret
    }
    
    const remove = (item:T) => {
        log(`Removing item from set:`, item)
        let newSet = new Set(value)
        let ret = newSet.delete(item)
        setValue(newSet)
        return ret
    }

    const clear = () => {
        setValue(new Set())
    }

    const reset = () => {
        setValue(new Set(initialState))
    }

    useEffect(()=>{
        log('value:', value)
    }, [value])



    return {
        value,
        add,
        remove,
        clear,
        reset
    }
}

export default useStateSet

// const comp = () => {

//     const { value } = useStateSet([true, 123, 'hello'])
// }