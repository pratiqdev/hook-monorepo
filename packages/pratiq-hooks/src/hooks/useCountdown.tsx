import React, { useState, useEffect, useRef, useMemo } from "react";
import extend from '../utils/logger'
const log = extend('local_useCountdown')



export interface I_UseCountdownConfig {
  duration: number;
  interval?: number;
  callbacks?: { [key: string]: Function };
}

export interface I_UseCountdownSettings {
  duration: number;
  interval: number;
  callbacks: { [key: string]: Function };
}


export interface I_CountdownTimeObject {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  realSeconds: number;
  milliseconds: number;
  total: number;
}

export interface I_UseCountdownReturn {
  time: I_CountdownTimeObject;
  status: T_UseCountdownStatus;
  start: Function;
  stop: Function;
  reset: Function;
  done: boolean;
  started: boolean;
  running: boolean;
  interval: number;
  duration: number;
};

export type T_UseCountdownStatus = 
'ready' // the timer has NOT started yet
| 'run' // the timer is running (!done, started)
| 'idle' // the timer is stopped (!done, started, !running)
| 'done' // the timer is done (done, started, !running)


/**
 * [@pratiq/hooks - useCountdown](https://hooks.pratiq.dev/docs/hooks/useCountdown)
 * 
 * Countdown timer with controls and optional callbacks.
 * 
 * @param duration {number} - Duration of the countdown in milliseconds
 * @param interval {number} - Time in milliseconds between each timer refresh
 * @param callbacks {object} - An object containing callback functions
 *  
 * ---
 *  
 * @returns 
 * 
 * | keys | type | description |
 * |---|---|---|
 * | time |  `Object` | An object containing the current time in different intervals
 * | time.total | `number` | The total number of milliseconds
 * | time.days | `number` |  The remainder of days
 * | time.hours | `number` |  The remainder of hours after the overflow of days
 * | time.minutes | `number` | The remainder of minutes after the overflow of hours
 * | time.seconds | `number` |  The remainder of seconds after the overflow of minutes
 * | time.milliseconds | `number` | The remainder of milliseconds after the overflow of seconds
 * | time.realSeconds | `number` | The intuitive count of seconds remaining
 * | done | `boolean` | True if the timer is finished (time.total === 0)
 * | running | `boolean` | True if the timer is currently running
 * | started | `boolean` | True if the timer has been started
 * | start | `()=>void` | Start or resume the timer
 * | stop | `()=>void` | Stop or pause the timer
 * | reset | `()=>void` | Stops the timer and resets to the initial time
 * | interval | `number` | The interval, in ms, used to refresh the timer
 * | duration | `number` | The duration, in ms, that the timer will run
 * 
 * 
 * ---
 * 
 * @interface
 * ```
 * useCountdown(config: I_UseCountdownConfig): I_UseCountdownReturn
 * 
 * export interface I_UseCountdownConfig {   //  example
 *   duration?: number;                        //  10_000
 *   interval?: number;                        //  100
 *   callbacks?: { [key: string]: Function };  //  { 5000: () => fn() }
 * }
 * 
 * export interface I_CountdownTimeObject {
 *   days: number;
 *   hours: number;
 *   minutes: number;
 *   seconds: number;
 *   realSeconds: number;
 *   milliseconds: number;
 *   total: number;
 * }
 * 
 * export interface I_UseCountdownReturn{
 *   time: <I_CountdownTimeObject>;
 *   start: Function;
 *   stop: Function;
 *   reset: Function;
 *   done: boolean;
 *   started: boolean;
 *   running: boolean;
 *   interval: number;
 *   duration: number;
 * };
 * ```
 * 
 * ---
 * 
 * 
 * @example
 * const timer = useCountdown({
 *     duration: 10_000,           
 *     interval: 10,              
 *     callbacks: {                     
 *         'start':() => console.log('started'),
 *         'end':  () => console.log('over'),  
 *         7000:   () => console.log('7000ms'),
 *         3000:   () => console.log('3000ms'),
 *     },
 * })
 */



const useCountdown = (config: I_UseCountdownConfig = { duration: 10_000 }): I_UseCountdownReturn => {
  
  /** 
   *  1. Parse the config object and assign values to a settings object.  
   *  2. Ensure values within ranges and of the correct type.  
   *  3. Memoize the settings object and update if/when the config changes.  
   * 
   * @interface I_UseCountdownConfig
   * @deps config
   */
  const settings: I_UseCountdownSettings = useMemo(() => {
    let interval:number = 100;
    if (config.interval) {
      if (config.interval > 1000) interval = 1000;
      else if (config.interval < 1) interval = 1;
      else interval = config.interval;
    }
    return {
      duration: config.duration ?? 10000,
      callbacks: config.callbacks ?? {},
      interval
    };
  }, [config]);

  const createTimeObj = (t:number) => {
    let ss = Math.floor(t / 1000);

    return{
      days: Math.floor(ss / 3600 / 24) % 24,
      hours: Math.floor(ss / 3600) % 24,
      minutes: Math.floor(ss / 60) % 60,
      seconds: ss % 60,
      realSeconds: Math.ceil(t / 1000),
      milliseconds: t % 1000,
      total: t
    } 
  }


  /** The structured time object to return */
  const [timeObj, setTimeObj] = useState<any>(() => createTimeObj(settings.duration))

  /** True if the timer is currently running */
  const [ticking, setTicking] = useState<boolean>(false);
  
  /** Current state of the timer, returned */
  const [time, setTime] = useState<number>(settings.duration);
  
  /** Timestamp of the initial start */
  const [initialStartTime, setInitialStartTime] = useState<number>(0);
  
  /** Most recent stop timestamp, used to subtract from running time */
  const [stopTime, setStopTime] = useState<number>(0);
  
  /** The cumulative time of all pauses, subtracted from running time */
  const [totalStopTime, setTotalStopTime] = useState<number>(0);
  
  /** Has the timer finished its countdown */
  const [done, setDone] = useState<boolean>(false);
  
  /** Has the timer been started */
  const [started, setStarted] = useState<boolean>(false);
  
  /** Callback object */
  const [cbs, setCbs] = useState<any>({});
  
  /** Ref to clear the timeout */
  const tRef = useRef<any>(null);

  const [stopFireTime, setStopFireTime] = useState<number>(0);

  const [status, setStatus] = useState<T_UseCountdownStatus>('ready')

  
  /** 
   * Handle time diffs and modifying time state.
   * 
   * Recursively set the time after settings.interval if ticking is true.
   * If the time is less than the difference of now and initial time set the
   * time to zero, clear the timeout and set ticking to false
  */
  const handleCountdown = () => {
    // if (!ticking) return;
    tRef.current = setTimeout(() => {
    // First find the actual time elapsed while timer was ticking by subtract
    //    initalStartTime from now and subtract the totalStopTime to account
    //    for pausing.
    // Subtract this value from settings.duration to find the current state
    //    of the timer
    const diffTime =
        settings.duration - (Date.now() - initialStartTime - totalStopTime);
    // If diffTime is greater than or equal to 0, setTime to diffTime and if
    //    ticking is still true, call this function again.
    if (diffTime >= 0) {
      let s = Math.floor(diffTime / 1000);
      
      

      setTimeObj(() => createTimeObj(diffTime));
      setTime(diffTime);
      if (ticking) handleCountdown();
    } else {
      // If the diffTime is less than 0, set ticking to false, clear the
      //    timeout and set time to 0

      setTimeObj({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        realSeconds: 0,
        milliseconds: 0,
        total: 0
      });

      clearTimeout(tRef.current);
      setDone(true);
      setTime(0);
      setTicking(false);
      if ("end" in cbs && cbs["end"].ran === false) {
        cbs["end"].func();
        cbs["end"].ran = true;
      }
    }
    }, settings.interval);
  };



  /** Call handleCountdown anytime ticking changes and ticking is true */
  useEffect(() => {
      if (ticking) handleCountdown();
  }, [ticking]);




  /** Accumulate callbacks */
  useEffect(() => {
    if (
      Object.entries(cbs).length === 0 &&
      config.callbacks &&
      Object.entries(config.callbacks).length > 0
    ) {
    // log("found callbacks:", config.callbacks);
    const newCbs: any = {};
    settings.callbacks && Object.entries(settings.callbacks).forEach((cb: any) => {
        newCbs[cb[0]] = {
        ran: false,
        func: cb[1]
        };
    });
    // log("accumulated callbacks:", cbs);
    setCbs(newCbs);
    }
  }, [settings.callbacks, cbs]);


    /** Handle callbacks */
  useEffect(() => {
      if (time === settings.duration) return;

      // log("time...");
      for (const [key] of Object.entries(cbs)) {
      if (time <= parseInt(key) && cbs[key].ran === false) {
          cbs[key].func();
          cbs[key].ran = true;
          // log("a cb ran:", cbs[key]);
      }
      }
  }, [time, cbs]);

  useEffect(()=>{
    setStatus(() => {
      if(done) return 'done' 
      else if (ticking) return 'run' // !done && !ticking
      else if (started) return 'idle'
      return 'ready'
    })
  },[done, started, ticking, time])


  /** Start the countdown */
  const start = () => {
      if (!ticking && !done) setTicking(true);
      if (!started && !done) setStarted(true);
      if (!initialStartTime) setInitialStartTime(Date.now());
      if ("start" in cbs && cbs["start"].ran === false) {
        cbs["start"].func();
        cbs["start"].ran = true;
      }
      if (stopTime) {
        setTotalStopTime((t: number) => t + (Date.now() - stopTime));
        setStopTime(0);
      }
    };

  /** Pause the countdown */
  const stop = () => {
    setStopFireTime(
      settings.duration - (Date.now() - initialStartTime - totalStopTime)
    );
    setTicking(false);
    clearTimeout(tRef.current);
    if (!stopTime) setStopTime(Date.now());
    };

  /** Reset all state to initial values */
  const reset = () => {
    setTimeObj(() => createTimeObj(settings.duration));
    setTicking(false);
    setInitialStartTime(0);
    setTime(settings.duration);
    clearTimeout(tRef.current);
    setStarted(false);
    setDone(false);
    setStopTime(0);
    setTotalStopTime(0);
    for (const [key] of Object.entries(cbs)) {
      cbs[key].ran = false;
    }
  };

  return {
    time: timeObj,
    start,
    stop,
    reset,
    done,
    started,
    running: ticking,
    status,
    // stopFireTime,
    // cbs,
    interval: settings.interval,
    duration: settings.duration
  };
};

export default useCountdown;




/*
 * 
 * @example
 * const { 
 *  time,                           // current state of the countdown timer
 *  done,                           // is the countdown done
 *  running,                        // is the timer running
 *  started,                        // has the timer started
 *  start,                          // start the countdown
 *  stop,                           // stop (pause) the countdown
 *  reset,                          // reset state to initial values
 * } = useCountdown({
 *  duration: 10_000,               // total duration of the countdown
 *  interval: 10,                   // time (ms) between time refresh
 *  callbacks: {                    // object containing callback functions
 *    'start':() => log('started')  // invoked when timer started
 *    'end':  () => log('over')     // invoked when timer reaches 0
 *    7000:   () => log('7000ms')   // invoked at 7000ms (time state)
 *    3000:   () => log('3000ms')   // invoked at 3000ms (time state)
 *  },
 * })

*/