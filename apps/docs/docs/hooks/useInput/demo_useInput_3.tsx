// @ts-nocheck
import React, { useState } from 'react'
import Layout from '/src/components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import { getHookDataByTitle } from '/utils/getHooks'
const data = getHookDataByTitle('useInput')


const DemoComponent = (props:any) => {



    const myInput_3 = useInput({
        value: 'Numbers Only',
        storageKey: 'USE_INPUT_DEMO_INPUT_STORAGE_KEY_3',
        placeholder: 'Numbers pls',
        validator: /^[0-9]*$/,
        invalidMessage: 'Only numbers allowed!',
    })


 


    return(
        <Layout title={data.title + ' - Demo 3'} description={data.description}>




            <div style={{paddingBottom: '1rem', borderBottom: '1px solid #6664'}}>
                <div style={{ display:'flex'}}>
                    <input {...myInput_3.bind}/>
                
                    <button style={{fontSize: '.8rem', background: 'grey', marginLeft: '.5rem'}} onClick={myInput_3.validate}>Validate</button>
                    <button style={{fontSize: '.8rem', background: 'grey'}} onClick={myInput_3.save}>Save</button>
                    <button style={{fontSize: '.8rem',}} onClick={myInput_3.reset}>Reset</button>
                    <button style={{fontSize: '.8rem', background:'grey'}} onClick={myInput_3.remove}>Remove Storage</button>
                </div>
            </div>


            <CodeBlock language='ts' className='demo-display' >
{`// isEmpty:        ${myInput_3.isEmpty.toString()}
// isHovered:      ${myInput_3.isHovered.toString()}
// isFocused:      ${myInput_3.isFocused.toString()}
// isValid:        ${myInput_3.isValid.toString()}
// wasValidated:   ${myInput_3.wasValidated.toString()}
// invalidMessage: "${myInput_3.invalidMessage}"
// style:          ${JSON.stringify(myInput_3.bind.style)}
// className:      ${JSON.stringify(myInput_3.bind.className)}

const myInput = useInput({
    value: 'Numbers Only',
    storageKey: 'LOCAL_STORAGE_KEY_2',
    placeholder: 'Numbers pls',
    validator: /^[0-9]*$/,
    invalidMessage: 'Only numbers allowed!',
})`}
            </CodeBlock>




        </Layout>
    )
}


export default DemoComponent