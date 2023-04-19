import React, { useState, useRef, useEffect } from 'react'
import { useKeyboard, useSessionStorage } from '@pratiq/hooks'
import { Close } from '@emotion-icons/evaicons-solid/Close'

type T_NothingnessProps = {
    title: string;
    description?: string;
    open?: boolean;
    children?: React.ReactNode;
}
const Nothingness = (props:T_NothingnessProps) => {
    const [isOpen, setIsOpen] = useSessionStorage('@pratiq/hooks-demo-open-status', false)
    
    const handleNavNext = () => {
        console.log('next page')
        if(typeof document !== 'undefined'){
            console.log('found doc')
            let el = document.getElementsByClassName('pagination-nav__link--next')
            if(el && el.length){
                try{
                    //@ts-ignore
                    el[0].click()
                }catch(err){}
            }
        }
    }
    
    const handleNavPrev = () => {
        console.log('prev page')
        if(typeof document !== 'undefined'){
            console.log('found doc')
            let el = document.getElementsByClassName('pagination-nav__link--prev')
            if(el && el.length){
                try{
                    //@ts-ignore
                    el[0].click()
                }catch(err){}
            }
        }
    }
    
    
    useKeyboard({ combos: { 
        'shift-slash': () => setIsOpen(b => !b) ,
        'shift-right': handleNavNext ,
        'shift-left': handleNavPrev ,
    }})

    return (
        <div  className={isOpen ? 'nothingness-open' : 'nothingness-closed'}>
            {isOpen && 
                <div style={{margin:'-1rem', marginBottom:'1rem', padding: '1rem', background:'#88a3', display: 'flex', justifyContent:'space-between'}}>
                    <div>
                        <h3 style={{margin:0}}>{props.title}</h3>
                        {props.description && <small>{props.description}</small>}
                    </div>
                    <div>
                        <button onClick={() => setIsOpen(b => !b)} style={{padding:0, background:'transparent'}}><Close size='26'/></button>
                        {/* <small>Press <code>ctrl + .</code> to toggle fullscreen</small> */}
                    </div>
                </div>
            }
            {props.children}
        </div>
    )
}

export default Nothingness