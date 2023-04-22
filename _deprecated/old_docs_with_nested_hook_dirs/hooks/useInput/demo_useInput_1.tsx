// @ts-nocheck
import React, { useState } from 'react'
import Layout from '/src/components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import { getHookDataByTitle } from '/utils/getHooks'
const data = getHookDataByTitle('useInput')



const DemoComponent = (props:any) => {

    const myInput_1 = useInput({
        value: 'No validation...',
    })



    return(
        <Layout  title={data.title + ' - Demo 1'} description={data.description} >

            <div style={{paddingBottom: '1rem', borderBottom: '1px solid #6664'}}>
                <div style={{ display:'flex'}}>
                    <input {...myInput_1.bind}/>
                
                    <button style={{fontSize: '.8rem', background: 'grey', marginLeft: '.5rem'}} onClick={myInput_1.validate}>Validate</button>
                    <button style={{fontSize: '.8rem', background: 'grey'}} onClick={myInput_1.save}>Save</button>
                    <button style={{fontSize: '.8rem',}} onClick={myInput_1.reset}>Reset</button>
                    <button style={{fontSize: '.8rem', background:'grey'}} onClick={myInput_1.remove}>Remove Storage</button>
                </div>
                
                
                
                {/* <div style={{display:'flex', alignItems:'center', marginBottom: '.5rem'}}>
                    <button style={{minWidth: '10rem', background: 'grey'}} onClick={myInput_1.validate}>Validate Value</button>
                    <p>No validator function</p>
                </div>
                <div style={{display:'flex', alignItems:'center', marginBottom: '.5rem'}}>
                    <button style={{minWidth: '10rem', background: 'grey'}} onClick={myInput_1.save}>Save To Storage</button>
                    <p>No storage key specified</p>
                </div>
                <div style={{display:'flex', alignItems:'center', marginBottom: '.5rem'}}>
                    <button style={{minWidth: '10rem'}} onClick={myInput_1.reset}>Reset State</button>
                </div>
                <div style={{display:'flex', alignItems:'center'}}>
                    <button style={{minWidth: '10rem', background:'grey'}} onClick={myInput_1.remove}>Remove Storage</button>
                    <p>No storage key specified</p>
                </div> */}
            </div>

            <CodeBlock language='ts' className='demo-display' >
{`// value:   ${myInput_1.value}

const myInput = useInput({
    value: 'No validation...',
})`}
            </CodeBlock>

        </Layout>
    )
}


export default DemoComponent