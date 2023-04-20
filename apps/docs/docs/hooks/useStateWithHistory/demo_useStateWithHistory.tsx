// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react'
import Layout from '/src/components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import {Card, Method} from '@site/src/components'
import { useStateWithHistory } from '@pratiq/hooks'
import HeadlessTable from '/src/components/HeadlessTable'
import { getHookDataByTitle } from '/utils/getHooks'
const data = getHookDataByTitle('useStateWithHistory')


//+ useAsync
const DemoComponent = (props:any) => {

    const state = useStateWithHistory('zap', 10)

    const demoCode = 
`const myState = useStateWithHistory('zap', 10)

<p>{myState.value}</p>

<button onClick={() => myState.setValue('Apple')}>Apple</button>
<button onClick={() => myState.setValue('Banana')}>Banana</button>
<button onClick={() => myState.setValue('Cherry')}>Cherry</button>

<button onClick={myState.back}> {\`<<\`} </button>
<p>{state.pointer}</p>
<button onClick={myState.forward}> {\`>>\`} </button>

`




    return(
        <Layout {...data}>
            <Card style={{width:'max-content', marginBottom: '0'}}>
            <div style={{paddingBottom: '.5rem', display: 'flex', flexDirection: 'row'}}>
                <button onClick={() => state.setValue('Alice')} style={{background: state.value === 'Alice' ? 'green' : ''}}>Alice</button>
                <button onClick={() => state.setValue('Barry')} style={{background: state.value === 'Barry' ? 'green' : ''}}>Barry</button>
                <button onClick={() => state.setValue('Cindy')} style={{background: state.value === 'Cindy' ? 'green' : ''}}>Cindy</button>
                <button onClick={() => state.setValue('Dale')} style={{background: state.value === 'Dale' ? 'green' : ''}}>Dale</button>
                <button onClick={() => state.setValue('Erica')} style={{background: state.value === 'Erica' ? 'green' : ''}}>Erica</button>
            </div>
            <div style={{paddingBottom: '1rem', display: 'flex', flexDirection: 'row'}}>
                <button onClick={state.back} style={{flex:1}}>{`<<`}</button>
                <p style={{textAlign:'center', flex:1}}>{state.pointer}</p>
                <button onClick={state.forward} style={{flex:1}}>{`>>`}</button>
            </div>
            </Card>

            <HeadlessTable items={[
                ['value', state.value],
                ['history', JSON.stringify(state.history, null, 2)],
                ['pointer', state.pointer],
            ]} />

            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>

        </Layout>
    )
}


export default DemoComponent