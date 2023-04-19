import React from 'react'

interface ICopyText{
    text: string;
    display: string;
}
const CopyText = (props: ICopyText) => (
    <button onClick={() => {navigator.clipboard.writeText(props.text)}}>
        {props.display || 'Copy to Clipboard'}
    </button>
)

export default CopyText