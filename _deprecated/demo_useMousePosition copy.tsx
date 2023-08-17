// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react'
import Layout from '/src/components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import {Card, HeadlessTable} from '@site/src/components'
import { useMousePosition } from '@pratiq/hooks'
import { getHookDataByTitle } from '/utils/getHooks'
const data = getHookDataByTitle('useMousePosition')


//+ useAsync
const DemoComponent = (props:any) => {

    const {x, y, bind} = useMousePosition()

    const demoCode = 
`const {x, y, bind} = useMousePosition()

<div {...bind} ></div>
<div 
    style={{
        position: 'absolute', 
        top: '0px', 
        left: '0px',
        transform: \`translate(\${x}px, \${y}px)\`
    }}
></div>
`





    return(
        <Layout {...data}>


            <div style={{paddingBottom: '1rem', display: 'flex', flexDirection: 'column'}}>
                <h4>{x} x {y}</h4>
                <div {...bind} style={{width: '100%', height: '200px', background: '#444', overflow: 'hidden'}}></div>

                <div style={{
                    display: 'block', 
                    position: 'fixed', 
                    top: '0px', 
                    left: '0px',
                    transform: `translate(${x - 25}px, ${y - 25}px)`,
                    width: '50px',
                    height: '50px',
                    pointerEvents: 'none',
                    borderRadius: '50%',
                    border: '2px solid red'
                }}></div>
            </div>

            <HeadlessTable items={[
                ['x',x+''],
                ['y',y+'']
            ]}/>

            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>
        </Layout>
    )
}


export default DemoComponent