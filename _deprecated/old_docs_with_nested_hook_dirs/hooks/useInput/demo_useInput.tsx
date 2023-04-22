// @ts-nocheck
import React from 'react'
import DemoComponent1 from './demo_useInput_1'
import DemoComponent2 from './demo_useInput_2'
import DemoComponent3 from './demo_useInput_3'
import DemoComponent4 from './demo_useInput_4'
import { DemoGallery } from '@site/src/components'



const DemoComponent = (props:any) => {
    return <DemoGallery demos={[
        <DemoComponent1 />,
        <DemoComponent2 />,
        <DemoComponent3 />,
        <DemoComponent4 />,
    ]}/>
    
}


export default DemoComponent