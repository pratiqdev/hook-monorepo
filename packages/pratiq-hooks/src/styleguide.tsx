import { useState, useEffect } from 'react'



/*
- link to docs
- description
- config params
- return value table
- interfaces in code block
- example

*/





/**
 * [@pratiq/hooks - useCountdown](https://hooks.pratiq.dev/docs/hooks/useCountdown)
 * 
 * Countdown timer with controls and optional callbacks.
 * 
 * @param duration {number} - Duration of the countdown in milliseconds
 * @param interval {number} - Time in milliseconds between each timer refresh
 * @param callbacks {object}- An object containing callback functions
 *  
 * ---
 *  
 * @returns 
 * 
 * | keys | type | description |
 * |:--|:--|:--|
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

const hoverMe = () => {}