import React from 'react'
import Link from '@docusaurus/Link'

const Button = (props:any) => {
    if(props.href){
        return (
            <Link href={props.href}>
                <button className='standard-button' {...props.style}>
                    {props.children}
                </button>
            </Link>
        )
    }
    return (
        <button  className='standard-button' {...props}>
            {props.children}
        </button>
    )
}
export default Button