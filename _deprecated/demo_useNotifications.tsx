// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Layout from '/src/components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import Method from '/src/components/Method'
import { useNotifications } from '@pratiq/hooks'
import { getHookDataByTitle } from '/utils/getHooks'
const data = getHookDataByTitle('useNotifications')


//+ useAsync
const DemoComponent = (props:any) => {

    const { notify } = useNotifications({
        body: '-BODY-'
    })

     useEffect(()=>{
        notify({
            title: 'NOTICE ME',
            body: 'Now thats what I call Notified'
        })
     },[])

const demoCode = 
`import { useNotifications } from '@pratiq/hooks'

const {
    available,  // true if notifications available
    permission, // true if permission granted
    request,    // request permission
    notify,     // create and send a notification
}`


    return(
        <Layout {...data}>
            <div style={{padding: '1rem'}}>
                {/* <Method pre={`start()`} func={start} /> */}
            </div>
            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>
        </Layout>
    )
}


export default DemoComponent