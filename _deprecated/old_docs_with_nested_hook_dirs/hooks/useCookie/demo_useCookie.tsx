// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Layout from '/src/components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import Method from '/src/components/Method'
import { useCookie } from '@pratiq/hooks'
import { getHookDataByTitle } from '/utils/getHooks'
const data = getHookDataByTitle('useCookie')


//+ useAsync
const DemoComponent = (props:any) => {
    const {cookie, setCookie, removeCookie} = useCookie('MY_COOKIE_KEY')


const demoCode = 
`const [cookie, setCookie, removeCookie] = useCookie('MY_COOKIE_KEY')

<p>{cookie || 'undefined'}</p>
<button onClick={() => setCookie('Alice')}>Set cookie 'Alice'</button>
<button onClick={() => setCookie('Bobby', 100_000)}>Set cookie 'Bobby'</button>
<button onClick={() => setCookie('Charles')}>Set cookie 'Charles'</button>
<button onClick={() => removeCookie()}>Remove cookie</button>s`


   

    return(
        <Layout {...data}>

            <div style={{marginBottom: '1rem', display: 'flex', alignItems: 'stretch'}}>
                <p style={{minWidth: '10rem', fontSize:'1rem', background: '#ccc4', padding: '.25rem .5rem', borderRadius: '.25rem', marginRight: '.5rem'}}>{cookie || 'undefined'}</p>
                <button onClick={() => setCookie('Alice')}>Alice</button>
                <button onClick={() => setCookie('Bobby')}>Bobby</button>
                <button onClick={() => setCookie('Charles')}>Charles</button>
                <button onClick={() => removeCookie()}>X</button>
            </div>


            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>

        </Layout>
    )
}


export default DemoComponent