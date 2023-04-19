import React, { useEffect, useState, useRef, useMemo, useCallback, useContext, createContext} from 'react'

//- notify
//- redirect
//- require click / permission
//- timed
//- promises

    // 'top-left',
    // 'top-center',
    // 'top-right',
    // 'bottom-left',
    // 'bottom-center',
    // 'bottom-right',

type T_BufferedToastProps = {
    children?: React.ReactNode
    template?: React.JSXElementConstructor<any>;
    position?: string;
}

type T_ToasterProps = {
    removeToastById: (id:string) => void;
    position?: string;
}

type T_CTX = {
    toasts?: T_ToastMap;
    createToast?: (config:any) => void;
    removeToastById?: (id:string) => void;
    dismissToastById?: (id:string) => void;
    position?: string;
}

type T_ToastMap = {
    [key:string]: T_Toast
}


type T_Toast = {
    _timestamp: number;
    [key:string]: unknown;
}


//__________________________________________________________________________________________________
let alpha = '0123456789abcdefABCDEF'
const microId = (length:number = 8, set:string = alpha) => {
    let id = ''
    while(id.length < length){
        id += set[Math.ceil(Math.random() * set.length - 1)]
    }
    return id
}

const bufferedToastContext = createContext<T_CTX>({})
const useBufferedToastContext = () => useContext(bufferedToastContext)







//__________________________________________________________________________________________________
//__________________________________________________________________________________________________
//__________________________________________________________________________________________________
const Toast = (props:any) => {
    const {dismissToastById, position} = useBufferedToastContext()
    console.log('TOAST:', props)
    const [id, data] = props

    const [style, setStyle] = useState({
        translate: '0vw',
        height: '3rem',
        marginBottom: '.5rem',
        padding: '.5rem'
    })

    const handleSelfRemoval = () => {
        console.log('handle self removal:', id)
        setStyle({
            translate: '-1vw',
            height: '20px',
            marginBottom: '5px',
            padding: '5px',
        })
        
        setTimeout(()=>{
            console.log('removing:', id)
            dismissToastById(id)
        }, 1000)
    }

    return (
        <p style={{
                padding: style.padding, 
                margin:0, 
                marginBottom: style.marginBottom, 
                transform: `translateX(${style.translate})`, 
                background: '#462', 
                width:'100%',
                transition:'1s',
                height: style.height,
                overflow:"hidden"
            }}>
            {`>> `+id}
            <button onClick={handleSelfRemoval}>
                X
            </button>
        </p>
    )
}









//__________________________________________________________________________________________________
//__________________________________________________________________________________________________
//__________________________________________________________________________________________________
const Toaster = () => {
    const {removeToastById, position, toasts} = useBufferedToastContext()

    const Map = Object.entries(toasts).map((toast:any) => <Toast {...toast} />)

    const baseToasterStyles:any = {
        position: 'fixed',
        border: '2px solid red',
        padding: '2px',
        display: 'flex',
        flexDirection:'column-reverse',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }

    if(position === 'bottom-right'){
        return (
            <div style={{
                ...baseToasterStyles,
                bottom: '0px',
                left:'50%',
                transform:'translateX(-50%)',
            }}>
                {Map}
            </div>
        )
    }else if(position === 'bottom-left'){
        return (
            <div style={{
                ...baseToasterStyles,
                bottom: '0px',
                left:'0px',
                maxWidth:'100vw'
            }}>
                {Map}
            </div>
        )
    }
    // bottom-center - default
    else{
        return (
            <div style={{
                ...baseToasterStyles,
                top: '',
                bottom: '0px',
                left:'50%',
                transform:'translateX(-50%)',
                right: '',
            }}>
                {Map}
            </div>
        )
    }

}










//__________________________________________________________________________________________________
//__________________________________________________________________________________________________
//__________________________________________________________________________________________________
const BufferedToast_ContextProviderAndStateManager = (props:T_BufferedToastProps) => {
    const [toasts, setToasts] = useState<T_ToastMap>({})

    const toastTemplate = (config:any) => {
        return (
            <div style={{background: 'green'}}>
                <p>{config.title}</p>
            </div>
        )
    }

    const createToast = (config:any) => {
        let toastData = {
            ...config,
            _timestamp: Date.now(),
        }
        let _id = microId(2)
        console.log('Creating toast:', toastData)
        // toasts[_id] = toastData
        let t = {...toasts}
        t[_id] = toastData
        setToasts(t)
    }

    const removeToastById = (id:string) => {
        // setToasts(t => t.filter(x => x._toast_id !== id))
        setToasts(t => {
            delete t[id]
            return t
        })
    }

    const dismissToastById = (id:string) => {
        let t = {...toasts}
        setToasts(t => {
            t[id].dismissed = true
            return t
        })

    }

    useEffect(()=>{
        console.log('toasts:', toasts)
    }, [toasts])

    const CTX = {
        toasts,
        createToast,
        removeToastById,
        dismissToastById,
        position: props.position
    }


    return (
        <bufferedToastContext.Provider value={CTX}>
            {props.children}
            <Toaster/>
            {JSON.stringify(toasts, null, 2)}
        </bufferedToastContext.Provider>
    )
}


const useBufferedToast = useBufferedToastContext

export { 
    useBufferedToast
}

export default BufferedToast_ContextProviderAndStateManager