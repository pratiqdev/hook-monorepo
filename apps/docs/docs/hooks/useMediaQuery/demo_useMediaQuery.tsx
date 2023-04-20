// @ts-nocheck
import React from 'react'
import { DemoGallery } from '/src/components'
import DemoComponent1 from './demo_1_useMediaQuery'
import DemoComponent2 from './demo_2_useMediaQuery'
import DemoComponent3 from './demo_3_useMediaQuery'

const DemoComponent = (props:any) => {
 return <DemoGallery demos={[
    <DemoComponent1 />,
    <DemoComponent2 />,
    <DemoComponent3 />,
 ]}/>
}

export default DemoComponent