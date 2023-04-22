// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Layout from '/src/components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import { useClipboard } from '@pratiq/hooks'
import { getHookDataByTitle } from '/utils/getHooks'
const data = getHookDataByTitle('useClipboard')


//+ useAsync
const DemoComponent = (props:any) => {
    const {copy, value, success} = useClipboard()


const demoCode = 
`const [copy, value, success] = useClipboard()

// success: ${success.toString()}
// value:   ${value}
`


   

    return(
        <Layout {...data}>
            <div>
                <div style={{marginBottom: '.5rem'}}>
                    <button onClick={()=>copy('Some Text')}>Copy: "Some Text"</button>
                </div>
                <div style={{marginBottom: '.5rem'}}>
                    <button onClick={()=>copy(1357908642)}>Copy: "1357908642"</button>
                </div>
                <div style={{marginBottom: '.5rem'}}>
                    <button onClick={()=>copy('A long text string')}>Copy: "A long text string"</button>
                </div>
            </div>

            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>
        </Layout>
    )
}


export default DemoComponent