// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Layout from '/src/components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import Method from '@site/src/components/Method'
import { useEventListener } from '@pratiq/hooks'
import Card from '/src/components/Card'
import { getHookDataByTitle } from '/utils/getHooks'
const data = getHookDataByTitle('useEventListener')


let offColor = '#ccc4'
let onColor = `#aaf`
let keys1 = ['q','w','e','r','t','y','u','i','o','p', '{', '}']
let keys2 = ['a','s','d','f','g','h','j','k','l', ':', '"']
let keys3 = ['z','x','c','v','b','n','m', '<', '>']

const Keyboard = ({ keyb: key }) => {

    const style = {
        width: '1.4rem', 
        height: '1.4rem', 
        background: '#222', 
        color: '#ccc', 
        borderRadius:'.25rem', 
        marginRight: '.25rem', 
        display: 'flex', 
        alignItems:'center', 
        justifyContent:'center', 
        cursor:'not-allowed'
    }

    return(
        <Card>
            <div style={{display: 'flex', marginBottom:'0rem', padding: '.25rem', paddingBottom:0, paddingTop:'.5rem', background: '#000', width: '18rem', justifyContent:'center', borderTopLeftRadius: '.5rem', borderTopRightRadius: '.5rem', cursor: 'not-allowed'}}>
                {keys1.map(x =>
                <p key={x} style={{
                    ...style,
                    border: key === x ? `1px solid ${onColor}` : '1px solid transparent',
                }} name={x}>{x.toUpperCase()}</p>
                )}
            </div>
            <div style={{display: 'flex', marginBottom:'0rem', padding: '.25rem', paddingBottom:0, background: '#000', width: '18rem', justifyContent:'center', cursor: 'not-allowed'}}>
                {keys2.map(x =>
                <p key={x} style={{
                    ...style,
                    border: key === x ? `1px solid ${onColor}` : '1px solid transparent',
                }} name={x}>{x.toUpperCase()}</p>
                )}
            </div>
            <div style={{display: 'flex', marginBottom:'1rem', padding: '.25rem', background: '#000', width: '18rem', justifyContent:'center', paddingBottom: '.5rem', borderBottomLeftRadius: '.5rem', borderBottomRightRadius:'.5rem', cursor: 'not-allowed'}}>
                {keys3.map(x =>
                <p key={x} style={{
                    ...style,
                    border: key === x ? `1px solid ${onColor}` : '1px solid transparent',
                }} name={x}>{x.toUpperCase()}</p>
                )}
            </div> 

        </Card>
    )
}


const ClickCards = ({ fruit }) => {
    return (

        <Card>
            <div style={{display: 'flex', marginBottom:'1rem'}}>
                <button name='A' style={{background: fruit === 'A' ? onColor : offColor, width:'100%'}}>
                    <h2 style={{margin: '1rem', pointerEvents: 'none'}}>A</h2>
                </button>
                <button name='B' style={{background: fruit === 'B' ? onColor : offColor, width:'100%'}}>
                    <h2 style={{margin: '1rem', pointerEvents: 'none'}}>B</h2>
                </button>
                <button name='C' style={{background: fruit === 'C' ? onColor : offColor, width:'100%', }}>
                    <h2 style={{margin: '1rem', pointerEvents: 'none'}}>C</h2>
                </button>
            </div>
        </Card>

    )
}

//+ useAsync
const DemoComponent = (props:any) => {
    const [log, setLog] = useState('no events...')
    const [key, setKey] = useState('')
    const [fruit, setFruit] = useState('')

    const [active1, toggle1] = useEventListener('click', (e: any) => {
        if(e.target.name){
            setFruit(e.target.name)
        }
        setLog('click: ' + e.target.name || e.target.localName)
    })
    const [active2, toggle2] = useEventListener('keydown', (e: any) => {
        if(e.key){
            setKey(e.key)
        }
        setLog('key: ' + e.key)
    })

const demoCode = 
`const removeClickListener = useEventListener('click', (e) => log('click: ', e.target.localName))  
const removeKeydownListener = useEventListener('keydown', (e) => log('key: ', e.key))
asdf
// log: ${log}
`   
   
let offColor = '#ccc4'
let onColor = `#aaf`
let keys1 = ['q','w','e','r','t','y','u','i','o','p']
let keys2 = ['a','s','d','f','g','h','j','k','l']
let keys3 = ['z','x','c','v','b','n','m']

    return(
        <Layout {...data}>

            <div style={{paddingBottom: '0rem'}}>

            <button onClick={toggle2} style={{marginBottom:'.5rem', width: 'max-content'}}>{active2 ? 'Disable Keydown Listener' : 'Enable Keydown Listener'}</button>
            <Keyboard keyb={key}/>
                
            <button onClick={toggle1} style={{marginBottom:'.5rem', width:'max-content'}}>{active1 ? 'Disable Click Listener' : 'Enable Click Listener'}</button>
            <ClickCards fruit={fruit}/>


            </div>

            

            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>


        </Layout>
    )
}


export default DemoComponent