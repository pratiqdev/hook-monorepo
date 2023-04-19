import React, {useState, useEffect} from 'react'
import Nothingness from './Nothingness'
import useErrorBoundary from '/src/hooks/useErrorBoundary'

type T_DemoLayoutProps = {
    title: string;
    description?: string;
    children?: React.ReactNode;
}
const ErrorFallback = () => <div><h3>There was an error with this demo.</h3></div>

const DemoLayout = (props:T_DemoLayoutProps) => {
    let [isBrowser, setIsBrowser] = useState(false)

    // const ErrorBoundary = useErrorBoundary({
    //     fallback: ErrorFallback
    // })

    useEffect(()=>{
        if(typeof window !== 'undefined'){
            setIsBrowser(true)
        }
    }, [])

    if(!isBrowser) return null;
    
    return(
        <Nothingness title={props.title} description={props.description}>
            {/* <ErrorBoundary> */}
                <div className='demo-layout'>
                    {props.children}
                </div>
            {/* </ErrorBoundary> */}
        </Nothingness>
    )
}


export default DemoLayout