// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import { useWindow } from '@pratiq/hooks'

import Method from '/src/components/Method'
import Layout from '/src/components/DemoLayout'
import HeadlessTable from '/src/components/HeadlessTable'


//+ useAsync
const DemoComponent = (props:any) => {

    const pkg = useWindow()

    const demoCode = 
`const pkg = useWindow()

<pre>{ JSON.stringify( pkg ) }</pre>
`





    return(
        <Layout>
            <div style={{padding: '1rem', display: 'flex', flexDirection: 'column'}}>
                {/* <pre>{JSON.stringify(pkg, null, 2)}</pre> */}
                <HeadlessTable items={[
                    ['Height', pkg.height],
                    ['Width', pkg.width],
                    ['Max Height', pkg.maxHeight],
                    ['Ratio', pkg.ratio],
                    ['Scroll X', pkg.scrollX],
                    ['Scroll Y', pkg.scrollY],
                    ['Mouse X', pkg.x],
                    ['Mouse Y', pkg.y],
                    ['Angle', pkg.angle],
                    ['Type', pkg.type],
                    ['Orientation', pkg.orientation],
                ]}/>
            </div>

            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>
        </Layout>
    )
}


export default DemoComponent