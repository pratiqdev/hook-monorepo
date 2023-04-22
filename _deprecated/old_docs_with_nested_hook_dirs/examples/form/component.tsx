import React from 'react'
import { useInput, useFetch } from '@pratiq/hooks'

const ExampleComponent = () => {
    const name = useInput({
        validateOnChange: true,
        validator: (v) => /^[a-z0-9]+$/.test(v)
    })
    const comment = useInput({
        validateOnChange: true,
        validator: (v) => v.length > 5
    })

    const agreeCheck = useInput({
        type: 'checkbox',
        value: 'false'
    })

    return(
        <>
            <p>Form Component</p>
            <div className='col'>
                <label className={name.isFocused ? 'text-white' : 'text-grey'}>Name {name.isValid && '(valid)'}</label>
                <input {...name.bind} className={name.isValid ? 'border-green' : 'border-red'}/>
                <label className={comment.isFocused ? 'text-white' : 'text-grey'}>Comment</label>
                <input {...comment.bind} className={comment.isValid ? 'border-green' : 'border-red'}/>
                <input {...agreeCheck.bind} />
            </div>
            <pre>name: {name.value}</pre>
            <pre>comment: {comment.value}</pre>
            <pre>agree: {agreeCheck.value.toString()}</pre>
        </>
    )
}


export default ExampleComponent