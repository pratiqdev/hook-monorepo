// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Layout from '/src/components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import Method from '@site/src/components/Method'
import { useKeyboard } from '@pratiq/hooks'
import {HeadlessTable} from '../../../src/components'
import { getHookDataByTitle } from '/utils/getHooks'
const data = getHookDataByTitle('useKeyboard')


//+ useAsync
const DemoComponent = (props:any) => {

    const keyb = useKeyboard({
        ignoreKeys: ['capslock', 'tab'],
        maxHistory: 10,
        combos: {
            'CTRL-E':   () => console.log('ctrl-e ---'),
            'shift-p':  () => console.log('shift-p ---'),
            'alt-1':    () => console.log('alt-1 ---'),
        }
    })
    
const demoCode = 
`const keyb = useKeyboard({
    ignoreKeys: ['capslock', 'tab'],
    maxHistory: 10.
    combos: {
        'CTRL-E':   () => console.log('ctrl-e ---'),
        'shift-p':  () => console.log('shift-p ---'),
        'alt-1':    () => console.log('alt-1 ---'),

    }
})`

   

    return(
        <Layout {...data}>
            {keyb && <>
                <div style={{paddingBottom: '1rem'}}>
                    <button onClick={keyb.reset}>Reset</button>
                    <button onClick={keyb.clearHistory}>Clear History</button>
                </div>
                <HeadlessTable style={{marginBottom: '1rem'}} code={2} items={[
                    ['key',`${keyb.key}`],
                    ['lastKey',`${keyb.lastKey}`],
                    ['combo',`${keyb.combo}`],
                    ['down',`${keyb.down}`],
                    ['ctrl',`${keyb.ctrl}`],
                    ['alt',`${keyb.alt}`],
                    ['shift',`${keyb.shift}`],
                    ['meta',`${keyb.meta}`],
                    ['repeat',`${keyb.repeat}`],
                    ['space',`${keyb.space}`],
                    ['lastEvent',`<KeyboardEvent> ${keyb.lastEvent}`],
                    ['events',`<KeyboardEvent[]> (${keyb.events.length}) keys => [${keyb.events.map(x => x.key)}]`],
                    ['history',`<KeyboardEvent[]> (${keyb.history.length}) keys => [${keyb.history.map(x => x.key)}]`],
                ]}/>
                <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>
            </>}
            
        </Layout>
    )
}


export default DemoComponent