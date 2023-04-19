import { useState, useEffect } from 'react'
import debug from 'debug'
const log = debug('useStateSet')
debug.enable('useStateSet')
/**
 * useStateArray()
 * ---
 * 
 * Save array in state and use common methods to update the array state
 * 
 * @param {array} initialState
 * @returns array, array functions
 * 
 * @example
 * 
 */


type T_useStateSetReturn = {
    value: Set<any>;
}

type T_useStateSet = <T>(initialState?: Iterable<T>) => T_useStateSetReturn

const useStateSet: T_useStateSet = <T>(initialState?: Iterable<T>) => {

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