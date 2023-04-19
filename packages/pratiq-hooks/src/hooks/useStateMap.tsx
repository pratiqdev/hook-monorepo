import { useState, useEffect } from 'react'
import debug from 'debug'
const log = debug('useStateMap')
debug.enable('useStateMap')

type T_useStateMapReturn = {
    value: Map<any, any>;
}

type T_useStateMap = <K, V>(initialState?: Iterable<readonly [K, V]>) => T_useStateMapReturn

const useStateMap: T_useStateMap = <K, V>(initialState?: Iterable<readonly [K, V]>) => {

    const [mapState, setMapState] = useState<Map<K, V>>(new Map(initialState))


    const set = (key: K, value: V) => {
        log(`Setting "${key}" => "${value}"`)
        let newMap = new Map(mapState)
        newMap.set(key, value)
        setMapState(newMap)
        return newMap.get(key) === value
    }
    

    const get = (key: K) => {
        log(`Getting key from Map:`, key)
        return mapState.get(key)
    }
    

    const remove = (key: K) => {
        log(`Removing item from Map:`, key)
        let newMap = new Map(mapState)
        newMap.delete(key)
        setMapState(newMap)
    }

    const clear = () => {
        setMapState(new Map())
    }

    const reset = () => {
        setMapState(new Map(initialState))
    }

    useEffect(()=>{
        log('Map:', mapState)
    }, [mapState])



    return {
        value: mapState,
        set,
        get,
        remove,
        clear,
        reset
    }
}

export default useStateMap