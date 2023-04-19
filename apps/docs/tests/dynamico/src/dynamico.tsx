import React, { Suspense, useState, useMemo, lazy, useEffect, useRef, JSXElementConstructor } from 'react';


function renderLazyComponent(component:string) {
    console.log('lazy loading:', component)
    return lazy(() => import(component + ''));
 }

const useDyn = (list: {[key:string]:string}, fallback?: React.ReactNode, initialIndex:number = 0) => {
    const [index, setIdx] = useState(initialIndex)
    let compMap = useRef<any>({})

    
    let entries:any = useMemo(() => Object.entries(list), [list])
    let length:any = useMemo(() => Object.entries(list).length, [list])
    let names:string[] = useMemo(() => Object.keys(list), [list])

    const next = (N:number = 1) => setIdx(n => n + N < length - 1 ? n + N : length - 1)
    const prev = (N:number = 1) => setIdx(n => n - N >= 0 ? n - N : 0)
    const setIndex = (N:number = 0) => setIdx(n => (N >= 0 && N <= length - 1) ? N : n)



    const Comp = useMemo(() => {
        // entries[index][0] = name
        // entries[index][1] = val

        if(!(entries[index][0] in compMap.current)){
            console.log('>> no component - renderLazy')
            compMap.current[entries[index][0]] = renderLazyComponent(entries[index][1])
            return compMap.current[entries[index][0]]
        }else{
            console.log('>> component found - return comp')
            return compMap.current[entries[index][0]]
        }
        
    }, [index, entries])
    
    if(!list || !window || typeof window === 'undefined') return {
        Component: () => null,
        next: () => {},
        prev: () => {},
        setIndex: () => {},
        index:0,
        names: []
    }

    const Component = () => 
        <Suspense fallback={fallback || <>Loading {index} ...</>}>
            <Comp />
        </Suspense>


    return {
        Component,
        next,
        prev,
        setIndex,
        index,
        names,
    }
}
export default useDyn
