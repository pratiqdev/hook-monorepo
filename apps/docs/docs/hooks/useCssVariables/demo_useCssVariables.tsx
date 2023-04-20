// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Layout from '/src/components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import { getHookDataByTitle } from '/utils/getHooks'
import { useCssVariables } from '@pratiq/hooks'
const data = getHookDataByTitle('useCssVariables')


//+ useAsync
const DemoComponent = (props:any) => {
    const [match, setMatch] = useState('--ifm-color-primary')
    const [css, update] = useCssVariables(match)

    return(
        <Layout {...data}>


<CodeBlock language='ts' className='demo-display' >
{
`const [css, forceUpdate] = useCssVariables('${match}')

` + JSON.stringify(css, null, 2)
}
</CodeBlock>



        </Layout>
    )
}


export default DemoComponent