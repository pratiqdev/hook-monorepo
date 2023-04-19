import {useState, useRef, useMemo, useEffect, useCallback} from 'react'

/**
 * usePerformance()
 * ---
 * 
 * Save array in state and use common methods to update the array state
 * 
 * @param {array} initialValue
 * @returns array, array functions
 * 
 * @example
 * 
 */

export interface I_PerfData {
    timeStamp: number;
    delta: number;
}

export interface I_PerfConfig {
    roll?: number;
    capacity?: number;
    float?: boolean;
    floatLength?: number;
}



const usePerformance = (config: I_PerfConfig) => {
    const [trigger, setTrigger] = useState(false)
    const totalTicks = useRef(0)
    const data = useRef<any>([])
    const last = useRef(0)
    const average = useRef(0)
    const rollingAverage = useRef(0)
    const totalTime = useRef(0)
    const rollingTotalTime = useRef(0)
    const min = useRef(0)
    const max = useRef(0)
    const ticksPerSecond = useRef(0)


    const tNow = useRef(0)
    const tpsTimeoutRef = useRef<any>(0)

    let delta = useRef(0)


    const settings = useMemo(() => { return {
        roll: config?.roll                  ?? 100,
        capacity: config?.capacity          ?? 10000,
        float: config?.float                ?? true,
        floatLength: config?.floatLength    ?? 4,
    }}, [config])


    var getNow = (function() {
        var performance:any = window.performance || {};
          
        performance.now = (function() {
          return performance.now    ||
          performance.webkitNow     ||
          performance.msNow         ||
          performance.oNow          ||
          performance.mozNow        ||
          function() { return new Date().getTime(); };
        })();
                
        return performance.now();         
      });
      

    function toFixedNumber(num: number, digits: number, base: number = 10){
        var pow = Math.pow(base, digits);
        return Math.round(num*pow) / pow;
      }


    const findTicksPerSecond = useCallback(() => {
        let tps = data.current.filter((p: any) => p.timeStamp >= tNow.current - 1000).map((p:any) => p.timeStamp).length
        ticksPerSecond.current = tps
        clearTimeout(tpsTimeoutRef.current)
        if(tps !== 0){
            tpsTimeoutRef.current = setTimeout(() => {
                tNow.current = getNow()
                findTicksPerSecond()
            }, 1000);
        }
    }, [data])



    const tick = useCallback(() => {
        tNow.current = getNow()
        // console.log('tNow:', tNow.current)
        if(!data || !data.current.length || data.current.length === 0){
            data.current.push({
                timeStamp: tNow.current,
                delta: 0,
            })
        }else{
            delta.current = tNow.current - data.current[data.current.length - 1].timeStamp
            data.current.push({
                timeStamp: tNow.current,
                delta: delta.current
            })
            if(data.current.length > settings.capacity){
                data.current.shift()
            }
            // console.log('delta:', delta.current)
            last.current = settings.float 
                ? toFixedNumber(delta.current, settings.floatLength)
                : toFixedNumber(delta.current, 0)
        }
        if(data && data.current.length && data.current.length > 1){
            let tot = data.current[data.current.length - 1].timeStamp - data.current[0].timeStamp
            totalTime.current = settings.float 
                ? toFixedNumber(tot, settings.floatLength)
                : toFixedNumber(tot, 0)

            /// total average of all ticks
            average.current = settings.float ? toFixedNumber((tot / data.current.length), settings.floatLength) : toFixedNumber((tot / data.current.length), 0)
            
            /// rolling total using number of ticks (10 by default)    
            if(settings.roll > 0){
                let rollTot = data.current[data.current.length - 1].timeStamp - data.current[data.current.length > settings.roll ? data.current.length - settings.roll : 0].timeStamp  
                rollingTotalTime.current = settings.float 
                    ? toFixedNumber(rollTot, settings.floatLength)
                    : toFixedNumber(rollTot, 0)

                rollingAverage.current = settings.float 
                ? toFixedNumber(rollTot / (data.current.length > settings.roll ? settings.roll : data.current.length), settings.floatLength)
                : toFixedNumber(rollTot / (data.current.length > settings.roll ? settings.roll : data.current.length), 0)
            }      

            /// min/max of all ticks (if delta is not 0)
            let deltaArray = data.current.filter((p: any) => p.delta !== 0).map((p:any) => p.delta)
            min.current = settings.float 
                ? toFixedNumber(Math.min(...deltaArray), settings.floatLength)
                : toFixedNumber(Math.min(...deltaArray), 0)

            max.current = settings.float 
                ? toFixedNumber(Math.max(...deltaArray), settings.floatLength)
                : toFixedNumber(Math.max(...deltaArray), 0)

            /// ticks per second - filter for deltas that are within last second of timestamps?
            findTicksPerSecond()
            

        }
    }, [settings.roll, settings.float, findTicksPerSecond, settings.capacity, settings.floatLength])




    useEffect(()=>{
        totalTicks.current ++
        tick()
    }, [trigger, tick])


    return {
        tick: () => setTrigger(!trigger),
        totalTicks: totalTicks.current,
        data: data.current,
        tps: ticksPerSecond.current,
        average: average.current,
        rollingAverage: rollingAverage.current,
        totalTime: totalTime.current,
        rollingTotalTime: rollingTotalTime.current,
        min: min.current,
        max: max.current,
        last: last.current
    }
}


export default usePerformance