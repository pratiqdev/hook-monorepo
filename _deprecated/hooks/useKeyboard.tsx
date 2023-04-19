import React, {useState, useCallback, useEffect, useMemo} from 'react'
import isBrowser from '../utils/isBrowser'
import extend from '../utils/logger'
const log = extend('useKeyboard')

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

interface I_UseKeyboardConfig {
    element?: any;
    // listDom?: boolean;
    minComboKeys?: number;
    ignoreKeys?: string[];
    maxHistory?: number;
    combos?: { [key: string]: Function };
    handleCombos?: Function;
}

const useKeyboard = (config: I_UseKeyboardConfig = {}) => {
    if (!isBrowser()) return;

    const settings = useMemo(()=> ({
        element: config.element             ?? window,
        // listDom: config.listDom             ?? false,
        minComboKeys: config.minComboKeys   ?? 2,
        ignoreKeys: config.ignoreKeys       ?? [],
        maxHistory: config.maxHistory       ?? 10,
        combos: config.combos               ?? null,
        handleCombos: config.handleCombos   ?? null,
    }),[config])


    const [_key, set_key] = useState<string | null>(null)
    const [_lastKey, set_lastKey] = useState<string | null>(null)
    const [_down, set_down] = useState<boolean>(false)
    const [_repeat, set_repeat] = useState<boolean>(false)
    const [_combo, set_combo] = useState<string | null>(null)
    
    const [_ctrl, set_ctrl] = useState<boolean>(false)
    const [_alt, set_alt] = useState<boolean>(false)
    const [_shift, set_shift] = useState<boolean>(false)
    const [_space, set_space] = useState<boolean>(false)
    const [_meta, set_meta] = useState<boolean>(false)
    
    const [_lastEvent, set_lastEvent] = useState<React.KeyboardEvent | null>(null)
    const [_eventsArray, set_eventsArray] = useState<React.KeyboardEvent[]>([])
    const [_history, set_history] = useState<React.KeyboardEvent[]>([])

    // useEffect(()=>{
    //     if(settings.maxHistory > 0 && _history.length > settings.maxHistory){
    //         log('aaa', {
    //             history: settings.maxHistory,
    //             length: _history.length
    //         })
    //         _history.splice(0,1)
    //         set_history(_history)
    //     }

    // },[_history])

    useEffect(()=>{
        settings.handleCombos && settings.handleCombos(_combo)
    },[_combo])




    /////////////////////////////////////////////////////////////////////
    const cleanupKeys = () => {
        set_key(null)
        set_lastKey(null)
        set_down(false)
        set_repeat(false)
        set_combo(null)

        set_ctrl(false)
        set_alt(false)
        set_shift(false)
        set_space(false)
        set_meta(false)

        set_lastEvent(null)
        set_eventsArray([])
    }

    /////////////////////////////////////////////////////////////////////
    const isNotIgnored = useCallback((e: any) => {
        let usable = true
        settings.ignoreKeys.forEach((k: string) => {
            if(
                k.toUpperCase() === e.key.toUpperCase() 
                || k.toUpperCase() === e.code.toUpperCase()
            ){ usable = false }
        })
        return usable
    }, settings.ignoreKeys)

    /////////////////////////////////////////////////////////////////////
    const handleCombos = () => {
        
        let dk = _eventsArray.map((e: any) => e?.code?.toUpperCase())

        settings.combos && Object.entries(settings.combos).forEach((combo:any) => {
            
            // the callback function name split into an array
            let funcNameSplit = 
                combo[0]
                .toLowerCase()
                .split('-')

            // a string of all the keys pressed
            let keyString = 
                dk
                .join('-')
                .replace(/CONTROLLEFT/g, 'CTRL')
                .replace(/CONTROLRIGHT/g, 'CTRL')
                .replace(/SHIFTLEFT/g, 'SHIFT')
                .replace(/SHIFTRIGHT/g, 'SHIFT')
                .replace(/ALTRIGHT/g, 'ALT')
                .replace(/ALTLEFT/g, 'ALT')
                .replace(/ARROW/g, '')
                .replace(/KEY/g, '')    
                .replace(/DIGIT/g, '')
                .replace(/NUMPAD/g, '')
                .toLowerCase()


            let match = 0

            funcNameSplit.forEach((funcKey: string, i:number) => {
                keyString.split('-').forEach((pressKey: string, j:number) => {
                    if(funcKey === pressKey) {
                        match++
                    }
                })
            })

            if(match === funcNameSplit.length){
                combo[1]()
            }
            
        })

    }

    /////////////////////////////////////////////////////////////////////
    const keySwitch = useCallback(() => {
        
        let dk = _eventsArray.map((e: any) => e?.code?.toUpperCase())
        set_lastEvent(_eventsArray[_eventsArray.length - 1])

        set_down( dk.length > 0 ? true : false )
        set_key(dk[dk.length - 1] || null)
        set_lastKey(dk[dk.length - 1] ? dk[dk.length - 1] : _lastKey)
        set_ctrl(dk.toString().match(/CONTROL/) ? true : false)
        set_shift(dk.toString().match(/SHIFT/) ? true : false)
        set_alt(dk.toString().match(/ALT/) ? true : false)
        set_meta(dk.toString().match(/META/) ? true : false)
        set_space(dk.toString().match(/SPACE/) ? true : false)
        



        if(dk.length >= settings.minComboKeys){
            set_combo(dk.toString())
        }
        else{
            set_combo(null)
        }

    }, [_ctrl, _alt, _eventsArray, _lastKey, settings.minComboKeys])

    


    /////////////////////////////////////////////////////////////////////
    const downHandler = useCallback((e: any) => {
        if(e.repeat){ 
            set_repeat(true)
            return 
        }else{
            set_repeat(false)
        }
        if(isNotIgnored(e)){
            set_eventsArray((existingEvents: any[]) => [...existingEvents, e])

            set_history((currentHistory: React.KeyboardEvent[]) => {
                if(settings.maxHistory > 0 && currentHistory.length >= settings.maxHistory){
                    currentHistory.splice(0,1)
                    return [...currentHistory, e]
                }else{
                    return [...currentHistory, e]
                }
            })  
        }
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
    }, [_eventsArray])

    useEffect(() => {
        handleCombos()
    }, [_history])

    useEffect(()=> { 
        return cleanupKeys
    } ,[])

    useEffect(() => {
        settings.element.addEventListener('keydown', downHandler)
        settings.element.addEventListener('keyup', upHandler)
        document.addEventListener("visibilitychange", onVisChange);
        document.addEventListener("blur", onBlurOrFocusLost);
        return () => {
            settings.element.removeEventListener('keydown', downHandler)
            settings.element.removeEventListener('keyup', upHandler)
            document.removeEventListener("visibilitychange", onVisChange);
        }
    }, [settings.element, downHandler, upHandler])



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
        history: _history,
        reset: cleanupKeys,
        clearHistory: () => set_history([])
    }
}

export default useKeyboard