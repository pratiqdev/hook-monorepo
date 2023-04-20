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

    const mq = useMediaQuery({
        'xl':'(min-width: 1400px)',
        'lg':'(min-width: 1200px) and (max-width: 1400px)',
        'md':'(min-width: 1000px) and (max-width: 1200px)',
        'sm':'(max-width: 1000px)',
    })


    const demoCode = 
`const mq = useMediaQuery({
    'xl':'(min-width: 1400px)',
    'lg':'(min-width: 1200px) and (max-width: 1400px)',
    'md':'(min-width: 1000px) and (max-width: 1200px)',
    'sm':'(max-width: 1000px)',
})

let bg  = mq(['red', 'green', 'blue', 'yellow'])
let clr = mq(['white', null, null, 'purple'])


<div style={{
    background: bg,
    color: clr, 
}}>
    {bg} / {clr}
</div>


<div style={{
    borderRadius:'.5rem',
    padding:'1rem',
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center', 
    background: mq(['red', 'green', 'blue', 'yellow']),
    color: mq(['white', null, null, 'purple']),
}}>
    {mq(['red', 'green', 'blue', 'yellow'])} / {mq(['white', null, null, 'purple'])}
</div>`






let bg  = mq(['red', 'green', 'blue', 'yellow'])
let clr = mq(['white', null, null, 'purple'])

    return(
         <Layout title={data.title + ' - Demo 2'} description={data.description}> 


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
                ['mq("xl")', mq("xl")],
                ['mq("lg")', mq("lg")],
                ['mq().md', mq().md],
                ['mq().sm', mq().sm],
                ['mq()', JSON.stringify(mq())],
                ["mq(['red', 'green', 'blue', 'yellow'])", mq(['red', 'green', 'blue', 'yellow'])],
                ["mq(['white', null, null, 'purple'])", mq(['white', null, null, 'purple'])],
            ]}/>
            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>
            {/* <div className='mb-3' /> */}
        </Layout> 
    )
}


export default DemoComponent