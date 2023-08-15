// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react'
import Layout from '/src/components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import Method from '@site/src/components/Method'
import { useIDB } from '@pratiq/hooks'
import { getHookDataByTitle } from '/utils/getHooks'
const data = getHookDataByTitle('useIDB')

//+ useAsync
const DemoComponent = (props:any) => {

   const db = useIDB({
        key: 'GREETING',
        value: 'hello',
        startWithValue: false
   })

    const demoCode = 
`const db = useIDB({
    key: 'GREETING',
    value: 'hello',
    startWithValue: false
})

<p>{
    db.loading 
        ? 'Loading...' 
        : db.error 
            ? error.toString() 
            : db.value 
                ? db.value 
                : 'null-value'
}</p>

    `


    return(
        <Layout {...data}>


            <div style={{paddingBottom: '1rem', display: 'flex', flexDirection: 'column'}}>
                <p>{db.loading ? 'Loading...' : db.error ? error.toString() : (!db.value) ? 'null-value' : JSON.stringify(db.value)}</p>
                <div style={{marginTop: '1rem'}}>
                    <Method pre={`setValue("ayo")`} func={() => db.setValue("ayo")} />
                    <Method pre={`setValue("oii")`} func={() => db.setValue("oii")} />
                    <Method pre={`setValue({this: 'that', the: 'other'})`} func={() => db.setValue({this: 'that', the: 'other'})} />
                    <Method pre={`reset()`} func={() => db.reset()} />
                    <Method pre={`remove()`} func={() => db.remove()} />
                </div>
            </div>

            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>
        </Layout>
    )
}


export default DemoComponent