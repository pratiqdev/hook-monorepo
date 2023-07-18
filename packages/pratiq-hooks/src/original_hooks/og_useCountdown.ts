import React, { useState, useEffect, useRef } from "react";
import extend from '../utils/logger.js'
const log = extend('')



export interface interfaceCountdownConfig {
  duration: number;
  interval?: number;
  callbacks?: { [key: string]: Function };
}

export interface interfaceCountdownSettings {
  interval: number;
  duration: number;
  callbacks: { [key: string]: Function };
}






// const logActive = true;
// const log = (...val: any) => {
//   if (logActive) {
//     console.log(...val);
//   }
// };
















/**
 * useCountdown
 * 
 * Countdown timer with optional callbacks.
 * 
 * @interface interfaceCountdownConfig
 * 
 * @param duration {number} - Duration of the countdown in milliseconds
 * @param interval {number} - Time in milliseconds between each timer refresh
 * @param callbacks {object} - An object containing callback functions
 * 
 * @returns object containing state and functions
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
 * 
 */
const useCountdown = (config: interfaceCountdownConfig) => {
  
  /** 
   *  1. Parse the config object and assign values to a settings object.  
   *  2. Ensure values within ranges and of the correct type.  
   *  3. Memoize the settings object and update if/when the config changes.  
   * 
   * @interface interfaceCountdownSettings
   * @deps config
   */
  const settings: interfaceCountdownSettings = React.useMemo(() => {
    let interval = 100;
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

  const createTimeObj = (t) => {
    let ss = Math.floor(t / 1000);

    return{
      days: Math.floor(ss / 3600 / 24) % 24,
      hours: Math.floor(ss / 3600) % 24,
      minutes: Math.floor(ss / 60) % 60,
      seconds: ss % 60,
      realSeconds: Math.ceil(ss / 1000),
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

  const [stopFireTime, setStopFireTime] = useState(0);

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
    // console.log("found callbacks:", config.callbacks);
    const newCbs: any = {};
    Object.entries(settings.callbacks).forEach((cb: any) => {
        newCbs[cb[0]] = {
        ran: false,
        func: cb[1]
        };
    });
    // console.log("accumulated callbacks:", cbs);
    setCbs(newCbs);
    }
  }, [settings.callbacks, cbs]);


    /** Handle callbacks */
  useEffect(() => {
      if (time === settings.duration) return;

      // console.log("time...");
      for (const [key] of Object.entries(cbs)) {
      if (time <= parseInt(key) && cbs[key].ran === false) {
          cbs[key].func();
          cbs[key].ran = true;
          // console.log("a cb ran:", cbs[key]);
      }
      }
  }, [time, cbs]);


  /** Start the countdown */
  const start = () => {
      if (!ticking) setTicking(true);
      if (!started) setStarted(true);
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
    // stopFireTime,
    // cbs,
    interval: settings.interval,
    duration: settings.duration
  };
};

export default useCountdown

/**
 * Changelog
 * 
 * Rebuilt original code to reduce use of useEffect and trigger updates fast
 * 
 * 
 */