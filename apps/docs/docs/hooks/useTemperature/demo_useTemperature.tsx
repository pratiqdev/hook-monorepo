// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react'
import { Card, DemoLayout as Layout } from '/src/components'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import Method from '/src/components/Method'
import {useTemperature} from '@pratiq/hooks'



//+ useAsync
const DemoComponent = (props: any) => {

    const temp = useTemperature({
        value: 72,
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



    return (
        <Layout>


            <div style={{ paddingBottom: '1rem', display: 'flex', flexDirection: 'column' }}>
                {/* <pre>{JSON.stringify(temp, null, 2)}</pre> */}
                <Card style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingBottom: '1rem' }}>
                    <div style={{ flex: 1, fontSize: '1.2rem', fontWeight: 'bold' }}>{temp.value} °{temp.scale.toUpperCase()}</div>
                    <div style={{ display: 'flex', height: '100%', alignItems: 'center' }}>
                        <button onClick={() => temp.increment()}>+</button>
                        <button onClick={() => temp.decrement()}>-</button>
                        <button onClick={() => temp.setScale('c')}>C</button>
                        <button onClick={() => temp.setScale('f')}>F</button>
                        <button onClick={() => temp.setScale('k')}>K</button>
                        <button onClick={() => temp.setScale('r')}>R</button>
                    </div>
                </Card>



                <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                        <small>0</small>
                        <small>212</small>
                    </div>
                    <div style={{ width: '100%', height: '2rem', background: 'grey', borderRadius: '1rem' }}>
                        <div style={{
                            background: 'red',
                            height: '2rem',
                            borderRadius: '1rem',
                            width: `${(temp.fahrenheit / 212) * 100}%`,
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            paddingRight: '.5rem',
                            fontSize: '.8rem',
                            fontWeight: 'bold'
                        }}>{temp.fahrenheit} °F</div>
                    </div>
                </div>


                <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                        <small>0</small>
                        <small>100</small>
                    </div>
                    <div style={{ width: '100%', height: '2rem', background: 'grey', borderRadius: '1rem' }}>
                        <div style={{
                            background: 'red',
                            height: '2rem',
                            borderRadius: '1rem',
                            width: `${temp.celsius}%`,
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            paddingRight: '.5rem',
                            fontSize: '.8rem',
                            fontWeight: 'bold'
                        }}>{temp.celsius} °C</div>
                    </div>
                </div>





            </div>

            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>
        </Layout>
    )
}


export default DemoComponent