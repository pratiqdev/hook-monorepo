// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Layout from '/src/components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import { useDebounceEffect } from '@pratiq/hooks'
import wait from '/utils/wait'
import { Method } from '@site/src/components'
import { getHookDataByTitle } from '/utils/getHooks'
const data = getHookDataByTitle('useDebounceEffect')


//+ useAsync
const DemoComponent = (props:any) => {
    const [value, setValue] = useState(1)
    const [trig, setTrig] = useState(false)
    const trigger = () => setTrig(b => !b)

    useDebounceEffect(() => {
        setValue(v => v + 1)
    }, [trig], 1000, 2000)

const demoCode = 
`useDebounceEffect(() => {
    setValue(v => v + 1)
}, [trig], 1000)

// value: ${value}
// dep: ${trig}
`

    return(
        <Layout {...data}>

            <div >
                <Method pre={`changeDeps()`} func={trigger} />
                <Method pre={`resetValue()`} func={() => setValue(1)} />
            </div>
            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>

        </Layout>
    )
}


export default DemoComponent