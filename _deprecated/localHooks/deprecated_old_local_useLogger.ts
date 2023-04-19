import * as React from 'react'

interface I_loggerConfig {
    debugLevel?: number;
    title?: string;
    windowOnly?: boolean;
    shortcutKey?: string;
}


const useLogger = (config: I_loggerConfig = {}) => {


 

    const settings = React.useMemo(()=>{
        const usableShortcutKeys = [
            'digit1',
            'digit2',
            'digit3',
            'digit4',
            'digit5',
            'digit6',
            'digit7',
            'digit8',
            'digit9',
            'digit0',
            'keypad1',
            'keypad2',
            'keypad3',
            'keypad4',
            'keypad5',
            'keypad6',
            'keypad7',
            'keypad8',
            'keypad9',
            'keypad0',
            'backquote',
            'bracketleft',
            'bracketright',
            'semicolon',
            `quote`,
            'comma',
            'period',
            'slash',
        ]

        return{
            title:          config.title        ?? 'useLogger',
            debugLevel:     config.debugLevel   ?? 2,
            windowOnly:     config.windowOnly   ?? false,
            shortcutKey:    config.shortcutKey  && usableShortcutKeys.includes(config.shortcutKey) ? config.shortcutKey.toLowerCase() : 'slash'
        }
    }, [config])

    const logMessage = React.useRef<any>([])
    const logHistory = React.useRef<any>([])
    const logLength = React.useRef<any>(0)
    const [hasError, setHasError] = React.useState(false)
    const [showLogger, setShowLogger] = React.useState(false)


    const style: any = {
        logBody:{
            textAlign: 'left',
            fontSize: '1rem',
            zIndex: '100000',
            fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            maxWidth: '100vw',
            height: '100vh',
            maxHeight: '100vh',
            background: '#444',
            color: '#fff',
            padding: '2vw',
            overflow: 'auto',
        },
        main: {
            maxWidth: '1000px',
            margin: '0 auto',
            paddingBottom: '10vh'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            fontSize: '1rem',
            marginBottom: '1rem'
        },
        title: {
            fontSize: '2rem',
        },
        closeButton: {
            width: '3rem',
            height: '3rem',
            border: '1px solid #fff',
            background: 'none',
            color: '#fff',
            borderRadius: '.5rem',
            fontSize: '1.5rem',
            cursor: 'pointer',
        },
        logHistory: {
            boxSizing: 'border-box',
            background: '#222',
            marginBottom: '1rem',
            marginTop: '.2rem',
            padding: '.5rem',
            paddingBottom:'.1rem',
            maxWidth: '96vw',
            fontFamily: 'monospace',
            fontSize: '1rem',
        },
        a: {
            color: '#fff',
        },
        logTitle: {
            margin: '10px auto'
        },
        logHeading: {
            fontWeight: 'bold',
        },
        logEntry: {
            fontSize: '.8rem'
        },
        time: {
            fontSize: '.6rem',
            color: '#fffa',
            fontWeight: 'bold',
            marginBottom: '.2rem'
        },

        log1:{
            background: '#242',
            marginBottom: '.5rem',
            padding: '.5rem',
            paddingTop: '2rem',
            wordBreak: 'break-all',
            whiteSpace: 'wrap',
            overflow: 'auto'
        },
        log2:{
            background: '#540',
            marginBottom: '.5rem',
            padding: '.5rem',
            wordBreak: 'break-all',
            whiteSpace: 'wrap',
            overflow: 'auto'
        },
        log3:{
            background: '#622',
            marginBottom: '.5rem',
            padding: '.5rem',
            wordBreak: 'break-all',
            whiteSpace: 'wrap',
            overflow: 'auto'
        },
        logWindowTitle:{
            fontSize: '1rem',
        },
        error:{
            wordBreak: 'break-all',
            whiteSpace: 'wrap',
        },
        collapseButton:{
            position: 'absolute',
            marginTop: '-1.5rem'
        }

    }


    const docs = (route:unknown) =>  `Visit <a href='https://animatour.io/docs/${route}'>docs/${route}</a> to see more about this error and how to fix it.`
    const consoleDocs = (route:unknown) =>  `Visit https://animatour.io/docs/${route} to see more about this error and how to fix it.`

    /** Create a section for each individual log group */
    const LogSection = ({data, level}:any) => {
        const [collapse, setCollapse] = React.useState(true)
        const [useCollapse, setUseCollapse] = React.useState(false)

        let sectionStyle: any;

        switch(level){
            case 2: sectionStyle = style.log2; break;
            case 3: sectionStyle = style.log3; break;
            default: sectionStyle = style.log1; break;
        } 

        const checkOverflow = (el: any) => {
            var curOverflow = el.style.overflow;
            if ( !curOverflow || curOverflow === "visible" )
                el.style.overflow = "hidden";
            var isOverflowing = el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;
            el.style.overflow = curOverflow;
            setUseCollapse(isOverflowing)
        }








        return(
            <div ref={(el) => {el !== null && checkOverflow(el)}} style={{
                ...sectionStyle,  
                maxHeight: collapse ? '20vh' : '100vh',
                paddingTop: useCollapse ? '2rem' : '0',
                }}>
                {useCollapse && 
                    <button style={style.collapseButton} onClick={()=>setCollapse(x => !x)}>
                        {collapse ? 'EXPAND LOG' : 'COLLAPSE LOG'}
                    </button>
                }
               
               
                {data.map((x:any, i:number)=>{
                    if(typeof x.value === 'object'){
                        let v = JSON.stringify(x.value, null, 2)
                        switch(x.type){
                            case 'h': return <pre key={i} style={{...style.logHeading}} dangerouslySetInnerHTML={{__html:v}} />
                            case 'p': return <pre key={i} dangerouslySetInnerHTML={{__html:v}} />
                            case 'c': return <pre key={i} dangerouslySetInnerHTML={{__html:v}} />
                            case 'e': return <pre key={i} dangerouslySetInnerHTML={{__html:v}} />
                            case 't': return <p key={i} style={style.time} dangerouslySetInnerHTML={{__html:v}} />
                            case 'hr': return <hr key={i} style={style.hr}/>
                            default: return <pre key={i} dangerouslySetInnerHTML={{__html:v}} />
                        }
                    }else{
                        switch(x.type){
                            case 'h': return <div key={i} style={{...style.logHeading}} dangerouslySetInnerHTML={{__html:x.value}} />
                            case 'p': return <div key={i} dangerouslySetInnerHTML={{__html:x.value}} />
                            case 'c': return <pre key={i} dangerouslySetInnerHTML={{__html:x.value}} />
                            case 'e': return <pre key={i} dangerouslySetInnerHTML={{__html:x.value}} />
                            case 't': return <p key={i} style={style.time} dangerouslySetInnerHTML={{__html:x.value}} />
                            case 'hr': return <hr key={i} style={style.hr}/>
                            default: return <p key={i} dangerouslySetInnerHTML={{__html:x.value}} />
                        }
                    }
                })}
            </div>
        )
    }
    
    /** Returned function to add content to the logs */
    const log = React.useCallback((level: number, x:any) => {
        if(level >= settings.debugLevel && hasError === false){ setHasError(true); setShowLogger(true) }
        
        logLength.current++
        logMessage.current = []

        let logGroup: any[] = []

        let style: string;

        switch(level){
            case 2: style = 'color: yellow; font-weight: bold;'; break;
            case 3: style = 'color: #f44; font-weight: bold;'; break;
            default: style = 'color: lightgreen; font-weight: bold;'; break;
        }

        let d = new Date()
        
        logGroup.push({type:'t', level: level, value: `${d.getHours()}:${d.getMinutes()}.${d.getSeconds()}`})
        x.stack && logGroup.push({type:'e', value: x.stack})


        const logObject = (obj: any) => {
             !settings.windowOnly && console.log('%c...............................', style)

            for (const [k, v] of Object.entries(obj)) { 
                if(k === 'logTitle'){
                    logGroup.push({type:'h', value: v})
                    !settings.windowOnly && console.log(`%c- ${v}`, style) 
                }else if(k.includes('!')){
                    logGroup.push({type:'p', level: level, value: v})
                    !settings.windowOnly && console.log(`%c-`, style, v) 
                }else if(k === 'doc'){
                    logGroup.push({type:'p', level: level, value: docs(v)})
                    !settings.windowOnly && console.log(`%c-`, style, consoleDocs(v)) 
                }else{
                    logGroup.push({type:'p', level: level, value: v})
                    !settings.windowOnly && console.log('%c-', style, `${k}:`, v) 
                }
            }
            
            !settings.windowOnly && console.log('%c...............................', style)
        }


        if(x && typeof x === 'object'){
            logObject(x)
        }else{
            logGroup.push({type:'p', level: level, value: x})
            !settings.windowOnly && console.log('%c'+x, style)
        }

        logHistory.current.push(logGroup)
        logMessage.current.push(logGroup)

    }, [hasError, settings.debugLevel, settings.windowOnly])


    /** return a window to contain the logs and messages */
    const LogWindow = () => {
        if(showLogger){
            document.body.style.overflow = 'hidden'

            return (
            <div style={style.logBody}>
                <div style={style.main}>

                    <div style={style.header}>
                        <div style={style.title}>
                            {settings.title}
                        </div>
                        <button style={style.closeButton} onClick={()=>setShowLogger(false)}>X</button>
                    </div>

                    <p style={style.logWindowTitle}>Log</p>
                    <div style={style.logHistory}>
                        {logMessage.current.map((x:any, i:number)=><LogSection key={i} data={x} level={x[0].level}/>)}
                    </div>


                    {logLength.current > 1 && (
                        <>
                            <p style={style.logWindowTitle}>History</p>
                            <div style={style.logHistory}>
                                {logHistory.current.map((x:any, i:number)=><LogSection key={i} data={x} level={x[0].level}/>)}
                            </div>
                        </>
                    )}


                </div>
            </div>
        )
        }else{
            return null
        }
    }

    /** Event listener for shortcut to display the logger */
    const detectKbd = React.useCallback((e:any) => {

        if(e.ctrlKey && settings.shortcutKey === e.code.toLowerCase() ){
            console.log(`Toggled debug window with 'ctrl + ${settings.shortcutKey}'`)
            setShowLogger(x => !x)
        }
    }, [settings.shortcutKey])

    React.useEffect(()=>{
        if(process.env.NODE_ENV === 'development'){
            log(1, {
                logTitle: 'Using Logger', 
                window: settings.windowOnly ? 'logging to window only' : 'logging to window and console', 
                shortcut: `shortcut: 'ctrl + ${settings.shortcutKey}''`,
                minLevel: `logging at minimum level: ${settings.debugLevel}`
            })
            window.addEventListener('keydown', detectKbd)
        }
        return () => window.removeEventListener('keydown', detectKbd)
    }, [detectKbd, settings.debugLevel, settings.shortcutKey, settings.windowOnly, log])

    const resetLog = () => {
        logLength.current = 0
        logHistory.current = []
        logMessage.current = []
    }


    if(process.env.NODE_ENV !== 'development'){
        window.removeEventListener('keydown', detectKbd)
        return {log: ()=>{}, LogWindow: () => <></>, resetLog: ()=>{} }
    }
    
    return {log, LogWindow, resetLog}
}

export default useLogger
