// @ts-nocheck
import React, { useDebugValue, useEffect, useState } from 'react'
import Layout from '/src/components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import Method from '/src/components/Method'
import { useInterval } from '@pratiq/hooks'
import { getHookDataByTitle } from '/utils/getHooks'
const data = getHookDataByTitle('useInterval')
const log = console.log

//+ useAsync
const DemoComponent = (props:any) => {
    const [value, setValue] = useState(0)

    const {reset, stop} = useInterval((i:number)=>{
        setValue(i)
        log('interval -', i)
    },1000, false)



const demoCode = 
`const [value, setValue] = useState(0)
let val = 0

const {reset, stop} = useInterval(()=>{
    val++
    log('interval -', val)
},1000, false)

// value: ${value}`



    return(
        <Layout {...data}>
            <div style={{paddingBottom: '1rem'}}>
                <button onClick={reset}>Reset</button>
                <button onClick={stop}>Stop</button>
            </div>
            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>
        </Layout>
    )
}


export default DemoComponent