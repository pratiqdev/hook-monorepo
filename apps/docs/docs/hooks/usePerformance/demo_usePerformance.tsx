// @ts-nocheck
import React, { useEffect, useRef, useState, useCallback } from 'react'
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
    const toRef = useRef(null)

    const loopt = ()=> {
        clearTimeout(toRef.current)
        perf.tick()
        toRef.current = setTimeout(()=>{
            loopt()
        }, Math.random() * 100)
    }
   
    const handleReset = () => {
        perf.reset()
        clearTimeout(toRef.current)
    }

    const findLast = useCallback(() => {
        setLast(() => perf.data.pop())
    },[perf])

    

    
    useEffect(()=>{
        findLast()
        // console.log('last:', perf.totalTicks < 100 ? perf.totalTicks : 100)
        // setLast(perf.data[perf.totalTicks <= 100 ? perf.totalTicks : 100])
    },[perf.totalTicks])
    

    


 


    return(
        <Layout {...data}>

            <button onClick={() => loopt()}>Loop</button>
            <button onClick={() => perf.tick()}>Tick</button>
            <button onClick={handleReset}>Reset</button>

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

            <CodeBlock language='ts' className='demo-display' >{JSON.stringify(perf.data, null, 2)}</CodeBlock>
            <CodeBlock language='ts' className='demo-display' >{JSON.stringify(perf, null, 2)}</CodeBlock>
        </Layout>
    )
}


export default DemoComponent