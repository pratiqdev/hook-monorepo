// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Layout from '/src/components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import  HeadlessTable from '/src/components/HeadlessTable'
import { useGeolocation } from '@pratiq/hooks'

import { getHookDataByTitle } from '/utils/getHooks'
const metadata = getHookDataByTitle('useGeolocation')



//+ useAsync
const DemoComponent = (props:any) => {
    const [enableHighAccuracy, setEnableHighAccuracy] = useState(true)
    const [timeout, setGeoTimeout] = useState(Number.POSITIVE_INFINITY)
    const [maximumAge, setMaxAge] = useState(Number.POSITIVE_INFINITY)

    const data = useGeolocation({
        enableHighAccuracy,
        timeout,
        maximumAge
    })

//     const demoCode = 
// `const geo = useGeolocation({
//     enableHighAccuracy: ${enableHighAccuracy},
//     maximumAge: ${maximumAge},
//     timeout: ${timeout},
// })`

   

    return(
        <>


            <div style={{paddingBottom: '1rem', display: 'flex', flexDirection:'column'}}>
                <div style={{display:'flex', justifyContent:'space-between', width:'100%', border:'0px solid red'}}>

                    <div style={{marginBottom:'1rem'}}>
                        <div style={{display: 'flex', width: '20rem', justifyContent: 'space-between', marginBottom: '.5rem'}}>
                            <button className='p2'  onClick={() => setEnableHighAccuracy(false)}>-</button>
                            <p>High Accuracy ( {enableHighAccuracy+''} )</p>
                            <button className='p2' onClick={() => setEnableHighAccuracy(true)}>+</button>
                        </div>
                        {/* <button onClick={() => setEnableHighAccuracy(b => !b)}>{enableHighAccuracy ? 'Disable' : 'Enable'} High Accuracy</button> */}
                        <div style={{display: 'flex', width: '20rem', justifyContent: 'space-between', marginBottom: '.5rem'}}>
                            <button  className='p2' onClick={() => setGeoTimeout(n => n === 0 ? Number.POSITIVE_INFINITY : n === Number.POSITIVE_INFINITY ? 0 : n - 100)}>-</button>
                            <p>Timeout ( {timeout} )</p>
                            <button className='p2'  onClick={() => setGeoTimeout(n => n + 100)}>+</button>
                        </div>
                        <div style={{display: 'flex', width: '20rem', justifyContent: 'space-between'}}>
                            <button className='p2'  onClick={() => setMaxAge(n => n === 0 ? Number.POSITIVE_INFINITY : n === Number.POSITIVE_INFINITY ? 0 : n - 100)}>-</button>
                            <p>Max Age ( {maximumAge} )</p>
                            <button className='p2'  onClick={() => setMaxAge(n => n + 100)}>+</button>
                        </div>
                    </div>

                    <div style={{margin:'1rem', marginTop:0}} >
                        <div style={{margin:'0rem', height:'6rem', width:'6rem', borderRadius:'50%', background: '#000', display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <div style={{fontSize:'2rem', position:'absolute', color: '#889', fontWeight:'bold'}}>{data?.direction ?? ''}</div>
                            <div style={{position: 'absolute', fontSize:'.8rem'}}>{data?.data ? parseInt(data?.heading) : ''}</div>
                            <div style={{backgroundImage:`linear-gradient(red 25%, white 25%)`, height:'5.5rem', width:'.1rem', borderRadius:'50%', transform: `rotate(${data?.heading}deg)`}} />
                        </div>
                        
                    </div>
                </div>
                

                {/* {data.error && <p>TYPE | {typeof data.error}</p>} */}
                {/* <HeadlessTable code={1} items={[
                    ['geo','error', '', data?.error+''],
                    ['geo','active', '', data?.active+''],
                    ['','data','accuracy', data?.data?.accuracy+''],
                    ['','','altitudeAccuracy', data?.data?.altitudeAccuracy+''],
                    ['','','heading', data?.data?.heading+''],
                    ['','','direction', data?.data?.direction+''],
                    ['','','latitude', data?.data?.latitude+''],
                    ['','','longitude', data?.data?.longitude+''],
                    ['','','speed', data?.data?.speed+''],
                    ['','','timestamp', data?.data?.timestamp+''],
                    ['','','delta', data?.data?.delta+''],
                ]}/>
                
            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock> */}
            </div>
        </>
    )
}


export default DemoComponent