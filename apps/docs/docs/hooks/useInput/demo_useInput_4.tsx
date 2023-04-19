// @ts-nocheck
import React, { useState } from 'react'
import Layout from '/src/components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import { getHookDataByTitle } from '/utils/getHooks'
const data = getHookDataByTitle('useInput')


const DemoComponent = (props:any) => {

    const myInput_4 = useInput({
        value: 'Default',
        storageKey: 'USE_INPUT_DEMO_INPUT_STORAGE_KEY_2',
        saveOnChange: true,
        placeholder: 'A placeholder',
        validOnDefault: false,
        validateOnChange: true,
        validateOnBlur: true,
        validator: /^[a-z0-9]*$/,
        invalidMessage: 'Only lowercase letters and numbers allowed...',
        className: 'default-className',
        rootStyle: {
            background: 'transparent',
            marginRight: '.5rem',
        },
        style: {
            'valid': {color: 'green'},
            'invalid': {color: 'red'},
            'default': {color: 'blue'},
            'default-active': { color: 'yellow'},
        }
    })



    return(
        <Layout title={data.title + ' - Demo 4'} description={data.description}>

            <div style={{paddingBottom: '1rem', borderBottom: '1px solid #6664'}}>
            <div style={{ display:'flex'}}>
                    <input {...myInput_4.bind}/>
                
                    <button style={{fontSize: '.8rem', background: 'grey', marginLeft: '.5rem'}} onClick={myInput_4.validate}>Validate</button>
                    <button style={{fontSize: '.8rem', background: 'grey'}} onClick={myInput_4.save}>Save</button>
                    <button style={{fontSize: '.8rem',}} onClick={myInput_4.reset}>Reset</button>
                    <button style={{fontSize: '.8rem', background:'grey'}} onClick={myInput_4.remove}>Remove Storage</button>
                </div>
            </div>

            <CodeBlock language='ts' className='demo-display' >
{`// isEmpty:        ${myInput_4.isEmpty.toString()}
// isHovered:      ${myInput_4.isHovered.toString()}
// isFocused:      ${myInput_4.isFocused.toString()}
// isValid:        ${myInput_4.isValid.toString()}
// wasValidated:   ${myInput_4.wasValidated.toString()}
// invalidMessage: "${myInput_4.invalidMessage}"
// style:          ${JSON.stringify(myInput_4.bind.style)}
// className:      ${JSON.stringify(myInput_4.bind.className)}

const myInput = useInput({
    value: 'Default',
    storageKey: 'LOCAL_STORAGE_KEY_1',
    saveOnChange: true,
    placeholder: 'A placeholder',
    validOnDefault: false,
    validateOnChange: true,
    validateOnBlur: true,
    validator: /^[a-z0-9]+$/,
    invalidMessage: 'Only lowercase letters and numbers allowed...',
    className: 'default-classname',
    rootStyle: {
        background: '#444',
        marginRight: '.5rem',
    },
    style: {
        'default': {color: 'blue'},
        'default-active': { color: 'yellow'},
        'valid': {color: 'green'},
        'invalid': {color: 'red'},
    }
})`}
            </CodeBlock>

        </Layout>
    )
}


export default DemoComponent