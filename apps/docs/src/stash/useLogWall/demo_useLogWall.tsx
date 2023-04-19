// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Layout from '/src/components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import Method from '@site/src/components/Method'
import useLogWall from '/src/hooks/useLogWall'



//+ useAsync
const DemoComponent = (props:any) => {
    // const log = useLogger({
    //     active: true,
    //     origin: 'demo_useLogger!'
    // })
    const LogWall = useLogWall({
        title:'useLogWall Demo', 
        shortcutKey: 'digit0', 
        windowOnly: false, 
        debugLevel:3,
        docUrl: 'https://my-doc-site.xyz/docs/',
    })

    const demoCode = `//`


    // useEffect(()=>{
    //     // setTimeout(()=>{
    //     //     log(0, 'log type zero')
    //     // },1000)

    //     setTimeout(()=>{
    //         log(1, 'log type one')
    //     },2000)

    //     setTimeout(()=>{
    //         log(2, {
    //             title: 'A Title (Type 2)',
    //             1: 'Line 1',
    //             2: 'Line 2',
    //         })
    //     },3000)

    //     setTimeout(()=>{
    //         log(3, {
    //             title: 'Some Error (Type 3)',
    //             doc: 'some-error',
    //             stack: '??'
    //         })
    //     },4000)
        

    // }, [])


   

    return(
        <Layout>
            <LogWall.Window />


            <div style={{padding: '1rem'}}>
                
                <button onClick={() => LogWall.log(3, {
                    title: 'A log on the wall!',
                    1:'This log exceeds the minimum log level required to show the wall.'
                })}>Log to Wall</button>
                {/* <button onClick={() => setHighAcc(b => !b)}>{highAcc ? 'Disable' : 'Enable'} High Accuracy</button> */}

            </div>

            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>
        </Layout>
    )
}


export default DemoComponent