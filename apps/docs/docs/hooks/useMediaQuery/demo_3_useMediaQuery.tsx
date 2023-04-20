// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react'
import Layout from '/src/components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import Method from '@site/src/components/Method'
import { useMediaQuery } from '@pratiq/hooks'
import {HeadlessTable} from '@site/src/components'
import { getHookDataByTitle } from '/utils/getHooks'
const data = getHookDataByTitle('useMediaQuery')


//+ useAsync
const DemoComponent = (props:any) => {

    const [width, setWidth] = useState(0)

    const mq = useMediaQuery([
        '(min-width: 1401px)',
        '(min-width: 1201px) and (max-width: 1400px)',
        '(min-width: 1001px) and (max-width: 1200px)',
        '(max-width: 1000px)',
    ])


    const demoCode = 
`const mq = useMediaQuery([
    '(min-width: 1401px)',
    '(min-width: 1201px) and (max-width: 1400px)',
    '(min-width: 1001px) and (max-width: 1200px)',
    '(max-width: 1000px)',
])

let bg  = mq(['red', 'green', 'blue', 'yellow'])
let clr = mq(['white', null, null, 'purple'])


<div style={{
    background: bg,
    color: clr, 
}}>
    {bg} / {clr}
</div>


${JSON.stringify(mq(), null, 2)}`




let bg  = mq(['red', 'green', 'blue', 'yellow'])
let clr = mq(['white', null, null, 'purple'])


    return(
        <>
        <Layout title={data.title + ' - Demo 3'} description={data.description}>

{/* 
            <div style={{padding: '1rem', display: 'flex', flexDirection: 'column'}}>
                <h4>Is Mobile: {isMobile + ''}</h4>
            </div> */}
            <div style={{
                borderRadius:'.5rem',
                padding:'1rem',
                display:'flex',
                justifyContent: 'center',
                alignItems: 'center', 
                background: bg,
                color: clr,
            }}>
                {bg} / {clr}
            </div>

            <HeadlessTable code={1} items={[
                ['mq(0)', mq(0)],
                ['mq(1)', mq(1)],
                ['mq()[2]', mq()[2]],
                ['mq()[3]', mq()[3]],
                ['mq()', JSON.stringify(mq())],
                ["mq(['red', 'green', 'blue', 'yellow'])", mq(['red', 'green', 'blue', 'yellow'])],
                ["mq(['white', null, null, 'purple'])", mq(['white', null, null, 'purple'])],
            ]}/>
            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>
            {/* <div className='mb-3' /> */}
        </Layout>
        </>
    )
}


export default DemoComponent