import {useState, useEffect} from 'react'
import isBrowser from '../utils/isBrowser'

/**
* useValidCss()
* ---
* 
* useState that returns if CSS prop/value is valid
* 
* @param {string} cssProp - the prop used to validate the value
* @param {string} cssString - the prop used to validate the value
* @returns A stateful value and true if valid

* @example
* 
*/

const useWindow = () => {

    if (!isBrowser()) return {};

    let _body = document.body,
        _html = document.documentElement;

    function toFixedNumber(num: number, digits: number = 0, base: number = 10){
        var pow = Math.pow(base, digits);
        return Math.round(num*pow) / pow;
    }

    const [coords, setCoords] = useState({x:0, y:0})

    const [windowSize, setWindowSize] = useState<any>({
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: toFixedNumber(window.innerWidth / window.innerHeight, 2),
        maxHeight: Math.max( _body.scrollHeight, _body.offsetHeight, _html.clientHeight, _html.scrollHeight, _html.offsetHeight ),
        scrollY: toFixedNumber(window.scrollY),
        scrollX: toFixedNumber(window.scrollX),
        angle: 0,
        type: 'landscape-primary',
        orientation: '...'
    })

    const handler = () => {
        const screen = window?.screen as any
        var so = screen?.orientation || screen?.mozOrientation || screen?.msOrientation;
        const angle = so.angle || 0
        const type = so.type || 'landscape-primm'

        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
            // ratio: window.innerWidth > window.innerHeight ? (window.innerWidth / window.innerHeight).toFixed(2) : window.innerHeight / window.innerWidth,
            ratio: toFixedNumber(window.innerWidth / window.innerHeight, 2),

            maxHeight: Math.max( _body.scrollHeight, _body.offsetHeight, _html.clientHeight, _html.scrollHeight, _html.offsetHeight ),
            scrollY: toFixedNumber(window.scrollY),
            scrollX: toFixedNumber(window.scrollX),
            angle,
            type,
            orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
        })
    }

    const mouseHandler = (e) => {
        setCoords({x:e.clientX, y: e.clientY})
    }

    useEffect(() => {
        handler()
        window.addEventListener('resize', handler)
        window.addEventListener('scroll', handler)
        window.addEventListener('mousemove', mouseHandler)
        window.screen.orientation.addEventListener('change', handler, true);
        
        return () => {
            window.removeEventListener('resize', handler)
            window.removeEventListener('scroll', handler)
            window.removeEventListener('mousemove', mouseHandler)
            window.screen.orientation.removeEventListener('change', handler, true);
        }
    }, [])



    return {...windowSize, ...coords}
}

export default useWindow