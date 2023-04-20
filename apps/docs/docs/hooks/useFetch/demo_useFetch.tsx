// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Layout from '/src/components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import Method from '@site/src/components/Method'
import { useFetch } from '@pratiq/hooks'
import { getHookDataByTitle } from '/utils/getHooks'
const data = getHookDataByTitle('useFetch')



//+ useAsync
const DemoComponent = (props:any) => {
    const [expiration, setExpiration] = useState(2000)
    const [idx, setIdx] = useState(1)

    const response = useFetch(`https://jsonplaceholder.typicode.com/posts/${idx}`, {
        autoLoad: true,
        expire: expiration,
        initialData: {title:'Initial Data', body:'This will be replaced with the data once the request is complete'},
        watch: [idx, expiration],
        options: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }
    })

const demoCode = 
`const [idx, setIdx] = useState(1) // ${idx}


const response = useFetch('https://jsonplaceholder.typicode.com/posts/${idx}', {
    autoLoad: false,
    initialData: ['initial data'],
    expire: ${expiration}
    watch: [idx],
    options: {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }
})

error: ${response.error}`

// ${response.value && JSON.stringify(response.value.filter((x,i) => i < 2), null, 2)}

   

    return(
        <Layout {...data}>

            <div className='p1 mb-3' style={{ background: '#4454', borderRadius: '6px', display: 'flex', flexDirection:'column'}}>

                <div style={{display:'flex'}}>

                    <button className='mr-0' onClick={() => setIdx(n => n - 1)}>{`<<`}</button>
                    <div className='ml-1 mr-1 p2' style={{flex: 1, background: '#eef2', minHeight: '5rem', borderRadius: '4px'}}>
                        {response.loading 
                        ? <div className='spin' style={{height: '4rem', width: '4rem', margin: '0 auto', boxShadow: '0px 4px 4px white', borderRadius: '50%'}}/>
                        : response.data 
                        ? <>
                            <h4>{response.data.id} - {response.data.title}</h4>
                            <small>{response.data.body}</small>
                        </>
                        : <p>No data...</p>
                    }
                    </div>
                    <button className='mr-0' onClick={() => setIdx(n => n + 1)}>{`>>`}</button>
                </div>

                <div className='pt-1' style={{display:'flex', justifyContent: 'stretch'}}>
                    <button style={{flex:1}} onClick={() => response.reload()}>Reload Request</button>
                    <button style={{flex:1}} onClick={() => setExpiration(n => n + 100)}>Increase Expiration</button>
                    <button style={{flex:1, marginRight:0}} onClick={() => setExpiration(n => n - 100)}>Decrease Expiration</button>
                </div>

            </div>
            

            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>
        </Layout>
    )
}


export default DemoComponent