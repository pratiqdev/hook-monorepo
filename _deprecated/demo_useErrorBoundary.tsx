// @ts-nocheck
import React, { useEffect, useState, useRef } from 'react'
import Layout from '/src/components/DemoLayout'
import CodeBlock from '@theme/CodeBlock'
import { useErrorBoundary } from '@pratiq/hooks'
import { getHookDataByTitle } from '/utils/getHooks'
const data = getHookDataByTitle('useErrorBoundary')

const ThrowError = () => {
    throw new Error('an error!!')
}




const DemoComponent = (props:any) => {
    const [shouldThrow, setShouldThrow] = useState(false)

    const fallback = ({error, resetErrorBoundary}) => {
        return (
            <div style={{color: 'white', background: '#F004', padding: '1rem', display: 'flex', flexDirection: 'column'}}>
                <h3>Fallback Component</h3>
                <p>Name: {error.name}</p>
                <p>Message: {error.message}</p>
                <p>Stack Length: {error.stack.length}</p>
                <button  style={{marginTop: '1rem'}} onClick={resetErrorBoundary}>Try again</button>
            </div>
        )
    } 

    const handleError = (error: Error, info: React.ErrorInfo) => {
        console.log('handleError:', { error, info })
    }

    const handleReset = () => {
        setShouldThrow(false)
    }
 
    const ErrorBoundary = useErrorBoundary({
        fallback,
        handleError,
        handleReset
    }) 

    const demoCode = 
`const fallback = ({error, resetErrorBoundary}) => {
    return (
        <div style={{background: '#F004'}}>
            <h3>Fallback Component</h3>
            <p>Name: {error.name}</p>
            <p>Message: {error.message}</p>
            <p>Stack Length: {error.stack.length}</p>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    )
}

const handleError = (error: Error, info: React.ErrorInfo) => {
    log('handleError:', { error, info })
}

const handleReset = () => {
    setShouldThrow(false)
}

const ErrorBoundary = useErrorBoundary({
    fallback,
    handleError,
    handleReset
})

<ErrorBoundary>
    <ComponentThatMayThrow />
</ErrorBoundary>
`


    return(
        <Layout {...data}>
            <ErrorBoundary>
                {shouldThrow && <ThrowError />}

                <div style={{paddingBottom: '1rem'}}>
                    <button onClick={() => setShouldThrow(true)}>Throw an Error</button>
                </div>

                <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>
            </ErrorBoundary>
        </Layout>
    )
}


export default DemoComponent