import React, { useState } from 'react'
import CodeBlock from '@theme/CodeBlock'

const ChevronIconRight = () => <div className='chevron-icon-right' />
const ChevronIconDown = () => <div className='chevron-icon-down' />

const Methods = (props:any) => {
    const {title, description, type} = props.item
    const [open, setOpen] = useState(props.open || false)
    return(
        <div className='method-container'>
            <div className='title-row' id={`cypress-${title}`} onClick={()=>setOpen(b => !b)}>
                <div className='chevron'>
                    {open ? <ChevronIconDown /> : <ChevronIconRight />}
                </div>
                <b>{title}</b>
                <small>{description}</small>
            </div>
            <div className={open ? 'method-open' : 'method-closed'}>
                {type && 
                    <div style={{marginBottom: '1rem'}}>
                    <CodeBlock language='ts' >
                            {type}
                        </CodeBlock>
                    </div>
                }
                {props.children}
            </div>
        </div>
    )
}

export default Methods