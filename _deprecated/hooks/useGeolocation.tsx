import {useState, useEffect, useRef, useMemo} from 'react'
import extend from '../utils/logger'
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


export interface I_UseGeoData {         // example
    accuracy: number | null;            // 5000 
    altitudeAccuracy: number | null;    // null
    heading: number;                    // 55.115156546655356,       
    latitude: number;                   // 43.210 
    longitude: number;                  // -87.654 
    speed: number;                      // 0 
    timestamp: number;                  // 1234567890987, 
    delta: number;                      // 842 
} 

const useGeolocation = (options: I_UseGeoOptions = {}) => {
    const nullData = {
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

    const [error, setError] = useState<any>(null)
    const [data, setData] = useState<any | I_UseGeoData>(nullData)
    const [isActive, setIsActive] = useState(false)
    const lastTime = useRef<any>(Date.now())

    const getDirectionFromHeading = (heading: number) => {
        let map = {
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
        let dir = 'N'

        // Object.entries(map).forEach(([_heading, _direction]:any) => {
        //     if()
        // })
        let headings = Object.keys(map)

        //@ts-ignore
        var closest = headings.reduce((_prev:string, _curr:string) => {
            let prev = parseFloat(_prev)
            let curr = parseFloat(_curr)
            return (Math.abs(curr - heading) < Math.abs(prev - heading) ? curr : prev);
          });

        return map[closest]

    }

    useEffect(()=>{
        log('MOUNTED -------------------')
        return () => log('UNMOUNTED -------------')
    }, [])



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

    useEffect(()=>{ log('option change') },[options])
    useEffect(()=>{ log('data change') },[data])
    useEffect(()=>{ log('error change') },[error])

    return {data, error, active:isActive}

}

export default useGeolocation