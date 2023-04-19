import {useMemo, useRef, useState, useCallback, useEffect} from 'react'

/**
 * useCountdown()
 * ---
 * 
 * Run a timeout on component mount. Optionally clear or reset the timeout
 * 
 * @param {function} callback
 * @param {number} delay
 * 
 * @example
 * 
 * useTimeout(myFunction, 1000)
 * const {clear, reset} = useTimeout(myFunction, 1000)
 * 
 */

export interface I_CountdownConfig {
    duration?: number;
    interval?: number;
    format?: string;
    floats?: number;
    callbacks?: any[];
}

const useCountdown = (config: I_CountdownConfig = {}) => {

    const settings = useMemo(() => { return {
        interval: config.interval && config.interval <= 1000 ? config.interval : 100,
        duration: config.duration   ?? 10000,
        format: config.format       ?? 's',
        floats: config.floats       ?? 2,
        callbacks: config.callbacks ?? []
    }}, [config])


    const intervalRef = useRef<any>()
    // const timeRemaining = useRef(settings.duration)
    const [timeRemaining, setTimeRemaining] = useState(settings.duration)
    const [complete, setComplete] = useState(false)
    const [trigger, setTrigger] = useState(false)
    const [isRunning, setIsRunning] = useState(false)
    const [cbArray, setCbArray] = useState(settings.callbacks.map(x => {
        return {
            time: x.time,
            func: x.func,
            ran: false
        }
    }))





    const convertTimeRemaining = useCallback(() => {
        switch(settings.format){
            case 's':
            case 'second':
            case 'seconds': {
                return (timeRemaining / 1000).toFixed(settings.floats)
            }
            default: return timeRemaining
        }
    }, [settings.floats, settings.format, timeRemaining])

    const convertCbTime = useCallback((convertTime: number) => {
        switch(settings.format){
            case 's':
            case 'second':
            case 'seconds': {
                return (convertTime * 1000)
            }
            default: return convertTime
        }
    }, [settings.format])


    const handleCountdown = useCallback(() => {
        setTimeRemaining(t=>{
            // console.log(`handleCountdown time: ${t}`) 
            if(t <= settings.interval){
                clearTimeout(intervalRef.current)
                setComplete(true)
                return 0
            }else{
                clearTimeout(intervalRef.current)
                intervalRef.current = setTimeout(handleCountdown, settings.interval)
                return t - settings.interval
            }
        })
            
    }, [settings.interval])




    const startCountdown = useCallback(()=>{
        if(!intervalRef.current && timeRemaining >= settings.interval){
            intervalRef.current = setTimeout(handleCountdown, settings.interval)
            setIsRunning(true)
            setTrigger(!trigger)
        }
    }, [settings.interval, handleCountdown, trigger, timeRemaining])


    const stopCountdown = useCallback(()=>{
        intervalRef.current && clearTimeout(intervalRef.current)
        intervalRef.current = null
        setIsRunning(false)
    }, [])





    const resetCountdown = useCallback(() => {
        setComplete(false)
        setTimeRemaining(settings.duration)
        stopCountdown()
        setIsRunning(false)
    }, [settings.duration, stopCountdown])



    
    useEffect(() => {
        return () => stopCountdown()
    }, [settings.duration, stopCountdown])

    const markCallbackUsed = useCallback((index: number) => {
        let tempArray = cbArray
        tempArray[index].ran = true
        setCbArray(tempArray)
        console.log('marked as ran', [...tempArray])
    }, [cbArray])

    
    useEffect(() => {
        // console.log('cbArray', cbArray)
        cbArray.forEach((cb, i) => {
            // console.log(cb)
            if(convertCbTime(cb.time) >= timeRemaining - 1 && isRunning && cb.ran === false){
                console.log(`runnnig cbTime: ${cb.time} at time: ${timeRemaining - 1} - ran: ${cb.ran}`)
                cb.func()
                markCallbackUsed(i)
            }
        })
    }, [isRunning, cbArray, convertCbTime, markCallbackUsed, timeRemaining])
    

    return { 
        reset: resetCountdown, 
        start: startCountdown, 
        stop: stopCountdown, 
        time: convertTimeRemaining(),
        done: complete
    }
};

export default useCountdown