import {useState, useEffect, useCallback} from 'react'
    
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


const useTemperature = ({
    scale = 'c', 
    value = 0, 
    decimals = 2, 
}) => {
    const [_value, set_value] = useState(value)
    const [_defaultScale, set_defaultScale] = useState('')

    const [_c, set_c] = useState(0)
    const [_f, set_f] = useState(0)
    const [_k, set_k] = useState(0)
    const [_r, set_r] = useState(0)

    const [_relativeTemperature, set_relativeTemperature] = useState('')

    // const [_argumentScale, set_argumentScale] = useState(_defaultScale)



    //- DETERMINE SCALES --------------------------------------------------------------------------

    const _determineDefaultScale = (s: string) =>{
        console.log(`findBaseScale ${s}`)
        switch(s.toLowerCase()){
        case 'f':
            case 'fahrenheit': set_defaultScale('f'); break;
        case 'k':
            case 'kelvin': set_defaultScale('k'); break;
        case 'r':
            case 'rankine': set_defaultScale('r'); break;
            default: set_defaultScale('c')
        }
    }

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


    // - DECIMALS -------------------------------------------------------------------------

    const handle_f = (t: number) => set_f(parseFloat(t.toFixed(decimals)))
    const handle_c = (t: number) => set_c(parseFloat(t.toFixed(decimals)))
    const handle_k = (t: number) => set_k(parseFloat(t.toFixed(decimals)))
    const handle_r = (t: number) => set_r(parseFloat(t.toFixed(decimals)))
    const handle_v = (t: number) => set_value(parseFloat(t.toFixed(decimals)))


    //- CONVERSIONS -------------------------------------------------------------------------------

        //- celsius 
            // T(°F) = T(°C) × 1.8 + 32 
            /** F = C x 1.8 + 32 */
            const _convert_c_f = (c: number) => c * 1.8 + 32

            // T(K) = T(°C) + 273.15
            /** K = C + 273.15 */
            const _convert_c_k = (c: number) => c + 273.15

            // T(°R) = (T(°C) + 273.15) × 1.8
            /** R = ( C + 273.15 x 1.8 ) */
            const _convert_c_r = (c: number) => (c + 273.15) * 1.8

        //- kelvin
            // T(°F) = T(K) × 1.8 - 459.67
            const _convert_k_f = (k: number) =>  k * 1.8 - 459.67

            // T(°C) = T(K) - 273.15
            const _convert_k_c = (k: number) => k - 273.15

            // T(°R) = T(K) × 1.8
            const _convert_k_r = (k: number) => k * 1.8

        //- fahrenheit
            // T(°C) = (T(°F) - 32) / 1.8
            const _convert_f_c = (f: number) => (f - 32) / 1.8

            /** T(K) = (T(°F) + 459.67) × 5/9 */
            const _convert_f_k = (f: number) => (f + 459.67) * (5/9)

            // T(°R) = T(°F) + 459.67
            const _convert_f_r = (f: number) => f + 459.67

        //- rankine
            // T(°F) = T(°R) - 459.67
            const _convert_r_f = (r: number) => r - 459.67

            // T(K) = T(°R) × 5/9
            const _convert_r_k = (r: number) => r * (5/9)

            // T(°C) = (T(°R) - 491.67) × 5/9
            const _convert_r_c = (r: number) => (r - 491.67) * (5/9)














    //- EXPORTED HANDLER ---------------------------------------------------------------------------

    const _handleValue = (value: number, s: string) => {
        let t: number = value - 0 // typecast to number (inputs use strings)
        
        let _scaleOfArgument = s ?_determineScaleOfArgument(s) : _defaultScale

        if(_scaleOfArgument === 'c'){
            handle_f(_convert_c_f(t))
            handle_k(_convert_c_k(t))
            handle_r(_convert_c_r(t))
            handle_c(t)
            switch(_defaultScale){
                case 'f': handle_v(_convert_c_f(t)); break;
                case 'k': handle_v(_convert_c_k(t)); break;
                case 'r': handle_v(_convert_c_r(t)); break;
                case 'c': handle_v(t); break;
            }
        }

        if(_scaleOfArgument === 'k'){
            handle_f(_convert_k_f(t))
            handle_c(_convert_k_c(t))
            handle_r(_convert_k_r(t))
            handle_k(t)
            switch(_defaultScale){
                case 'f': handle_v(_convert_k_f(t) ); break;
                case 'c': handle_v(_convert_k_c(t) ); break;
                case 'r': handle_v(_convert_k_r(t) ); break;
                case 'k': handle_v(t); break;
            }
        }

        if(_scaleOfArgument === 'f'){
            handle_c(_convert_f_c(t))
            handle_k(_convert_f_k(t))
            handle_k(_convert_f_r(t))
            handle_f(t)
            switch(_defaultScale){
                case 'c': handle_v(_convert_f_c(t) ); break;
                case 'k': handle_v(_convert_f_k(t) ); break;
                case 'r': handle_v(_convert_f_r(t) ); break;
                case 'f': handle_v(t); break;
            }
        }

        if(_scaleOfArgument === 'r'){
            handle_c(_convert_r_c(t))
            handle_k(_convert_r_k(t))
            handle_f(_convert_r_f(t))
            handle_r(t)
            switch(_defaultScale){
                case 'f': handle_v( _convert_r_f(t) ); break;
                case 'c': handle_v( _convert_r_c(t) ); break;
                case 'k': handle_v( _convert_r_k(t) ); break;
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
        else if (_f > 80 && _f <= 100)  set_relativeTemperature('hot')
        else                            set_relativeTemperature('')
    }, [_f])

    

    useEffect(()=>{
        _determineRelativeTemperature() 
    }, [_f, _determineRelativeTemperature])


    useEffect(()=>{
        _determineDefaultScale(scale) 
    }, [value, scale])




    return [
        _value, 
        _handleValue,
        {
            scale: _defaultScale,
            celsius: _c,
            fahrenheit: _f,
            kelvin: _k,
            rankine: _r,
            relative: _relativeTemperature,

            c_to_f: _convert_c_f,
            c_to_k: _convert_c_k,
            c_to_r: _convert_c_r,
            
            f_to_c: _convert_f_c,
            f_to_k: _convert_f_k,
            f_to_r: _convert_f_r,
            
            k_to_c: _convert_k_c,
            k_to_f: _convert_k_f,
            k_to_r: _convert_k_r,
            
            r_to_c: _convert_r_c,
            r_to_k: _convert_r_k,
            r_to_f: _convert_r_f,

        }
    ]
}


export default useTemperature