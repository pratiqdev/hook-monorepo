import React, { useState, useRef, useEffect } from 'react'
// @ts-ignore
import { getHooksAlphabetized } from '/utils/getHooks'
import { Card } from './index'

export const RandomHookButton = (props:any) => {
    const [angle, setIdx] = useState(10)
    const hooks = [...getHooksAlphabetized(), ...getHooksAlphabetized()]
    const toRef = useRef(null)

    useEffect(()=>{
        toRef.current = setInterval(() => {
            setIdx(i => {
                // console.log(parseFloat((i + .1).toFixed(2)))
                return i >= 360 ? 0 : parseFloat((i + .1).toFixed(3))
            })
        }, 50);
        return () => clearInterval(toRef.current)
    }, [])

 
    return  <div className='hook-wheel-container'>
        <div className='hook-wheel'>
        {hooks.map((hook, idx) => 
            <p style={{
                display:'inline', 
                position: 'absolute',
                transform: `rotate(${ ((360 / hooks.length) * idx) + angle}deg)`,
                transformOrigin: '0% 0%',
                width: '80%',
                marginLeft: '-3rem',
                marginTop: '-.2rem',
                paddingLeft: '10rem',
                color: '#88f',
                fontFamily: 'monospace',
                letterSpacing: '.1rem',
                fontSize: '.8rem',
                opacity: '.7'
            }}>
                {hook.title}
            </p>)}
        </div>
        <div className='hook-wheel' style={{marginLeft: '120%'}}>
            {hooks.map((hook, idx) => 
                <p style={{
                    display:'inline', 
                    position: 'absolute',
                    transform: `rotate(${ ((360 / hooks.length) * idx) + angle }deg) `,
                    direction: 'rtl',
                    transformOrigin: '0% 0%',
                    width: '80%',
                    paddingLeft: '12rem',
                    color: '#aaf',
                    letterSpacing: '.3rem',
                    fontSize: '1.6rem',
                    fontFamily: 'cursive',
                    fontWeight: 'bold',
                    opacity: '.8',
                    marginTop: '11rem'
                }}>
                    <p style={{transform: 'rotate(180deg)'}}>
                    {hook.title}
                    </p>
                </p>)}
        </div>
        <div className='hook-wheel' style={{marginLeft: '60%', marginTop: '25rem'}}>
            {hooks.map((hook, idx) => 
                <p style={{
                    display:'inline', 
                    position: 'absolute',
                    transform: `rotate(${ ((360 / hooks.length) * idx) + angle }deg) `,
                    direction: 'rtl',
                    transformOrigin: '0% 0%',
                    width: '80%',
                    paddingLeft: '20rem',
                    color: '#66f',
                    opacity: '.9',
                    fontFamily: 'Helvetica'
                }}>
                    <p style={{transform: 'rotate(180deg)'}}>
                    {hook.title}
                    </p>
                </p>)}
        </div>
    </div>
    
}

export default RandomHookButton
