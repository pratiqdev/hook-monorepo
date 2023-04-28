import React from 'react'
import { Card } from '@site/src/components'

let offColor = '#ccc4'
let onColor = `#aaf`



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

export default ClickCards