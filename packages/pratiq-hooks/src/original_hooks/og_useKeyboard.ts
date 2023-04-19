import {useState, useCallback, useEffect} from 'react'
import isBrowser from '../utils/isBrowser.js'
export interface T_Event {
    code?: string;
}
/** 
* useKeyCombo()
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

const useKeyboard = ({
    element = window, 
    listDom = false,
    minComboKeys = 2,
    ignoreKeys = [],
    
}) => {
    if (!isBrowser()) return;

    const [_key, set_key] = useState<string | undefined>(undefined)
    const [_lastKey, set_lastKey] = useState<string | undefined>(undefined)
    const [_down, set_down] = useState<boolean>(false)
    const [_repeat, set_repeat] = useState<boolean>(false)
    const [_combo, set_combo] = useState<string | undefined>(undefined)
    
    const [_ctrl, set_ctrl] = useState<boolean>(false)
    const [_meta, set_meta] = useState<boolean>(false)
    const [_alt, set_alt] = useState<boolean>(false)
    const [_shift, set_shift] = useState<boolean>(false)
    const [_space, set_space] = useState<boolean>(false)
    
    const [_lastEvent, set_lastEvent] = useState<object>({})
    const [_eventsArray, set_eventsArray] = useState<T_Event[]>([])





    /////////////////////////////////////////////////////////////////////
    const cleanupKeys = () => {
        set_key(undefined)
        set_down(false)
        set_ctrl(false)
        set_alt(false)
        set_shift(false)
        set_combo(undefined)
        set_lastEvent({})
        set_eventsArray([])
    }

    /////////////////////////////////////////////////////////////////////
    const isNotIgnored = useCallback((e: any) => {
        let usable = true
        ignoreKeys.forEach((k: string) => {
            if(
                k.toUpperCase() === e.key.toUpperCase() 
                || k.toUpperCase() === e.code.toUpperCase()
            ){ usable = false }
        })
        return usable
    }, [ignoreKeys])

    /////////////////////////////////////////////////////////////////////
    const keySwitch = useCallback(() => {


        let dk = _eventsArray.map((e: any) => e?.code?.toUpperCase())
        set_lastEvent(_eventsArray[_eventsArray.length - 1])

        set_down( dk.length > 0 ? true : false )
        set_key(dk[dk.length - 1])
        set_lastKey(dk[dk.length - 1] ? dk[dk.length - 1] : _lastKey)
        set_ctrl(dk.toString().match(/CONTROL/) ? true : false)
        set_shift(dk.toString().match(/SHIFT/) ? true : false)
        set_alt(dk.toString().match(/ALT/) ? true : false)
        set_meta(dk.toString().match(/META/) ? true : false)
        set_space(dk.toString().match(/SPACE/) ? true : false)


        if(dk.length >= minComboKeys){
            set_combo('combo?')
            if(_ctrl){}
            console.log(`combo | ctrl:${_ctrl}, alt: ${_alt}`)
        }
        else{
            set_combo(undefined)
        }

    }, [_ctrl, _alt, _eventsArray, _lastKey, minComboKeys])

    


    /////////////////////////////////////////////////////////////////////
    const downHandler = useCallback((e: any) => {
        if(e.repeat){ 
            set_repeat(true)
            return 
        }else{
            set_repeat(false)
        }
        isNotIgnored(e) && set_eventsArray((existingEvents: any[]) => [...existingEvents, e])
    }, [isNotIgnored])

    /////////////////////////////////////////////////////////////////////
    const upHandler = useCallback((e: any) => {
        set_repeat(false)
        set_eventsArray((existingEvents: any[])  => 
            [...existingEvents.filter(
                    event => event?.code?.toUpperCase() !== e.code.toUpperCase() 
                )
            ]
        )
    }, [])

    /////////////////////////////////////////////////////////////////////
    const onVisChange = () => {
        if(document.visibilityState === 'hidden' || document.hidden){
            set_eventsArray([])
        }
    }

    const onBlurOrFocusLost = () => { set_eventsArray([]) }

    /////////////////////////////////////////////////////////////////////
    // event handlers 
    useEffect(() => {
        keySwitch()
    }, [_eventsArray, keySwitch])

    useEffect(()=> { 
        return cleanupKeys
    } ,[])

    useEffect(() => {
        element.addEventListener('keydown', downHandler)
        element.addEventListener('keyup', upHandler)
        document.addEventListener("visibilitychange", onVisChange);
        document.addEventListener("blur", onBlurOrFocusLost);
        return () => {
            element.removeEventListener('keydown', downHandler)
            element.removeEventListener('keyup', upHandler)
            document.removeEventListener("visibilitychange", onVisChange);
        }
    }, [element, downHandler, upHandler])



    return { 
        events: _eventsArray, 
        down: _down, 
        ctrl: _ctrl, 
        key: _key, 
        lastKey: _lastKey,
        lastEvent: _lastEvent,
        alt: _alt, 
        shift: _shift, 
        meta: _meta, 
        repeat: _repeat, 
        combo: _combo, 
        space: _space,
    }
}

export default useKeyboard