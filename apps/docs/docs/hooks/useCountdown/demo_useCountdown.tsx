// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Layout from '/src/components/DemoLayout'
import Card from '/src/components/Card'
import HeadlessTable from '/src/components/HeadlessTable'
import Method from '/src/components/Method'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import { useCountdown } from '@pratiq/hooks'
import { getHookDataByTitle } from '/utils/getHooks'
const data = getHookDataByTitle('useCountdown')


//+ useAsync
const DemoComponent = (props:any) => {
    const [log, setLog] = useState('no-log')
    const [timeString, setTimeString] = useState('')

    const { 
      time,                           // current state of the countdown timer
      done,                           // is the countdown done
      running,                        // is the timer running
      started,                        // has the timer started
      start,                          // start the countdown
      stop,                           // stop (pause) the countdown
      reset,                          // reset state to initial values
    } = useCountdown({
      duration: 100_000_000,               // total duration of the countdown
      interval: 10,                   // time (ms) between time refresh
      callbacks: {                    // object containing callback functions
        'start':() => setLog('started'), // invoked when timer started
        'end':  () => setLog('over'),    // invoked when timer reaches 0
        7000:   () => setLog('7000ms'),  // invoked at 7000ms (time state)
        3000:   () => setLog('3000ms'),  // invoked at 3000ms (time state)
      },
     })

     useEffect(()=>{
        let t = '// time: {'
        Object.entries(time).forEach(x => {
            t += `\n//    ${x[0]}: ${x[1]}`
        })
        t += '\n// }'
        setTimeString(t)
     },[time])

const demoCode = 
`const [log, setLog] = useState('no-log')

const { 
    time,                    
    done,                        
    running,                    
    started,                     
    start,                     
    stop,                             
    reset,                               
} = useCountdown({
    duration: 10_000,           
    interval: 10,              
    callbacks: {                     
        'start':() => setLog('started'),
        'end':  () => setLog('over'),  
        7000:   () => setLog('7000ms'),
        3000:   () => setLog('3000ms'),
    },
})`

const handleReset = () => {
    reset()
    setLog('no-log')
}
   
const [mill, setMill] = useState('000')
useEffect(()=>{
    let t = time.milliseconds+''
    while(t.length < 3){
        t += '0'
    }
    setMill(t)
}, [time.milliseconds])

    return(
        <Layout {...data}>
            <div style={{paddingBottom: '0rem'}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#ccc4', padding: '.5rem',borderRadius: '.5rem', width: 'min-content'}}>
                    <h3 style={{letterSpacing: '.2rem', fontFamily: 'monospace', whiteSpace: 'nowrap', minWidth: '16rem', textAlign: 'center'}}>{time.days < 10 ? '0'+time.days : time.days+''}<small>d</small> {time.hours < 10 ? '0'+time.hours : time.hours}:{time.minutes < 10 ? '0'+time.minutes : time.minutes}:{time.seconds < 10 ? '0'+time.seconds : time.seconds}.{mill}</h3>
                    <div style={{display: 'flex', justifyContent:'space-between', background: '#ccc4', padding: '.5rem', paddingRight: '0',borderRadius: '.5rem', width: '100%'}}>
                        <button onClick={start}>Start</button>
                        <button onClick={stop}>Stop</button>
                        <button onClick={reset}>Reset</button>
                    </div>
                </div>
            </div>
            <HeadlessTable code={2} items={[
                ['log', '', log],
                ['done', '', done+''],
                ['running', '', running+''],
                ['started', '', started+''],
                ['time', 'days', time.days+''],
                ['', 'hours', time.hours+''],
                ['', 'minutes', time.minutes+''],
                ['', 'seconds', time.seconds+''],
                ['', 'milliseconds', time.milliseconds+''],
                ['', 'total', time.total+''],
            ]}/>

            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>
        </Layout>
    )
}


export default DemoComponent