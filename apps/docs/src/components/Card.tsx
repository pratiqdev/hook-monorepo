import React from 'react'

type T_CardProps = {
    style?: any;
    children?: React.ReactNode;
    className?:string;
}

const Card = (props:T_CardProps) => {
    return (
        <div className={'card' + ' ' + props.className} style={props.style}>
            {props.children}
        </div>
    )
}

export default Card