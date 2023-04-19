// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Layout from '/src/components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import Method from '/src/components/Method'
import useDynamic from '/src/hooks/useDynamic'
import LoaderPage from './dyn_0'
import { getHookDataByTitle } from '/utils/getHooks'
const data = getHookDataByTitle('useDynamic')


//+ useAsync
const DemoComponent = (props:any) => {

    const DYN = useDynamic({
        'Dynamic Page 1': 'dyn_1',
        'Dynamic Page 2': './dyn_2',
        'Dynamic Page 3': './dyn_3',
        'Dynamic Page 4': './dyn_4',
    }, {
        fallback: <LoaderPage />,
        // default: 0,
        // preload: [0,1,2,3]
    })


const demoCode = 
`import LoaderPage from './LoaderPage'

const DYN = useDynamic({
    'Dynamic Page 1': './PageOne',
    'Dynamic Page 2': './PageTwo',
    'Dynamic Page 3': './PageThree',
    'Dynamic Page 4': './PageFour',
}, <LoaderPage />, 2)


return (
    <div>
        {DYN.names.map((name) => <button onClick={() => DYN.goto(name)}>{'> '+name}</button>)}

        <button onClick={DYN.next}>Next</button>
        <p>{DYN.index + 1}</p>
        <button onClick={DYN.prev}>Previous</button>

        <DYN.Component />
    </div>
)
`

   

    return(
        <Layout {...data}>
            {DYN && <>

                <div style={{display:'flex'}}>
                    <div style={{display:'flex', flexDirection: 'column', }}>
                        <div style={{paddingBottom: '1rem', display:'flex', justifyContent: 'center'}}>
                            {/* <Method pre={`start()`} func={start} /> */}
                            <button onClick={() => DYN.prev()} >{`<<`}</button>
                            <p style={{textAlign:'center', width: '100%'}}>{DYN.index + 1}</p>
                            <button onClick={() => DYN.next()}>{`>>`}</button>
                        </div>

                        <div style={{display: 'flex', flexDirection:'column', paddingBottom: '1rem', marginRight: '.5rem'}}>
                            {DYN.names.map((x:any, idx:number) => <p key={idx} style={{marginBottom:'.5rem', cursor: 'pointer', background: x === DYN.name ? '#aaa4' : 'none', border:'1px solid grey', padding: '.25rem .5rem', borderRadius: '.25rem', width: '100%', whiteSpace:'nowrap', textAlign:'center'}} onClick={() => DYN.goto(x)}>{`> `+x}</p>)}
                        </div>

                    </div>
                    <DYN.Component />
                </div>
                
            </>}
            
            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>
        </Layout>
    )
}


export default DemoComponent