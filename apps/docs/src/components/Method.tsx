import React from 'react'
import CodeBlock from '@theme/CodeBlock'

interface IMethodProps {
    title?: string;
    pre?: string;
    desc?: string;
    func?: any;
    hidden?: boolean;
    idx?: number;
}

const Method = (props:IMethodProps) => {
    return(
        <div className={!props.hidden ? 'desc-row' : 'desc-row-hidden'}>
            <button id={`cypress-${props.title}-${props.idx + 1}`} className={props.pre} onClick={props.func}>{' '}</button>
            <CodeBlock className='method-pre' language='ts'>{props.pre || `HIDDEN ${props.title}`}</CodeBlock>
            <p>{props.desc}</p>
        </div>
    )
}

export default Method