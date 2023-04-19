import {useState, useEffect, useCallback, useMemo} from 'react'
import extend from '../utils/logger'
const log = extend('local_useTemperature')


interface I_UseTemperatureConfig { 
    scale?: string;
    value?: number;
    decimals?: number;
}

type T_UseTemperature = (config?: I_UseTemperatureConfig) => {
    value: number; 
    setValue: (value:number) => void;

    scale: string;
    setScale: (scale:string) => void;

    celsius: number;
    fahrenheit: number;
    kelvin: number;
    rankine: number;

    relative: string;

    increment: () => void;
    decrement: () => void;

    c_to_f: (value:number) => number;
    c_to_k: (value:number) => number;
    c_to_r: (value:number) => number;
    
    f_to_c: (value:number) => number;
    f_to_k: (value:number) => number;
    f_to_r: (value:number) => number;
    
    k_to_c: (value:number) => number;
    k_to_f: (value:number) => number;
    k_to_r: (value:number) => number;
    
    r_to_c: (value:number) => number;
    r_to_k: (value:number) => number;
    r_to_f: (value:number) => number;
}

/**
 * useStateWithHistory()
 * ---
 * 
 * useState with history traversal functions
 * 
 * @param {any} initialValue - initial state
 * @param {number} capacity - capacity of history
 * @returns void
 * 
 * @example
 * 
 */


const useTemperature: T_UseTemperature = (config: I_UseTemperatureConfig = {}) => {

    const settings = useMemo(()=>({
        value: config.value         ?? 0,
        scale: config.scale         ?? 'c',
        decimals: config.decimals   ?? 2
    }),[
        config.value,
        config.scale,
        config.decimals
    ])


    const [_value, set_value] = useState(settings.value)
    const [_defaultScale, set_defaultScale] = useState(settings.scale)

    const [_c, set_c] = useState(0)
    const [_f, set_f] = useState(0)
    const [_k, set_k] = useState(0)
    const [_r, set_r] = useState(0)

    const [_relativeTemperature, set_relativeTemperature] = useState('')

    // const [_argumentScale, set_argumentScale] = useState(_defaultScale)



    //- DETERMINE SCALES --------------------------------------------------------------------------

    const _determineScaleOfArgument = (s: string) =>{
        switch(s.toLowerCase()){
            case 'f':
            case 'fahrenheit': return 'f';
            case 'k':
            case 'kelvin': return 'k';
            case 'r':
            case 'rankine': return 'r';
            default: return 'c'
        }
    }

    const _determineDefaultScale = (s: string) =>{
        log(`findBaseScale ${s}`)
        set_defaultScale(_determineScaleOfArgument(s))
    }


    const _handleScaleChange = (s: string) => {
        switch(s){
            case 'f':
            case 'fahrenheit': set_value(_f); break;
            
            case 'k':
            case 'kelvin': set_value(_k); break;

            case 'r':
            case 'rankine': set_value(_r); break;
            
            default: set_value(_c);
        }

    }


    // - DECIMALS -------------------------------------------------------------------------

    const handle_f = (t: number) => set_f(parseFloat(t.toFixed(settings.decimals)))
    const handle_c = (t: number) => set_c(parseFloat(t.toFixed(settings.decimals)))
    const handle_k = (t: number) => set_k(parseFloat(t.toFixed(settings.decimals)))
    const handle_r = (t: number) => set_r(parseFloat(t.toFixed(settings.decimals)))
    const handle_v = (t: number) => set_value(parseFloat(t.toFixed(settings.decimals)))


    //- CONVERSIONS -------------------------------------------------------------------------------
    const _convert = {

        /** F = C x 1.8 + 32 */
        c_f: (c: number) => c * 1.8 + 32,

        /** K = C + 273.15 */
        c_k: (c: number) => c + 273.15,

        /** R = ( C + 273.15 x 1.8 ) */
        c_r: (c: number) => (c + 273.15) * 1.8,


        /** F = K × 1.8 - 459.67 */
        k_f: (k: number) =>  k * 1.8 - 459.67,

        /** C = K - 273.15 */
        k_c: (k: number) => k - 273.15,

        /**  R = K × 1.8 */
        k_r: (k: number) => k * 1.8,


        /** C = ( F - 32 ) / 1.8 */
        f_c: (f: number) => (f - 32) / 1.8,

        /** K = ( F + 459.67 ) × 5/9 */
        f_k: (f: number) => (f + 459.67) * (5/9),

        /** R = F + 459.67 */
        f_r: (f: number) => f + 459.67,

        /** F = R - 459.67 */
        r_f: (r: number) => r - 459.67,

        /** K = R × 5/9 */
        r_k: (r: number) => r * (5/9),

        /** C = ( R - 491.67 ) × 5/9 */
        r_c: (r: number) => (r - 491.67) * (5/9)


    }





    //- EXPORTED HANDLER ---------------------------------------------------------------------------

    const _handleValue = (value: number | Function, s?: string) => {
        let t: number; // typecast to number (inputs use strings)

        if(typeof value === 'function'){
            t = value(_value)
        }else{
            t = value - 0
        }
        
        let _scaleOfArgument = s ? _determineScaleOfArgument(s) : _defaultScale

        if(_scaleOfArgument === 'c'){
            handle_f(_convert.c_f(t))
            handle_k(_convert.c_k(t))
            handle_r(_convert.c_r(t))
            handle_c(t)
            switch(_defaultScale){
                case 'f': handle_v(_convert.c_f(t)); break;
                case 'k': handle_v(_convert.c_k(t)); break;
                case 'r': handle_v(_convert.c_r(t)); break;
                case 'c': handle_v(t); break;
            }
        }

        if(_scaleOfArgument === 'k'){
            handle_f(_convert.k_f(t))
            handle_c(_convert.k_c(t))
            handle_r(_convert.k_r(t))
            handle_k(t)
            switch(_defaultScale){
                case 'f': handle_v(_convert.k_f(t) ); break;
                case 'c': handle_v(_convert.k_c(t) ); break;
                case 'r': handle_v(_convert.k_r(t) ); break;
                case 'k': handle_v(t); break;
            }
        }

        if(_scaleOfArgument === 'f'){
            handle_c(_convert.f_c(t))
            handle_k(_convert.f_k(t))
            handle_k(_convert.f_r(t))
            handle_f(t)
            switch(_defaultScale){
                case 'c': handle_v(_convert.f_c(t) ); break;
                case 'k': handle_v(_convert.f_k(t) ); break;
                case 'r': handle_v(_convert.f_r(t) ); break;
                case 'f': handle_v(t); break;
            }
        }

        if(_scaleOfArgument === 'r'){
            handle_c(_convert.r_c(t))
            handle_k(_convert.r_k(t))
            handle_f(_convert.r_f(t))
            handle_r(t)
            switch(_defaultScale){
                case 'f': handle_v( _convert.r_f(t) ); break;
                case 'c': handle_v( _convert.r_c(t) ); break;
                case 'k': handle_v( _convert.r_k(t) ); break;
                case 'r': handle_v(t); break;
            }
        }

        
        

    }

    const _determineRelativeTemperature = useCallback(() => {
        if (_f <= 32)                   set_relativeTemperature('freezing')
        else if (_f > 32 && _f <= 50)   set_relativeTemperature('cold')
        else if (_f > 50 && _f <= 60)   set_relativeTemperature('cool')
        else if (_f > 60 && _f <= 70)   set_relativeTemperature('moderate')
        else if (_f > 70 && _f <= 80)   set_relativeTemperature('warm')
        else                            set_relativeTemperature('hot')
    }, [_f])

    const increment = () => { _handleValue(parseInt(_value.toString()) + 1) }
    const decrement = () => { _handleValue(parseInt(_value.toString()) - 1) }

    

    useEffect(()=>{
        _determineRelativeTemperature() 
    }, [_f, _determineRelativeTemperature, _value])


    // useEffect(()=>{
    //     _determineDefaultScale(settings.scale) 
    // }, [settings.scale])

    useEffect(()=>{
        _handleScaleChange(_defaultScale)
    },[_defaultScale])

    useEffect(()=>{
        _handleValue(settings.value, settings.scale)
    }, [settings.value])


    // useEffect(()=>{
        // _determineDefaultScale(_defaultScale)
    // },[settings.scale, _defaultScale])




    return {
        value: _value, 
        setValue: _handleValue,

        scale: _defaultScale,
        setScale: (v:string) => set_defaultScale(_determineScaleOfArgument(v)),

        celsius: _c,
        fahrenheit: _f,
        kelvin: _k,
        rankine: _r,

        relative: _relativeTemperature,

        increment,
        decrement,

        c_to_f: _convert.c_f,
        c_to_k: _convert.c_k,
        c_to_r: _convert.c_r,
        
        f_to_c: _convert.f_c,
        f_to_k: _convert.f_k,
        f_to_r: _convert.f_r,
        
        k_to_c: _convert.k_c,
        k_to_f: _convert.k_f,
        k_to_r: _convert.k_r,
        
        r_to_c: _convert.r_c,
        r_to_k: _convert.r_k,
        r_to_f: _convert.r_f,

    }
}


export default useTemperature