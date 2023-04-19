// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import { usePerformance } from '@pratiq/hooks'
import {DemoLayout as Layout, Card, HeadlessTable} from '/src/components'
import { getHookDataByTitle } from '/utils/getHooks'
const data = getHookDataByTitle('usePerformance')


//+ useAsync
const DemoComponent = (props:any) => {

    const perf = usePerformance({
        roll: 100
    })

    const [last, setLast] = useState<any>({})

    const loopt = ()=> {
        perf.tick()
        setTimeout(()=>{
            loopt()
        }, 500)
    }

    
    useEffect(()=>{
        console.log('last:', perf.totalTicks < 100 ? perf.totalTicks : 100)
        setLast(perf.data[perf.totalTicks <= 100 ? perf.totalTicks : 100])
    },[perf.totalTicks])
    

    


    const demoCode = 
`
${JSON.stringify(last, null, 2)}
`
 


    return(
        <Layout {...data}>

            <button onClick={() => loopt()}>Loop</button>
            <button onClick={() => perf.tick()}>Tick</button>
            <button onClick={() => perf.reset()}>Reset</button>

            {/* <div style={{paddingBottom: '1rem', display: 'flex', flexDirection: 'column'}}>
                <p>{db.loading ? 'Loading...' : db.error ? error.toString() : (!db.value) ? 'null-value' : JSON.stringify(db.value)}</p>
                <div style={{marginTop: '1rem'}}>
                    <Method pre={`setValue("ayo")`} func={() => db.setValue("ayo")} />
                    <Method pre={`setValue("oii")`} func={() => db.setValue("oii")} />
                    <Method pre={`setValue({this: 'that', the: 'other'})`} func={() => db.setValue({this: 'that', the: 'other'})} />
                    <Method pre={`reset()`} func={() => db.reset()} />
                    <Method pre={`remove()`} func={() => db.remove()} />
                </div>
            </div> */}
            <HeadlessTable code items={[
                ['@totalTicks',perf.totalTicks],
                ['@totalTime',perf.totalTime],
                ['@tps',perf.tps],
                ['@last',perf.last],
                ['@min',perf.min],
                ['@max',perf.max],
                ['@average',perf.average],
                ['@rollingAverage',perf.rollingAverage],
                ['@rollingTotalTime',perf.rollingTotalTime],
            ]}/>

            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>
        </Layout>
    )
}


export default DemoComponent