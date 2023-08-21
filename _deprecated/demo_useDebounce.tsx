// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Layout from '/src/components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import useDebounce from '/src/hooks/useDebounce'
import debug from 'debug'
const log = debug('@pq:demo_useDebounce')

//+ useAsync
const DemoComponent = (props:any) => {
    const [value, setValue] = useState(1)

    const trigger = useDebounce(() => {
        log('useDebounce | callback')
        setValue(v => v + 1)
    },
    {
        wait: 500,
        leading: false,
        trailing: false,
        maxWait: 1000
    })


    return(
        <Layout>


    




            <div>
                <button onClick={trigger}>Increment</button>
            </div>


<CodeBlock language='ts' className='demo-display' >
{
`value: ${value.toString()}
*/
`
}
</CodeBlock>




        </Layout>
    )
}


export default DemoComponent