// @ts-nocheck
import React, { useEffect, useState, useRef } from 'react'
import Layout from '/src/components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import { useClickOutside } from '@pratiq/hooks'
import { getHookDataByTitle } from '/utils/getHooks'
const data = getHookDataByTitle('useClickOutside')


//+ useAsync
const DemoComponent = (props:any) => {
    const [isOpen, setIsOpen] = useState(false)

    
    let clickOut = useClickOutside(() => {
        setIsOpen(false)
    })



const demoCode = 
`const [isOpen, setIsOpen] = useState(false)

const toggle = () => setIsOpen(b => !b)

let clickOut = useClickOutside(() => {
    setIsOpen(false)
})

<button ref={clickOut} onClick={toggle}>Menu</button>

{isOpen &&
    <div ref={clickOut} >
        <button onClick={toggle}>Close</button>
        <button >Menu Option 1</button>
        <button >Menu Option 2</button>
        <button >Menu Option 3</button>
    </div>
}`


   

    return(
        <Layout {...data}>


            <div style={{paddingBottom: '.5rem'}}>
                <button ref={clickOut} style={{marginBottom: '.5rem'}} onClick={()=>setIsOpen(b => !b)}>Menu</button>
                {isOpen &&
                    <div ref={clickOut} style={{position: 'absolute', zIndex:'1000',display: 'flex', flexDirection: 'column', width: '16rem', background: '#ccda', padding: '.5rem', borderRadius: '.5rem'}}>
                        <button style={{margin:0, marginBottom: '.5rem'}} onClick={() => setIsOpen(false)}>Close</button>
                        <button style={{margin:0, marginBottom: '.5rem'}} >Menu Option 1</button>
                        <button style={{margin:0, marginBottom: '.5rem'}} >Menu Option 2</button>
                        <button style={{margin:0}} >Menu Option 3</button>
                    </div>
                }
            </div>
            
            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>

        </Layout>
    )
}


export default DemoComponent