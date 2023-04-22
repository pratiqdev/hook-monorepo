// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react'
import Layout from '/src/components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import Method from '/src/components/Method'
import { useStateWithValidation } from '@pratiq/hooks'
import HeadlessTable from '/src/components/HeadlessTable'
import { getHookDataByTitle } from '/utils/getHooks'
const data = getHookDataByTitle('useStateWithValidation')


//+ useAsync
const DemoComponent = (props:any) => {

    const myState = useStateWithValidation({
        value: 123,
        validator: 'abc'
    })

    const demoCode = 
`const [value, setValue, isValid] = useStateWithValidation({
    value: 123,
    validator: (v) => v.length >= 5,
    // validator: 'abc',
    // validator: /abc/gm,
})`




    return(
        <Layout {...data}>

            <div style={{paddingBottom: '0rem', display: 'flex', flexDirection: 'column'}}>
                <Method pre={`setValue("apple")`} func={()=> myState.setValue('apple')} />
                <Method pre={`setValue("banana")`} func={()=> myState.setValue('banana')} />
                <Method pre={`setValue("cherry")`} func={()=> myState.setValue('cherry')} />
            </div>
                
            <HeadlessTable items={[
                ['Is Valid', ''+myState.isValid],
                ['Current Value', myState.value],
                ['Last Valid Value', ''+myState.lastValidValue],
            ]} />

            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>

        </Layout>
    )
}


export default DemoComponent
