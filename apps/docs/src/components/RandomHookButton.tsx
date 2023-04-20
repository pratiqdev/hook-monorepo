import React, { useState, useRef, useEffect } from 'react'
// @ts-ignore
import { getHooksAlphabetized } from '/utils/getHooks'
import { Card } from './index'

export const RandomHookButton = (props:any) => {
    const [idx, setIdx] = useState(0)
    const hooks = getHooksAlphabetized()
    const toRef = useRef(null)

    useEffect(()=>{
        toRef.current = setInterval(() => {
            setIdx( Math.floor( Math.random() * (hooks.length - 1) ) )
        }, 1500);
        return () => clearInterval(toRef.current)
    }, [])

    return <a href={`/docs/hooks/${hooks[idx].title}`}>{props.text ?? hooks[idx].title}</a>

   
    
}

export default RandomHookButton
