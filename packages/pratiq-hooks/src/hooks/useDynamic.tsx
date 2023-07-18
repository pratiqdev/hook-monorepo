import React, { Suspense, useState, useEffect, useMemo, lazy, useRef } from 'react';
// @ts-ignore
import debug from '../utils/logger.js'

function renderLazyComponent(component:string) {
    //~ FOR DEMO PURPOSES ONLY                  
    //~ REMOVE INTENTIONAL DELAY
    return lazy(() => {
        return new Promise(resolve => {
          setTimeout(() => resolve(import('./' + component)), 1_500);
        });
    });
    //   return lazy(() => import(component + ''))
}

type UseDynamicComponents = {
    [key:string | number]: string;
}

type UseDymamicOptions = {
    default?: string | number;
    preload?: Array<string | number>;
    fallback?: React.ReactNode;
}

type UseDynamic = (list: UseDynamicComponents, options: UseDymamicOptions) => ({
    Component: React.JSXElementConstructor<any>;
    next: () => void;
    prev: () => void;
    goto: (path: string | number) => void;
    index: number;
    names: string[];
    name: string;
})








//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const useDynamic: UseDynamic = (list: {[key:string]:string}, options: UseDymamicOptions = {}) => {

    const settings = useMemo(() => ({
        defaultIndex: options?.default          ? options.default       : 0,
        preload: options?.preload               ??                      [],
        fallback: options?.fallback             ?? <p>Loading...</p>
    }), [options])
    
    const [index, setIdx] = useState<number>(0)
    const compMap = useRef<any>({})
    const preloadRef = useRef<any>(false)

    const entries:any = useMemo(() => Object.entries(list), [list])
    const length:any = useMemo(() => Object.entries(list).length, [list])
    const names:string[] = useMemo(() => Object.keys(list), [list])
    const name:string = useMemo(() => Object.keys(list)[index], [list, index])

    const next = (N:number = 1) => setIdx(n => n + N < length ? n + N : 0)
    const prev = (N:number = 1) => setIdx(n => n - N >= 0 ? n - N : length - 1)
    const setIndex = (N:number = 0) => setIdx(n => (N >= 0 && N <= length - 1) ? N : n)
    const goto = (path:string | number) => {
        if(typeof path === 'string'){
           if(names.includes(path)){
                setIndex(names.findIndex((el => el === path)))
           }
        }else if(typeof path === 'number'){
            setIndex(path)
        }
    }


    
    //&                                                                                             
    const preload = () => {
        if(preloadRef.current) return;
        preloadRef.current = true
         
        settings.preload.forEach(preloadKey => {
            if(!(entries[preloadKey][0] in compMap.current)){
                console.log(`>>  ${preloadKey} | no component - render component ${preloadKey}`)
                compMap.current[entries[preloadKey][0]] = renderLazyComponent(entries[preloadKey][1])
            }
        })
    }

    //&                                                                                             
    const Comp = useMemo(() => {
        if(!(entries[index][0] in compMap.current)){
            console.log(`>>  ${index} | no component - render component ${index}`)
            compMap.current[entries[index][0]] = renderLazyComponent(entries[index][1])
            preload()
            return compMap.current[entries[index][0]]
        }else{
            console.log('>> component found - return comp')
            return compMap.current[entries[index][0]]
        }
    }, [index, entries])

    
    //&                                                                                             
    const Component = () => 
        <Suspense fallback={settings.fallback ?? <>Loading {index} ...</>}>
            <Comp />
        </Suspense>

    //&                                                                                             
    // update the index to the default
    useEffect(()=>{
        console.log('>>> DIR:', )
        console.log(list, options)
        setIdx((currentIndex:number) => {
            return typeof settings.defaultIndex === 'number'
            ? settings.defaultIndex
            : typeof settings.defaultIndex === 'string'
                ? Object.keys(list).indexOf(settings.defaultIndex) ?? 0
                : 0
        })
    }, [])


    //&                                                                                             
    if(!list || typeof window === 'undefined') return {
        Component: () => null,
        next: () => {},
        prev: () => {},
        goto: () => {},
        index:0,
        names: [],
        name: '',
    }

    //&                                                                                             
    return {
        Component,
        next,
        prev,
        goto,
        index,
        names,
        name,
    }
}
export default useDynamic
