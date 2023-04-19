// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Layout from '/src/components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import { useClamp } from '@pratiq/hooks'
import { getHookDataByTitle } from '/utils/getHooks'
const data = getHookDataByTitle('useClamp')


//+ useAsync
const DemoComponent = (props:any) => {

    const [value, setValue, reset] = useClamp({
        value: 9,
        min: 2,
        max: 7
    })


    return(
        <Layout {...data}>


    


            <div style={{background: '#ccc4', padding: '.5rem', borderRadius: '.5rem', width: 'min-content', marginBottom: '1rem', borderRadius: '.5rem'}}>
                <div style={{width: '10rem', display: 'flex', marginBottom: '.5rem', background: '#0004', padding: '.25rem', justifyContent:'space-between', borderRadius: '.5rem'}}>
                    <button onClick={() => setValue(n => n - 1)} style={{width: '2rem', margin: 0}}>-</button>
                    <p style={{flex: 1, textAlign:'center', fontSize: '1.4rem', width: '100%', margin:0}}>{value}</p>
                    <button onClick={() => setValue(n => n + 1)} style={{width: '2rem', margin: 0}}>+</button>
                </div>
                <div style={{width: '10rem', display: 'flex', flexDirection:'column'}}>
                    <button style={{margin:0, marginBottom:'.5rem'}} onClick={() => setValue(10)}>Set 10</button>
                    <button style={{margin:0, marginBottom:'.5rem'}} onClick={() => setValue(0)}>Set 0</button>
                    <button style={{margin:0}} onClick={reset}>Reset</button>
                </div>
            </div>




<CodeBlock language='ts' className='demo-display' >
{
`const [value, setValue, reset] = useClamp({
    value: 9,
    min: 2,
    max: 7
})

// value: ${value}
`
}
</CodeBlock>



        </Layout>
    )
}


export default DemoComponent