// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react'
import Layout from '/src/components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import Method from '/src/components/Method'
import { useTemperature } from '@pratiq/hooks'



//+ useAsync
const DemoComponent = (props:any) => {

   const temp = useTemperature({
    value: 212,
    scale: 'f',
    decimals: 1
   })

    const demoCode = 
`const temp = useTemperature({
    value: 212,
    scale: 'f'
})

<p>Value: {temp.value}<p>
<p>Scale: {temp.scale}<p>

<button onClick={()=> temp.increment()}>Increment</button>
<button onClick={()=> temp.decrement()}>Decrement</button>
<button onClick={()=> temp.setScale('c')}>C</button>
<button onClick={()=> temp.setScale('f')}>F</button>

`

    // const scaleRef = useRef('c')

    // const flipScale = () => {
    //     if(scaleRef.current === 'c'){
    //         scaleRef.current = 'f'
    //         temp.setScale('f')
    //     }else{
    //         scaleRef.current = 'c'
    //         temp.setScale('c')
    //     }
    //     setTimeout(flipScale, 4000)
    // }


    // useEffect(()=>{
    //     setTimeout(flipScale, 2000)
    // }, [])



    return(
        <Layout>


            <div style={{padding: '1rem', display: 'flex', flexDirection: 'column'}}>
                {/* <pre>{JSON.stringify(temp, null, 2)}</pre> */}
                <h4>{temp.value} °{temp.scale.toUpperCase()}</h4>
                <div>
                    <button onClick={()=> temp.increment()}>Increment</button>
                    <button onClick={()=> temp.decrement()}>Decrement</button>
                    <button onClick={()=> temp.setScale('c')}>C</button>
                    <button onClick={()=> temp.setScale('f')}>F</button>
                    <button onClick={()=> temp.setScale('k')}>K</button>
                    <button onClick={()=> temp.setScale('r')}>R</button>
                </div>
            </div>

            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>
        </Layout>
    )
}


export default DemoComponent