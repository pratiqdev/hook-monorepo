import {useState, useEffect} from 'react'
    
/**
* useValidCss()
* ---
* 
* useState that returns if CSS prop/value is valid
* 
* @param {string} cssProp - the prop used to validate the value
* @param {string} cssString - the prop used to validate the value
* @returns A stateful value and true if valid

* @example
* 
*/

const useTilt = () => {
    const [orientation, setOrientation] = useState<any>(false)
    const [motion, setMotion] = useState<any>(false)

    const parseEvent = (e: any, asString = true) => {
        const obj: any = {};
        for (let k in e) {
            obj[k] = e[k];
        }
        if(asString){
            return JSON.stringify(obj, (k, v) => {
                if (v instanceof Node) return 'Node';
                if (v instanceof Window) return 'Window';
                return v;
            }, ' ');
        }else{
            return obj
        }
    }

    const handleMotion = (e: any) => {
        // console.log(e)
        setMotion(parseEvent(e))
    }
    const handleOrientation = (e: any) => {
        // console.log(e)
        setOrientation(parseEvent(e))
    }

    useEffect(() => {
        window.addEventListener("devicemotion", handleMotion, true) 
        window.addEventListener("deviceorientation", handleOrientation, true) 

        return () => {
            window.removeEventListener("devicemotion", handleMotion, true) 
            window.removeEventListener("deviceorientation", handleOrientation, true) 
        }
    })

    return { orientation, motion }
}

export default useTilt