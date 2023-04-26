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
 * @param
 * | type | keys | description |
 * |:--|:--|:--|
 * | `number` | **duration** | The duration of the countdown in milliseconds
 * | `number` | **interval** | The interval in milliseconds between each timer refresh
 * | `object` | **callbacks** | An object containing callback functions
 *  
 *  
 * @returns 
 * 
 * | type | keys | description |
 * |:--|:--|:--|
 * | `Object` | **time** | An object containing the current time in different intervals
 * | `number` | **time.total** | The total number of milliseconds
 * | `number` | **time.days** |   The remainder of days
 * | `number` | **time.hours** |  The remainder of hours after the overflow of days
 * | `number` | **time.minutes** | The remainder of minutes after the overflow of hours
 * | `number` | **time.seconds** |  The remainder of seconds after the overflow of minutes
 * | `number` | **time.milliseconds** | The remainder of milliseconds after the overflow of seconds
 * | `number` | **time.realSeconds** | The intuitive count of seconds remaining
 * | `boolean` | **done** |  True if the timer is finished (time.total === 0)
 * | `boolean` | **running** | True if the timer is currently running
 * | `boolean` | **started** | True if the timer has been started
 * | `()=>void` | **start** | Start or resume the timer
 * | `()=>void` | **stop** | Stop or pause the timer
 * | `()=>void` | **reset** | Stops the timer and resets to the initial time
 * | `number` | **interval** | The interval, in ms, used to refresh the timer
 * | `number` | **duration** | The duration, in ms, that the timer will run
 * 
 * 
 * ___________________________________________
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