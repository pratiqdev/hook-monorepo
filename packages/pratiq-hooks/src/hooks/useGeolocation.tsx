import {useState, useEffect, useRef, useMemo} from 'react'
import extend from '../utils/logger.js'
import isBrowser from '../utils/isBrowser.js';
const log = extend('local_useGeolocation')


/**
* useGeolocation()
* ---
* 
* useState that returns if CSS prop/value is valid
* 
* @param {string} options - options passed to navigator
* @returns geolocation data

* @example
* 
*/

export interface I_UseGeoOptions {
    /** 
     * A positive long value indicating the maximum age in milliseconds of a 
     * possible cached position that is acceptable to return. If set to 0, it 
     * means that the device cannot use a cached position and must attempt to 
     * retrieve the real current position. If set to Infinity the device must 
     * return a cached position regardless of its age. Default: 0.
     */
    maximumAge?: number;

    /**
     * A positive long value representing the maximum length of time (in 
     * milliseconds) the device is allowed to take in order to return a 
     * position. The default value is Infinity, meaning that 
     * getCurrentPosition() won't return until the position is available.
     */
    timeout?: number;

    /**
     * A boolean value that indicates the application would like to receive the 
     * best possible results. If true and if the device is able to provide a 
     * more accurate position, it will do so. Note that this can result in 
     * slower response times or increased power consumption (with a GPS chip 
     * on a mobile device for example). On the other hand, if false, the device 
     * can take the liberty to save resources by responding more quickly and/or 
     * using less power. Default: false.
     */
    enableHighAccuracy?: boolean;

}


export type UseGeoData = {         // example
    accuracy: number | null;            // 5000 
    altitudeAccuracy: number | null;    // null
    heading: number | null;                    // 55.115156546655356,       
    latitude: number | null;                   // 43.210 
    longitude: number | null;                  // -87.654 
    speed: number | null;                      // 0 
    timestamp: number | null;                  // 1234567890987, 
    delta: number | null;                      // 842 
    direction: string | null;           // 'NNW'
} 

export type UseGeoReturn = {
    data: UseGeoData;
    error: any;
    active: boolean;
}


const useGeolocation = (options: I_UseGeoOptions = {}):UseGeoReturn => {
    const nullData: UseGeoData = {
        accuracy: null,
        altitudeAccuracy: null,
        heading: null,
        direction: null,
        latitude: null,
        longitude: null,
        speed: null,
        timestamp: null,
        delta: null,
    }

    if (!isBrowser()) return { data:nullData, error: null, active: false } 

    const [error, setError] = useState<any>(null)
    const [data, setData] = useState<UseGeoData>(nullData)
    const [isActive, setIsActive] = useState(false)
    const lastTime = useRef<any>(Date.now())

    const getDirectionFromHeading = (heading: number) => {
        let map: { [key:number | string]: string } = {
            0: 'N',
            22.5:'NNE',
            45: 'NE',
            67.5: 'ENE',
            90: 'E',
            112.5: 'ESE',
            135: 'SE',
            157.5: 'SSE',
            180: 'S',
            202.5: 'SSW',
            225: 'SW',
            247.5: 'WSW',
            270: 'W',
            292.5: 'WNW',
            315: 'NW',
            337.5: 'NNW',
            360: 'N',
        }

        let headings = Object.keys(map)

        var closest: string = headings.reduce((previousValue: string, currentValue: string, currentIndex: number, array: string[]):string => {
            let prev = parseFloat(previousValue)
            let curr = parseFloat(currentValue)
            return (Math.abs(curr - heading) < Math.abs(prev - heading) ? curr : prev).toString();
          });

        return map[closest]

    }

    useEffect(()=>{
        const successHandler = (e: any) => {
            setError(null)
            setIsActive(true)
            const {
                accuracy,
                altitudeAccuracy,
                heading,
                latitude,
                longitude,
                speed,
            } = e.coords;

            let delta = e.timestamp - lastTime.current
            lastTime.current = e.timestamp

            setData({
                accuracy,
                altitudeAccuracy,
                heading,
                direction: getDirectionFromHeading(heading),
                latitude,
                longitude,
                speed,
                timestamp: e.timestamp,
                delta
            })
        }
        
        const errorHandler = (e:any) => {
            log('error:',e)
            setError(e.message)
            setData(nullData)
            setIsActive(false)
        }

        navigator.geolocation.getCurrentPosition(
            successHandler,
            errorHandler,
            options
        )

        const id = navigator.geolocation.watchPosition(
            successHandler,
            errorHandler,
            options
        )
        return () => navigator.geolocation.clearWatch(id)
    }, Object.values(options))

    return {data, error, active:isActive}

}

export default useGeolocation