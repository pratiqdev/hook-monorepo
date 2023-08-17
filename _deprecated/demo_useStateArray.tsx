// @ts-nocheck
import React, { useEffect, useState, useRef } from 'react'
import Layout from '/src/components/DemoLayout'
import Methods from '/src/components/Methods'
import Method from '/src/components/Method'
import { useStateArray } from '@pratiq/hooks'
// import { useStateArray } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import d from '../hookData'
// const data = d.useStateArray
import { getHookDataByTitle } from '/utils/getHooks'
const data = getHookDataByTitle('useStateArray')
// console.log(d)



const allTypes = [
    'no-value',
    'string',
    '',
    true,
    false,
    1,
    0,
    null,
    undefined,
    {},
    [],
    ()=>{}
]

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
    const [testValue, setTestValue] = useState<any>('')
    const {array, ...methods} = useStateArray(initialState)
    const lastTV = useRef('')

    // const GenerateMethodForEachType = (props) => {
    //     return allTypes.map((x,i) => 
    //         <Method 
    //             id={`${props.method}-x${i + 1}`}
    //             hidden={props.hidden || false} 
    //             func={() => {
    //                 if(x === 'no-value'){
    //                     setTestValue(() => methods[props.method]())
    //                 }else{
    //                     setTestValue(() => methods[props.method](x))
    //                 }
    //             }}
    //         />
    //     )
    // }

    const hookMethod = (methodName: string, ...value: any) => {
        setTestValue(JSON.stringify(methods[methodName](...value) || undefined))
    }

    const items = [
        { // clear
            title: 'clear',
            description: 'Set the state to an empty array',
            methods:[
                {
                    pre: `clear()`,
                    func: () => hookMethod('clear', '')
                },
            ]
        },
        { // reset
            title: 'reset',
            description: 'Reset the state to the initial value',
            methods:[
                {
                    pre: `reset()`,
                    func: () => hookMethod('reset', '')
                },
            ]
        },
        { // set
            title: 'set',
            description: 'Set the state to a new array, accepts values or a callback function',
            methods:[
                {
                    pre: `set([])`,
                    func: () => hookMethod('set', [])
                },
                {
                    pre: `set([1,2,3])`,
                    func: () => hookMethod('set', [1,2,3])
                },
                {
                    pre: `set((arr) => [...arr, 4,5,6])`,
                    func: () => hookMethod('set', (arr) => [...arr, 4,5,6])
                },
                {
                    pre: `set(['Hello', 'World'])`,
                    func: () => hookMethod('set', ['Hello', 'World'])
                },
                {
                    pre: `set([
    {text: 'Hello'}, 
    {text: 'World'}
])`,
                    func: () => hookMethod('set', [{text: 'Hello'},{text: 'World'}])
                },
                {
                    pre: `set([[1,2,3], [4,5,6]])`,
                    func: () => hookMethod('set', [[1,2,3],[4,5,6]])
                },
            ]
        },
        { // push
            title: 'push',
            description: 'Add a new value at the end of the array, returns the new length',
            methods:[
                {
                    pre: `push('new')`,
                    func: () => hookMethod('push', 'new')
                },
                {
                    pre: `push(1,2,3)`,
                    func: () => hookMethod('push', 1,2,3)
                },
                {
                    pre: `push([1,2,3])`,
                    func: () => hookMethod('push', [1,2,3]) 
                },
                {
                    pre: `push([{'hello': 'world'}])`,
                    func: () => hookMethod('push', {'hello': 'world'}) 
                },
            ]
        },
        { // unshift
            title: 'unshift',
            description: 'Add a new value at the beginning of the array, returns the new length',
            methods:[
                {
                    pre: `unshift('new')`,
                    func: () => hookMethod('unshift', 'new')
                },
                {
                    pre: `unshift(1,2,3)`, 
                    func: () => hookMethod('unshift', 1,2,3)
                },
                {
                    pre: `unshift([1,2,3])`,
                    func: () => hookMethod('unshift', [1,2,3])
                },
                {
                    pre: `unshift([{'hello': 'world'}])`,
                    func: () => hookMethod('unshift', {'hello':'world'})
                },
            ]
        },
        { // pop
            title: 'pop',
            description: 'Removes the last element of an array, and returns that element',
            methods:[
                {
                    pre: `pop()`,
                    func: () => hookMethod('pop', '')
                },
            ]
        },
        { // shift
            title: 'shift',
            description: 'Removes the first element of the array, returns that element',
            methods:[
                {
                    pre: `shift()`,
                    func: () => hookMethod('shift', '')
                },
            ]
        },
        { // filter
            title: 'filter',
            description: 'Set the state to a new array containing elements that pass the provided test.',
            methods:[
                {
                    pre: `filter((v) => typeof v === 'number')`,
                    func: () => hookMethod('filter', (v:any) => typeof v === 'number')
                },
                {
                    pre: `filter((v) => typeof v === 'string')`,
                    func: () => hookMethod('filter', (v:any) => typeof v === 'string')
                },
                {
                    pre: `filter((v) => (v) => v >= 3)`,
                    func: () => hookMethod('filter', (v:any) => v >= 3)
                },
            ]
        },
        { // fill
            title: 'fill',
            description: 'Fill the elements in the array with a static value.',
            methods:[
                {
                    // fill arr with 6's from idx1 to idx2: [1,2,3] => [1,6,3]
                    pre: `fill(6, 1, 2)`,
                    func: () => hookMethod('fill', 6,1,2)
                },
                {
                    pre: `fill(7, 1)`,
                    func: () => hookMethod('fill', 7,1)
                },
                {
                    pre: `fill(8)`,
                    func: () => hookMethod('fill', 8)
                },
                {
                    // length - increase array cap to 8 (pad with 0's)
                    // fill with 9's from idx1 to 1dx2
                    pre: `fill(9, 1, 2, 8)`, 
                    func: () => hookMethod('fill', 9,1,2,8)
                },
                {
                    pre: `fill(10, 0, 10, 10)`, 
                    func: () => hookMethod('fill', 10,0, 10,10)
                },
            ]
        },
        { // reverse
            title: 'reverse',
            description: 'Reverse the values of an array.',
            methods:[
                {
                    pre: `reverse()`,
                    func: () => hookMethod('reverse')
                },
            ]
        },
        { // sort
            title: 'sort',
            description: 'Sort the values of an array using the callback provided.',
            methods:[
                {
                    pre: `sort((a,b) => a < b ? 1 : -1)`,
                    func: () => hookMethod('sort', (a,b) => a < b ? 1 : -1)
                },
                {
                    pre: `sort((a,b) => a > b ? 1 : -1)`,
                    func: () => hookMethod('sort', (a,b) => a > b ? 1 : -1)
                },
                {
                    pre: `sort((a,b) => b - a)`,
                    func: () => hookMethod('sort', (a,b) => b - a) // desc
                },
            ]
        },
        { // splice
            title: 'splice',
            description: 'Splice values into or out of the array.',
            type: '(start: number, deleteCount?: number, items?:any) => void',
            methods:[
                {
                    pre: `sort(0)`,
                    func: () => hookMethod('splice', (a,b) => a < b)
                },
            ]
        },
    ]



    return(
        <Layout title={data.title} description={data.description}>
            <input type='hidden' id='cypress-initial-value' value={JSON.stringify(initialState)} />
            <input type='hidden' id='cypress-array' value={JSON.stringify(array)} />
            <input type='hidden' id='cypress-return' value={JSON.stringify(testValue)} />
            
            
            <CodeBlock language='ts' className='demo-display' >{`// [ array state ] => return value \n`}{JSON.stringify(array, null, 0)}{testValue && ` => ${testValue}`}</CodeBlock>

            {/* <Method hidden id='clear-test-value' func={() => setTestValue('')}  /> */}

            <MethodRows items={items}/>



            {/* 

            <Methods title='clear' desc='Set the state to an empty array' open>
                <Method id='clear' pre='clear()' func={() => methods.clear()}  />
            </Methods>


            <Methods title='reset' desc='Set the state to the initial value' >
                <Method id='reset' pre='reset()' func={() => methods.reset()}  />
            </Methods>


            <Methods title='set' desc='Set the state to a new array' >
                <Method id='set-1' pre='set([1,2,3])' func={() => methods.set([1,2,3])}  />
                <Method id='set-2' pre="set(['one','two','three'])" func={() => methods.set(['one','two','three'])}  />
                <Method id='set-3' pre='set([{text:"Hello"},{text:"World"}])' func={() => methods.set([{text:"Hello"},{text:"World"}])}  />
                <Method id='set-4' pre='set([[[[[["why"]]]]]])' func={() => methods.set([[[[[["why"]]]]]])}  />
                <Method id='set-4' pre='set("not","an","array")' func={() => methods.set('not')}  />

                <Method hidden id='set-x1' func={() => methods.set()}  />
                <Method hidden id='set-x2' func={() => methods.set(null)}  />
                <Method hidden id='set-x3' func={() => methods.set(undefined)}  />
                <Method hidden id='set-x4' func={() => methods.set(true)}  />
                <Method hidden id='set-x5' func={() => methods.set(1)}  />
                <Method hidden id='set-x6' func={() => methods.set({})}  />
                <Method hidden id='set-x7' func={() => methods.set('not an array')}  />
                <Method hidden id='set-x8' func={() => methods.set([])}  /> 
            </Methods>


            <Methods title='push' desc='Append element(s) to the end of the array' >
                <Method id='push-1' pre='push(7)' func={() => methods.push(7)}  />
                <Method id='push-2' pre="push('seven')" func={() => methods.push('seven')}  />
                <Method id='push-3' pre='push(7,8,9)' func={() => methods.push(7,8,9)}  />
                <Method id='push-4' pre='push([7,8,9])' func={() => methods.push([7,8,9])}  />

                <Method hidden id='push-x1' func={() => methods.push()}  />
                <Method hidden id='push-x2' func={() => methods.push(false)}  />
                <Method hidden id='push-x3' func={() => methods.push({})}  />
                <Method hidden id='push-x4' func={() => methods.push('string')}  />
                <Method hidden id='push-x5' func={() => methods.push([])}  />
            </Methods>


            <Methods title='unshift' desc='Adds an element(s) to the beginning of the array and returns new length' >
                <Method id='unshift-1' pre="unshift(9)" func={() => setTestValue(() => methods.unshift(9))}  />
                <Method id='unshift-2' pre="unshift('hello')" func={() => setTestValue(() => methods.unshift('hello'))}  />
                <Method id='unshift-3' pre="unshift(9,10,11)" func={() => setTestValue(() => methods.unshift(9,10,11))}  />
                <Method id='unshift-4' pre="unshift([9,10,11])" func={() => setTestValue(() => methods.unshift([9,10,11]))}  />

                <Method hidden id='unshift-x1' func={() => setTestValue(() => methods.unshift())}  />
                <Method hidden id='unshift-x2' func={() => setTestValue(() => methods.unshift(true))}  />
                <Method hidden id='unshift-x3' func={() => setTestValue(() => methods.unshift(false))}  />
                <Method hidden id='unshift-x4' func={() => setTestValue(() => methods.unshift(null))}  />
                <Method hidden id='unshift-x5' func={() => setTestValue(() => methods.unshift(undefined))}  />
                <Method hidden id='unshift-x6' func={() => setTestValue(() => methods.unshift(1))}  />
                <Method hidden id='unshift-x7' func={() => setTestValue(() => methods.unshift(0))}  />
                <Method hidden id='unshift-x8' func={() => setTestValue(() => methods.unshift({}))}  />
                <Method hidden id='unshift-x9' func={() => setTestValue(() => methods.unshift([]))}  />
            </Methods>


            <Methods title='pop' desc='Remove and return the last element in the array' >
                <Method id='pop-1' pre="pop()" func={() => setTestValue(() => methods.pop())}  />

                <Method hidden id='pop-x1' func={() => setTestValue(() => methods.pop(true))}  />
                <Method hidden id='pop-x2' func={() => setTestValue(() => methods.pop(false))}  />
                <Method hidden id='pop-x3' func={() => setTestValue(() => methods.pop(null))}  />
                <Method hidden id='pop-x4' func={() => setTestValue(() => methods.pop(undefined))}  />
                <Method hidden id='pop-x5' func={() => setTestValue(() => methods.pop(1))}  />
                <Method hidden id='pop-x6' func={() => setTestValue(() => methods.pop('string'))}  />
                <Method hidden id='pop-x7' func={() => setTestValue(() => methods.pop({}))}  />
                <Method hidden id='pop-x8' func={() => setTestValue(() => methods.pop([]))}  />
            </Methods>


            <Methods title='shift' desc='Remove and return the first element in the array' >
                <Method id='shift-1' pre="shift()" func={() => setTestValue(() => methods.shift())}  />

                <Method id='shift-x1' func={() => setTestValue(() => methods.shift(true))}  />
                <Method id='shift-x2' func={() => setTestValue(() => methods.shift(true))}  />
                <Method hidden id='shift-x3' func={() => setTestValue(() => methods.shift(null))}  />
                <Method hidden id='shift-x4' func={() => setTestValue(() => methods.shift(undefined))}  />
                <Method hidden id='shift-x5' func={() => setTestValue(() => methods.shift(1))}  />
                <Method hidden id='shift-x6' func={() => setTestValue(() => methods.shift('string'))}  />
                <Method hidden id='shift-x7' func={() => setTestValue(() => methods.shift({}))}  />
                <Method hidden id='shift-x8' func={() => setTestValue(() => methods.shift([]))}  />
            </Methods>


            <Methods title='filter' desc='Set the state to a new array containing all elements that passed the provided test' >
                <Method id='filter-1' pre="filter(n => typeof n === 'number')" func={() => methods.filter(n => typeof n === 'number')}  />
                <Method id='filter-2' pre="filter(n => typeof n === 'string')" func={() => methods.filter(n => typeof n === 'string')}  />
                <Method id='filter-3' pre="filter(n => n === 1)" func={() => methods.filter(n => n === 1)}  />

                <Method hidden id='filter-x1' func={() => methods.filter(n => n === n)}  />
                <Method hidden id='filter-x2' func={() => methods.filter((v, i, a) => a.includes(v))}  />
                <Method hidden id='filter-x3' func={() => methods.filter()}  />
                <Method hidden id='filter-x4' func={() => methods.filter(false)}  />
                <Method hidden id='filter-x5' func={() => methods.filter(true)}  />
                <Method hidden id='filter-x6' func={() => methods.filter(null)}  />
                <Method hidden id='filter-x7' func={() => methods.filter(undefined)}  />
                <Method hidden id='filter-x8' func={() => methods.filter(1)}  />
                <Method hidden id='filter-x9' func={() => methods.filter('string')}  />
                <Method hidden id='filter-x10' func={() => methods.filter({})}  />
            </Methods>

            <Methods title='sort' desc='Sort the array with an optional sort method' >
                <Method id='sort-1' pre="sort()" func={() => setTestValue(() => methods.sort())}  /> 
                <Method id='sort-2' pre="sort((a,b) => a < b ? 1 : -1)" func={() => setTestValue(() => methods.sort((a,b) => a < b))}  /> 
                <Method id='sort-3' pre="sort((a,b) => a < b ? -1 : 1)" func={() => setTestValue(() => methods.sort((a,b) => a < b ? -1 : 1))}  />
                <Method id='sort-4' pre="sort((a,b) => a > b ? -1 : 1)" func={() => setTestValue(() => methods.sort((a,b) => a > b ? -1 : 1))}  />
            </Methods> */}

        </Layout>
    )
}

export default demoComponent