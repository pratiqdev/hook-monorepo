// @ts-nocheck
import React, { useEffect, useState, useRef } from 'react'
import Layout from '/src/components/DemoLayout'
import Methods from '/src/components/Methods'
import Method from '/src/components/Method'
import { useStateSet } from '@pratiq/hooks'
// import { useStateArray } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import { getHookDataByTitle } from '/utils/getHooks'
const data = getHookDataByTitle('useStateSet')





const PanelHeader = (props) => <div><b className='panel-title'>{props.title}</b>{props.description}</div>

const MethodRows = (props:any) => (
        <div>
        {props.items.map((item, index) => 
            <Methods key={index} item={item}>
                {item.methods.map((m, i) =>  <Method key={m.pre} idx={i} pre={m.pre} title={item.title} func={m.func}/> )}
            </Methods>
        )}
    </div>
)


const demoComponent = (props:any) => {
    const initialState = [1,2,3,4]
    const [testValue, setTestValue] = useState<undefined | string>(undefined)
    const {value, add, remove, clear, reset} = useStateSet([1,2,3,4])

   

    const items = [
        { // set
            title: 'add',
            description: 'Add a new value to the set',
            methods:[
                {
                    pre: `add('a')`,
                    func: () => setTestValue(add('a'))
                },
                {
                    pre: `add('b')`,
                    func: () => setTestValue(add('b'))
                },
                {
                    pre: `add('c')`,
                    func: () => setTestValue(add('c'))
                },
                {
                    pre: `add('d')`,
                    func: () => setTestValue(add('d'))
                },
            ]
        },
        { // set
            title: 'remove',
            description: 'Remove a value from the set, returns true if item was in and removed from set',
            methods:[
                {
                    pre: `remove('a')`,
                    func: () => setTestValue(remove('a'))
                },
                {
                    pre: `remove('b')`,
                    func: () => setTestValue(remove('b'))
                },
                {
                    pre: `remove('c')`,
                    func: () => setTestValue(remove('c'))
                },
                {
                    pre: `remove('d')`,
                    func: () => setTestValue(remove('d'))
                },
            ]
        },
        { // set
            title: 'clear',
            description: 'Empty the set',
            methods:[
                {
                    pre: `clear()`,
                    func: () => { clear(); setTestValue(undefined) }
                },
            ]
        },
        { // set
            title: 'reset',
            description: 'Reset the set to initial state',
            methods:[
                {
                    pre: `reset()`,
                    func: () => { reset(); setTestValue(undefined) }
                },
            ]
        },
    ]





    return(
        <Layout title={data.title} description={data.description}>
            <input type='hidden' id='cypress-initial-value' value={JSON.stringify(initialState)} />
            <input type='hidden' id='cypress-array' value={value} />
            <input type='hidden' id='cypress-return' value={JSON.stringify(testValue)} />
            
            
            <CodeBlock language='ts' className='demo-display' >
                {`// [ state of Set ] => return value \n`}
                {Array.from(value.keys())}
                {typeof testValue !== 'undefined' ? ` => ${testValue}` : ''}
                </CodeBlock>

            <MethodRows items={items}/>

        </Layout>
    )
}

export default demoComponent