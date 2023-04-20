// @ts-nocheck
import React, { useState } from 'react'
import Layout from '/src/components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import { getHookDataByTitle } from '/utils/getHooks'
const data = getHookDataByTitle('useInput')



const DemoComponent = (props:any) => {

    const myInput_2 = useInput({
        value: '',
        options: ["apple", 'banana', 'cherry', 'donut', 'eclair'],
        validateOnChange:true,
    })



    return(
        <Layout  title={data.title + ' - Demo 2'} description={data.description}>

            <div style={{paddingBottom: '1rem', borderBottom: '1px solid #6664'}}>
            <div style={{ display:'flex'}}>
                    <input {...myInput_2.bind}/>
                
                    <button style={{fontSize: '.8rem', background: 'grey', marginLeft: '.5rem'}} onClick={myInput_2.validate}>Validate</button>
                    <button style={{fontSize: '.8rem', background: 'grey'}} onClick={myInput_2.save}>Save</button>
                    <button style={{fontSize: '.8rem',}} onClick={myInput_2.reset}>Reset</button>
                    <button style={{fontSize: '.8rem', background:'grey'}} onClick={myInput_2.remove}>Remove Storage</button>
                </div>
            </div>

            <CodeBlock language='ts' className='demo-display' >
{`// value            ${myInput_2.value}
// isValid:         ${myInput_2.isValid.toString()}
// invalidMessage: "${myInput_2.invalidMessage}"

const myInput = useInput({
    value: '',
    options: ["apple", 'banana', 'cherry', 'donut', 'eclair']
    validateOnChange: true,
})`}
            </CodeBlock>

        </Layout>
    )
}


export default DemoComponent