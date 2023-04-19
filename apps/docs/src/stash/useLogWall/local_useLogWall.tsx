// import * as React from 'react'
// import isBrowser from '../utils/isBrowser'
// import extend from '../utils/logger'
// const log = extend('local_useLogWall')

// interface I_LogWallConfig {
//     debugLevel?: number;
//     title?: string;
//     windowOnly?: boolean;
//     shortcutKey?: string;
//     docUrl?: string;
// }


// const useLogWall = (config: I_LogWallConfig = {}) => {
//     if(!isBrowser()) return {log: ()=>{}, LogWindow: () => <></>, resetLog: ()=>{} };


 
//     //_____________________________________________________________________________ CREATE SETTINGS
//     const settings = React.useMemo(()=>{
//         const usableShortcutKeys = [
//             'digit1',
//             'digit2',
//             'digit3',
//             'digit4',
//             'digit5',
//             'digit6',
//             'digit7',
//             'digit8',
//             'digit9',
//             'digit0',
//             'keypad1',
//             'keypad2',
//             'keypad3',
//             'keypad4',
//             'keypad5',
//             'keypad6',
//             'keypad7',
//             'keypad8',
//             'keypad9',
//             'keypad0',
//             'backquote',
//             'bracketleft',
//             'bracketright',
//             'semicolon',
//             `quote`,
//             'comma',
//             'period',
//             'slash',
//         ]

//         return{
//             title:          config.title        ?? 'useLogWall',
//             debugLevel:     config.debugLevel   ?? 2,
//             windowOnly:     config.windowOnly   ?? false,
//             shortcutKey:    config.shortcutKey  && usableShortcutKeys.includes(config.shortcutKey) ? config.shortcutKey.toLowerCase() : 'slash',
//             docUrl:         config.docUrl       ?? 'no-doc-url-provided/',
//         }
//     }, [config])

//     const logMessage = React.useRef<any>([])
//     // const logHistory = React.useRef<any>([])
//     const [logHistory, setLogHistory] = React.useState<any[]>([])
//     const logLength = React.useRef<any>(0)
//     const [hasError, setHasError] = React.useState(false)
//     const [showLogger, setShowLogger] = React.useState(false)
//     const [trig, setTrig] = React.useState(false)

//     const trigger = () => setTrig(b => !b)


//     const style: any = {
//         logBody:{
//             textAlign: 'left',
//             fontSize: '1rem',
//             zIndex: '100000',
//             fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
//             position: 'fixed',
//             top: '0',
//             left: '0',
//             width: '100vw',
//             maxWidth: '100vw',
//             height: '100vh',
//             maxHeight: '100vh',
//             background: '#444',
//             color: '#fff',
//             padding: '2vw',
//             overflow: 'auto',
//         },
//         main: {
//             maxWidth: '1000px',
//             margin: '0 auto',
//             paddingBottom: '10vh'
//         },
//         header: {
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             width: '100%',
//             fontSize: '1rem',
//             marginBottom: '1rem'
//         },
//         title: {
//             fontSize: '2rem',
//         },
//         closeButton: {
//             width: '3rem',
//             height: '3rem',
//             border: '1px solid #fff',
//             background: 'none',
//             color: '#fff',
//             borderRadius: '.5rem',
//             fontSize: '1.5rem',
//             cursor: 'pointer',
//         },
//         logHistory: {
//             boxSizing: 'border-box',
//             background: '#222',
//             marginBottom: '1rem',
//             marginTop: '.2rem',
//             padding: '.5rem',
//             paddingBottom:'.1rem',
//             maxWidth: '96vw',
//             fontFamily: 'monospace',
//             fontSize: '1rem',
//             minHeight: '80px'
//         },
//         a: {
//             color: '#fff',
//         },
//         logTitle: {
//             margin: '10px auto'
//         },
//         logHeading: {
//             fontWeight: 'bold',
//         },
//         logEntry: {
//             fontSize: '.8rem'
//         },
//         time: {
//             fontSize: '.6rem',
//             color: '#fffa',
//             fontWeight: 'bold',
//             marginBottom: '.2rem'
//         },
//         log0:{
//             background: '#333',
//             marginBottom: '.5rem',
//             padding: '.5rem',
//             paddingTop: '2rem',
//             wordBreak: 'break-all',
//             whiteSpace: 'wrap',
//             overflow: 'auto'
//         },
//         log1:{
//             background: '#242',
//             marginBottom: '.5rem',
//             padding: '.5rem',
//             paddingTop: '2rem',
//             wordBreak: 'break-all',
//             whiteSpace: 'wrap',
//             overflow: 'auto'
//         },
//         log2:{
//             background: '#540',
//             marginBottom: '.5rem',
//             padding: '.5rem',
//             wordBreak: 'break-all',
//             whiteSpace: 'wrap',
//             overflow: 'auto'
//         },
//         log3:{
//             background: '#622',
//             marginBottom: '.5rem',
//             padding: '.5rem',
//             wordBreak: 'break-all',
//             whiteSpace: 'wrap',
//             overflow: 'auto'
//         },
//         logWindowTitle:{
//             fontSize: '1rem',
//         },
//         error:{
//             wordBreak: 'break-all',
//             whiteSpace: 'wrap',
//         },
//         collapseButton:{
//             position: 'absolute',
//             marginTop: '-1.5rem'
//         },
//         logPlaceholder:{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             minHeight: '80px',
//             color: 'grey'
//         },
//         stack: {
//             background: '#111',
//             fontSize: '.8rem',
//             padding: '.5rem',
//             borderRadius: '.25rem',
//             marginTop: '1rem'
//         }

//     }

//     const docs = (route:unknown) =>  `Visit <a href='${settings.docUrl}${route}'>${settings.docUrl}${route}</a> to see more about this error and how to fix it.`
//     const consoleDocs = (route:unknown) =>  `Visit ${settings.docUrl}${route} to see more about this error and how to fix it.`

















//     //____________________________________________________________________ ASSEMBLE WINDOW LOG ITEM
//     const LogSection = ({data, level}:any) => {
//         const [collapse, setCollapse] = React.useState(true)
//         const [useCollapse, setUseCollapse] = React.useState(false)

//         let sectionStyle: any;

//         switch(level){
//             case 1: sectionStyle = style.log1; break;
//             case 2: sectionStyle = style.log2; break;
//             case 3: sectionStyle = style.log3; break;
//             default: sectionStyle = style.log0; break;
//         } 

//         const checkOverflow = (el: any) => {
//             var curOverflow = el.style.overflow;
//             if ( !curOverflow || curOverflow === "visible" )
//                 el.style.overflow = "hidden";
//             var isOverflowing = el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;
//             el.style.overflow = curOverflow;
//             setUseCollapse(isOverflowing)
//         }








//         return(
//             <div ref={(el) => {el !== null && checkOverflow(el)}} style={{
//                 ...sectionStyle,  
//                 maxHeight: collapse ? '20vh' : '100vh',
//                 paddingTop: useCollapse ? '2rem' : '0',
//                 }}>


//                 {useCollapse && 
//                     <button style={style.collapseButton} onClick={()=>setCollapse(x => !x)}>
//                         {collapse ? 'EXPAND LOG' : 'COLLAPSE LOG'}
//                     </button>
//                 }
               
               
//                 {data.map((x:any, i:number)=>{
//                     let v: any = x.value
//                     if(typeof x.value === 'object'){
//                         v = JSON.stringify(x.value, null, 2)
//                     }
             
//                     switch(x.type){
//                         case 'h': return <div key={i} style={{...style.logHeading}} dangerouslySetInnerHTML={{__html:v}} />
//                         case 'p': return <div key={i} dangerouslySetInnerHTML={{__html:v}} />
//                         case 'c': return <pre key={i} dangerouslySetInnerHTML={{__html:v}} />
//                         case 'e': return <pre style={style.stack} key={i} dangerouslySetInnerHTML={{__html:v}} />
//                         case 't': return <p key={i} style={style.time} dangerouslySetInnerHTML={{__html:v}} />
//                         case 'hr': return <hr key={i} style={style.hr}/>
//                         default: return <p key={i} dangerouslySetInnerHTML={{__html:v}} />
//                     }

//                 })}
//             </div>
//         )
//     }







//     //
//     const _log = React.useCallback((level: number, x?:any) => {
//         //
//         if(!x) x = '-EMPTY-'
//         if(!level) level = 0

//         if(level >= settings.debugLevel && hasError === false){ setHasError(true); setShowLogger(true) }
        
//         logLength.current++
//         logMessage.current = []

//         let logGroup: any[] = []

//         // assign colors to the console log items
//         let style: string;
//         switch(level){
//             case 1: style = 'color: lightgreen; font-weight: bold;'; break;
//             case 2: style = 'color: yellow; font-weight: bold;'; break;
//             case 3: style = 'color: #f44; font-weight: bold;'; break;
//             default: style = 'font-weight: bold;'; break;
//         }

//         // add the date to the top of the items
//         let d = new Date()
//         logGroup.push({type:'t', level: level, value: `${d.getHours()}:${d.getMinutes()}.${d.getSeconds()}`})
        
        
//         /** handle parsing an object and log its items */
//         const logObject = (obj: any) => {
//              !settings.windowOnly && _log('...............................')

//             // add the title of the log object at the beginning
//             if('title' in obj){
//                 logGroup.push({type:'h', value: obj.title})
//                 !settings.windowOnly && _log(obj.title)
//             }

//             // loop thru the rest of the items
//             for (const [k, v] of Object.entries(obj)) { 
//                 if(k === 'title' || k === 'stack'){
//                     // ignore title and stack
//                 }else if(k.includes('!') || parseInt(k)){
//                     logGroup.push({type:'p', level: level, value: v})
//                     !settings.windowOnly && _log(v)
//                 }else if(k === 'doc'){
//                     logGroup.push({type:'p', level: level, value: docs(v)})
//                     !settings.windowOnly && _log(consoleDocs(v))
                    
//                 }else{
//                     logGroup.push({type:'p', level: level, value: k + ': ' + v})
//                     !settings.windowOnly && _log(`${k}:`, v)
//                 }
//             }
            
//             // add the stack trace at the bottom of the log
//             if('stack' in obj){
//                 logGroup.push({type:'e', value: obj.stack})
//                 !settings.windowOnly && _log(obj.stack)
//              }
            
//             !settings.windowOnly && _log('...............................')
//         }


//         if(typeof x === 'object'){
//             logObject(x)
//             // log(x)
//         }else{
//             logGroup.push({type:'p', level: level, value: x})
//             !settings.windowOnly && log(x)
//         }

//         // logHistory.current.push(logGroup)
//         let tempHist = [...logHistory]
//         tempHist.push(logGroup)
//         setLogHistory(tempHist)
//         logMessage.current.push(logGroup)

//     }, [hasError, settings.debugLevel, settings.windowOnly])


//     /** return a window to contain the logs and messages */
//     const LogWindow = () => {
//         const [reverse, setReverse] = React.useState(true)
//         if(showLogger){
//             document.body.style.overflow = 'hidden'

//             return (
//             <div style={style.logBody}>
//                 <div style={style.main}>

//                     <div style={style.header}>
//                         <div style={style.title}>
//                             {settings.title || 'Log Wall'}
//                         </div>
//                         <button style={style.closeButton} onClick={()=>setShowLogger(false)}>X</button>
//                     </div>

//                     <p style={style.logWindowTitle}>Most Recent Log</p>
//                     <div style={style.logHistory}>
//                         {
//                             logLength.current > 1 
//                                 ? logMessage.current.map((x:any, i:number)=><LogSection key={i} data={x} level={x[0].level}/>)
//                                 : <div style={style.logPlaceholder}><p>No Logs</p></div>
//                         }
//                     </div>


//                     <p style={style.logWindowTitle}>Log History</p>
//                     <button onClick={()=> {setReverse(b => !b); setLogHistory(lh => lh.reverse()) }}>{reverse ? '^' : 'v'}</button>
//                     <div style={style.logHistory}>
//                         {
//                             logLength.current > 1 
//                                 ? logHistory.map((x:any, i:number)=><LogSection key={i} data={x} level={x[0].level}/>)
//                                 : <div style={style.logPlaceholder}><p>No Logs</p></div>
//                         }
//                     </div>


//                 </div>
//             </div>
//         )
//         }else{
//             return null
//         }
//     }

//      /** Event listener for shortcut to display the logger */
//      const detectKbd = React.useCallback((e:any) => {
//         e.ctrlKey && settings.shortcutKey === e.code.toLowerCase() && setShowLogger(x => !x)
//     }, [settings.shortcutKey])

//     React.useEffect(()=>{
//         if(process.env.NODE_ENV !== 'production'){
//             window.addEventListener('keydown', detectKbd)
//         }
//         return () => window.removeEventListener('keydown', detectKbd)
//     }, [detectKbd, settings.debugLevel, settings.shortcutKey, settings.windowOnly, log])



//     // remove all logs and reset vars
//     const resetLog = () => {
//         logLength.current = 0
//         setLogHistory([])
//         logMessage.current = []
//     }


//     if(process.env.NODE_ENV === 'production'){
//         return {log: ()=>{}, LogWindow: () => <></>, resetLog: ()=>{} }
//     }else{
//         return {log, Window:LogWindow, resetLog}
//     }
    
// }

// export default useLogWall