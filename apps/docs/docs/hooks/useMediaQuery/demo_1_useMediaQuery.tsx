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
    const [isOpen, setIsOpen] = useState(false)

    const mq = useMediaQuery(`(min-width: 1400px)`)


    const demoCode = 
`const isLargeScreen = useMediaQuery(
    '(min-width: 1400px)'
)`




            




    return(
        <Layout title={data.title + ' - Demo 1'} description={data.description}>
            <div style={{
                borderRadius:'.5rem',
                padding:'1rem',
                display:'flex',
                justifyContent: 'center',
                alignItems: 'center', 
                background: 'grey',
                color: 'white',
            }}>
                isLargeScreen: {mq+''}
            </div>
            <HeadlessTable code={1} items={[
                ['isLargeScreen', mq],
            ]}/>
            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>
        </Layout>
    )
}


export default DemoComponent