// @ts-nocheck
import React, { useEffect, useState, useRef } from 'react'
import Layout from '/src/components/DemoLayout'
import Methods from '/src/components/Methods'
import Method from '/src/components/Method'
import HeadlessTable from '/src/components/HeadlessTable' 
import { useStateMap } from '@pratiq/hooks'
// import { useStateArray } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import { getHookDataByTitle } from '/utils/getHooks'
const data = getHookDataByTitle('useStateMap')





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
    const {value, get, set, remove, clear, reset} = useStateMap([['one', 1]])


    const items = [
        { // set
            title: 'set',
            description: 'Assign a value to a key in the map',
            methods:[
                {
                    pre: `set( 'one', 1 )`,
                    func: () => setTestValue(set('one', 1))
                },
                {
                    pre: `set( 2, { value: 2 } )`,
                    func: () => setTestValue(set('two', { value: 2 }))
                },
                {
                    pre: `set( { key: 3 }, [3, 3, 3] )`,
                    func: () => setTestValue(set({key:3}, [3,3,3]))
                },
                {
                    pre: `set( () => {}, function four(){} )`,
                    func: () => setTestValue(set(() => {}, function four(){}))
                },
            ]
        },
        { // get
            title: 'get',
            description: 'Get a value from the map at the provided key',
            methods:[
                {
                    pre: `get('one')`,
                    func: () => setTestValue(get('one'))
                },
                {
                    pre: `get(2)`,
                    func: () => setTestValue(get(2))
                },
                {
                    pre: `get({ key: 3 })`,
                    func: () => setTestValue(get({ key: 3 }))
                },
                {
                    pre: `get(()=>{})`,
                    func: () => setTestValue(get(()=>{}))
                },
            ]
        },
        { // clear
            title: 'clear',
            description: 'Empty the set',
            methods:[
                {
                    pre: `clear()`,
                    func: () => { clear(); setTestValue(undefined) }
                },
            ]
        },
        { // reset
            title: 'reset',
            description: 'Reset the map to the initial state',
            methods:[
                {
                    pre: `reset()`,
                    func: () => { reset(); setTestValue(undefined) }
                },
            ]
        },
    ]

    console.log(function four(){})





    return(
        <Layout title={data.title} description={data.description}>
            <input type='hidden' id='cypress-initial-value' value={JSON.stringify(initialState)} />
            <input type='hidden' id='cypress-array' value={value} />
            <input type='hidden' id='cypress-return' value={JSON.stringify(testValue)} />

            {/* <pre>{JSON.stringify(Array.from(value.entries()))}</pre> */}
            <MethodRows items={items}/>
            <HeadlessTable items={[
                ['Return value', typeof testValue === 'function' ? testValue.toString() : JSON.stringify(testValue)], 
                ...Array.from(value.entries())
                .map(([x,y]) => [
                    typeof x === 'function' ? x.toString() : JSON.stringify(x), 
                    typeof y === 'function' ? y.toString() : JSON.stringify(y)
                ])
            ]}/>
            <p>{get('one')}</p>

        </Layout>
    )
}

export default demoComponent