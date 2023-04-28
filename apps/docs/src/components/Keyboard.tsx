import React from 'react'
import { Card } from '@site/src/components'

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
                }} >{x.toUpperCase()}</p>
                )}
            </div>
            <div style={{display: 'flex', marginBottom:'0rem', padding: '.25rem', paddingBottom:0, background: '#000', width: '18rem', justifyContent:'center', cursor: 'not-allowed'}}>
                {keys2.map(x =>
                <p key={x} style={{
                    ...style,
                    border: key === x ? `1px solid ${onColor}` : '1px solid transparent',
                }} >{x.toUpperCase()}</p>
                )}
            </div>
            <div style={{display: 'flex', marginBottom:'1rem', padding: '.25rem', background: '#000', width: '18rem', justifyContent:'center', paddingBottom: '.5rem', borderBottomLeftRadius: '.5rem', borderBottomRightRadius:'.5rem', cursor: 'not-allowed'}}>
                {keys3.map(x =>
                <p key={x} style={{
                    ...style,
                    border: key === x ? `1px solid ${onColor}` : '1px solid transparent',
                }} >{x.toUpperCase()}</p>
                )}
            </div> 

        </Card>
    )
}

export default Keyboard