// @ts-nocheck
import React, { useCallback, useEffect, useState } from 'react'
import Layout from '/src/components/DemoLayout'
import HeadlessTable from '/src/components/HeadlessTable'
// import { useInput } from '@pratiq/hooks'
import useAsync from '/src/hooks/useAsync'
import CodeBlock from '@theme/CodeBlock'
import wait from '/utils/wait'
import { getHookDataByTitle } from '/utils/getHooks'
const data = getHookDataByTitle('useAsync')

//+ useAsync
const DemoComponent = (props:any) => {
    const [item, setItem] = useState(5)
    const [displayData, setDisplayData] = useState(null)

    const myFunc = async (n:number) => {
        try{
            console.log('>> myFunc:', n)
            let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${n}`)
            await wait()
            return response.json()
        }catch(err){
            return 'Fetch error:', err
        }
    }

    const doAsync = useAsync(myFunc, {
        autoLoad: false,
        initialData: {title: 'Press Next, Previous or Reload...', body: 'This is the initialData, used to display placeholder or temporary data while the data is loading.'},
        deps: [item],
    })

    useEffect(()=>{
        if(doAsync.data && typeof doAsync.data === 'object' && 'body' in doAsync.data){
            setDisplayData({...doAsync.data, body: doAsync.data.body.substring(0,200) + '...'})
        }else{
            setDisplayData(doAsync.data)
        }
    },[doAsync.data])


    return(
        <Layout title={data.title} description={data.description}>


    
<div className='p0 m0 mb-3' style={{ background: '#8882', margin: '1rem', borderRadius: '6px', display: 'flex'}}>
    <button className='mr-0' onClick={() => setItem(p => p - 1)}>{`<<`}</button>
    <div className='ml-1 mr-1 p2' style={{flex: 1, background: '#8884', minHeight: '5rem', borderRadius: '4px'}}>
        {doAsync.loading 
        ? <div className='spin' style={{height: '4rem', width: '4rem', margin: '0 auto', boxShadow: '0px 4px 4px white', borderRadius: '50%'}}/>
        : displayData 
            ? <>
                <h4 >{(displayData.id ? displayData.id + ' - ' : '') + displayData.title}</h4>
                <small>{displayData.body}</small>
            </>
            : <>
                <h4 style={{color: 'white'}}>Error:</h4>
                <small>{doAsync.error}</small>
            </>
    }
    </div>
    <button className='mr-0' onClick={() => setItem(p => p + 1)}>{`>>`}</button>
</div>



<div style={{paddingBottom: '1rem'}}>
    <button onClick={doAsync.reload}>Reload</button>
    <button onClick={doAsync.reset}>Reset</button>
</div>

<HeadlessTable code={1} items={[
    ['item', item+''],
    ['loading', doAsync.loading+''],
    ['done', doAsync.done+''],
    ['error', doAsync.error+'' ?? 'null'],
    ['data', displayData ? JSON.stringify(displayData, null, 2) : 'null'],
]}/>


<CodeBlock language='ts' className='demo-display' >
{
`const [item, setItem] = useState(5)

const myFunc = async () => {
    try{
        let response = await fetch(\`https://placeholder.com/posts/\${item}\`)
        await wait()
        return response.json()
    }catch(err){
        return 'Fetch error:', err
    }
}

const doAsync = useAsync(myFunc, {
    autoLoad: false,
    initialData: ["default","data"],
    deps: [item]
})
`

}
</CodeBlock>





        </Layout>
    )
}


export default DemoComponent