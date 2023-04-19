import { useEffect, useRef, useMemo } from "react";
import tinyId from "utils/tinyId";

 const debugMode = true
 
 
 export interface ILoggerConfig {
     active: boolean;
     origin: string;
     type?: 'info' | 'warn' | 'error'; // type should be callable with each log
    }
    
    // console.log('='.repeat(100));
    
/**
 * + ORIGINAL VERSION
 * @deprecated
 */
 const logger = (config:ILoggerConfig) => {
     if(debugMode && config.active){
         switch(config.type) {
             case 'info': return Function.prototype.bind.call(console.info, console, `${config.origin} |`);
             case 'warn': return Function.prototype.bind.call(console.warn, console, `${config.origin} |`);
             case 'error': return Function.prototype.bind.call(console.error, console, `${config.origin} |`);
             default: return Function.prototype.bind.call(console.log, console, `${config.origin} |`);
         }
     }else{
         return () => {}
     }
 }
 
//  export default logger

interface I_UseLogger {
    active?: boolean;
    origin?: string;
}

// the `document.URL` is the current page that this component is rendered in

const useLogger = (config: I_UseLogger = {}) => {
    const initRef = useRef(false)

    const settings = useMemo(()=> ({
        active: config.active       ?? true,
        origin: config.origin       ?? tinyId(4)
    }), [config])

    const LOG = (...values) => {
        (settings.active && Function.prototype.bind.call(console.log, console, `${settings.origin} |`, ...values))()
    }

    useEffect(()=>{
        if(!initRef.current){
            initRef.current = true
            LOG('INIT | active:', settings.active)
        }
    },[])
}

export default useLogger