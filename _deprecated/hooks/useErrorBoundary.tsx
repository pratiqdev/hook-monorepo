import React, { useState, useEffect, useRef, useMemo } from 'react'

/** functional-error-boundaries */
// TODO: create a standard component that has the same features

type ErrorHandler = (error: Error, info: React.ErrorInfo) => void
type ErrorHandlingComponent<Props> = (props: Props, error?: Error) => React.ReactNode
type ErrorState = { error?: Error }

function Catch<Props extends {}>(
  component: ErrorHandlingComponent<Props>,
  errorHandler?: ErrorHandler
): React.ComponentType<Props> {

  return class extends React.Component<Props, ErrorState> {
    state: ErrorState = {
      error: undefined
    }
    
    static getDerivedStateFromError(error: Error) {
      return { error }
    }
    
    componentDidCatch(error: Error, info: React.ErrorInfo) {
      console.log('componentDidCatch: error:', error)
      if (errorHandler) {
        errorHandler(error, info)
      }
    }
    
    render() {
      return component(this.props, this.state.error)
    }
  }
}






type T_UseErrorBoundaryConfig = {
    children?: React.ReactNode;
    fallback?: React.JSXElementConstructor<any>;
    handleError?: ErrorHandler;
    handleReset?: Function;
}

type T_UseErrorBoundary = (config?: T_UseErrorBoundaryConfig) => React.JSXElementConstructor<any>


const DefaultErrorComponent = (props: any) => (
    <div className="error-screen" style={{color: '#000 !important', background: '#f888', padding: '1rem'}}>
        <p style={{color: '#000', fontWeight: 'bold'}}>Error boundary caught an error:</p>
        <pre style={{fontSize: '.8rem', padding: '.2rem  .4rem'}}>{props?.error?.message ?? props?.error ?? 'No error message'}</pre>
        {props?.resetErrorBoundary && <button onClick={() => props.resetErrorBoundary()}>Reset</button>}
    </div>
)

const useErrorBoundary: T_UseErrorBoundary = (config: T_UseErrorBoundaryConfig = {}) => {
    const errStateRef = useRef(0)
    const errContentRef = useRef<any>(null)

    const child = useMemo(() => config.children, [config.children])

    const handleReset = () => {
        if(config.handleReset){
            config.handleReset()
        }
    }

    useEffect(()=>{
      console.log('errorBoundary state change...')
    })


      
    return Catch((props: T_UseErrorBoundaryConfig, error?: Error) => {
        if (error) {
            errContentRef.current = error

            if(config.fallback){
                errStateRef.current = 1
                return <config.fallback 
                          error={error} 
                          resetErrorBoundary={handleReset}
                        />
            }else{
                errStateRef.current = 2
                return <DefaultErrorComponent 
                          error={error} 
                          resetErrorBoundary={handleReset}
                        />
            }
        
        } 
        
        else {
            errStateRef.current = 0
            return <React.Fragment>{props.children}</React.Fragment>
        }
    }, config.handleError)


}

export default useErrorBoundary