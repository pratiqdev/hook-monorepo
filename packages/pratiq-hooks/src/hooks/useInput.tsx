import React, {useMemo, useState, useCallback, useEffect, useRef, CSSProperties } from 'react'
import { isBrowser } from '@pratiq/utils'
import debug from 'debug'
const log = debug('@pq:useInput')

// const log = extend('local_useInput')
// const log = console.log

export enum StyleGroupNames {
    
    DEFAULT = 'default',
    DEFAULT_HOVER = 'default-hover',
    DEFAULT_FOCUS = 'default-focus',
    DEFAULT_ACTIVE = 'default-active',
    
    VALID = 'valid',
    VALID_HOVER = 'valid-hover',
    VALID_FOCUS = 'valid-focus',
    VALID_ACTIVE = 'valid-active',
    
    INVALID = 'invalid',
    INVALID_HOVER = 'invalid-hover',
    INVALID_FOCUS = 'invalid-focus',
    INVALID_ACTIVE = 'invalid-active',
}

export type T_UseInputReturn = {
    value: string;
    setValue: (value:string) => void;

    validate: () => void;
    reset: () => void;
    save: (value:string) => void;
    remove: () => void;

    
    isValid: boolean;
    isEmpty: boolean;
    isHovered: boolean;
    isFocused: boolean;
    wasValidated: boolean;
    invalidMessage: string;

    bind: {
        value: string;
        style: { [key: string]: CSSProperties };
        className: string;
        type: string;
        name: string;
        readOnly: boolean;
        disabled: boolean;
        placeholder: string;
        onFocus: (e:any) => void;
        onBlur: (e:any) => void;
        onMouseEnter: (e:any) => void;
        onMouseLeave: (e:any) => void;
        onMouseUp: (e:any) => void;
        onMouseDown: (e:any) => void;
        onReset: (e:any) => void;
        onChange: (e:any) => void;
        onClick: (e:any) => void;
    },
};

export type T_UseInputConfig = {

    reset?: any;
    /** The type of HTML input element to render. */
    type?: string;

    /** The name of this input - used for form handling */
    name?: string;

    /** The key used for local / session storage */
    storageKey?: string;

    /** Which storage medium to use */
    storageObject?: any;

    /** Set to true to enable auto-saving on change */
    saveOnChange?: boolean;

    /** Array of options that the value must match to be valid */
    options?: string[];

    styleGroup?: { [Property in StyleGroupNames]: { [key: string]: CSSProperties } };
    style?: { [key: string]: CSSProperties };
    className?: string;
    value?: string;
    placeholder?: string;
    readOnly?: boolean;
    disabled?: boolean;
    invalidMessage?: string;
    /** Set isValid to true using the default input value. default = false */
    validOnDefault?: boolean;
    /** Validate the value when the input loses focus. default = false */
    validateOnBlur?: boolean;
    /** Validate the value on any change event. default = false */
    validateOnChange?: boolean;
    validator?: (value: string) => boolean | RegExp | string;
    onValidated?: (value: string) => void;
    onActive?: (value: string) => void;
    onHover?: (value: string) => void;
    onFocus?: (value: string) => void;
    onBlur?: (value: string) => void;
}

type T_UseInput = (config?: T_UseInputConfig) => T_UseInputReturn;
/**
 * useInput
 * ---
 * 
 * Provide simple bindings between state and an html input element
 * 
 * @param config 
 * @example
 * export interface I_useInputConfig {
 *      // Attribute type - 'text' | 'number' | 'checkbox' | 'radio'
 *      type?: string;
 * 
 *      // Attribute name
 *      name?: string;
 * 
 *      // Custom class names or style objects with a key of style states
 *      style?:  { [Property in StyleGroupNames]?: { [key: string]: CSSProperties | string } };
 * 
 *      // Default style object - overridden by style state objects
 *      rootStyle?: { [key: string]: CSSProperties | string };
 * 
 *      // CSS classname of the html element
 *      className?: string;
 * 
 *      // Initial value of the input
 *      value?: string;
 * 
 *      // Input placeholder
 *      placeholder?: string;
 * 
 *      // Readonly attribute - prevents altering contents of input
 *      readOnly?: boolean;
 * 
 *      // Disabled attribute 
 *      disabled?: boolean;
 * 
 *      // Message to return on invalid value state
 *      invalidMessage?: string;
 * 
 *      // Set isValid to true with initialValue
 *      validOnDefault?: boolean;
 * 
 *      // Validate value when focus is lost on the input element
 *      validateOnBlur?: boolean;
 * 
 *      // Validate value on any change
 *      validateOnChange?: boolean;
 * 
 * 
 *      //
 *      validator?: (value: string) => boolean;
 *      onValidated?: (value: string) => void;
 *      onActive?: (value: string) => void;
 *      onHover?: (value: string) => void;
 *      onFocus?: (value: string) => void;
 *      onBlur?: (value: string) => void;
 * }
 *
 * const username = useInput({
 *      placeholder: 'Username',
 *      validateOnChange: true,
 *      validator: (v) => /^[a-z0-9]+$/.test(v)
 * })
 * 
 * <input {...username.bind} />
 * <p>Value: {username.value}</p>
 * <p>Valid: {username.isValid}</p>
 * 
 */


const useInput:T_UseInput = (config: T_UseInputConfig = {}) => {
    const empty = {
        value: '',
        setValue: () => {},

        validate: () => {},
        reset: () => {},
        save: () => {},
        remove: () => {},

        
        isValid: false,
        isEmpty: false,
        isHovered: false,
        isFocused: false,
        wasValidated: false,
        invalidMessage: '',

        bind: {
            value: '',
            style: {},
            className: '',
            type: 'text',
            name: '',
            readOnly: false,
            disabled: false,
            placeholder: '',
            onFocus: () => {},
            onBlur: () => {},
            onMouseEnter: () => {},
            onMouseLeave: () => {},
            onMouseUp: () => {},
            onMouseDown: () => {},
            onReset: () => {},
            onChange: () => {},
            onClick: () => {},
        },
    };

    if(!isBrowser()) return empty;

    // log('og style:', config.style || {})

    const getDefaultStyle = () => {
        let res: { [key:string]: any } = config.styleGroup || {}
        Object.values(StyleGroupNames).forEach((x, i) => {
            if(!(x in res)){
                res[x] = {}
            }
        })
        // log('new style:', res)

        return res
    }


    const settings = useMemo(() => ({
        styleGroup:                                 getDefaultStyle(),
        style: config.style                         ?? {},
        storageObject: config.storageObject         ?? typeof window !== 'undefined' ? window.localStorage : null,
        type: config.type                           ?? 'text',
        name: config.name                           ?? '',
        className: config.className                 ?? '',
        value: config.value                         ?? '',
        placeholder: config.placeholder             ?? '',
        invalidMessage: config.invalidMessage       ?? '',
        readOnly: config.readOnly                   ?? false,
        disabled: config.disabled                   ?? false,
        saveOnChange: config.saveOnChange           ?? false,
        validOnDefault: config.validOnDefault       ?? false,
        validateOnChange: config.validateOnChange   ?? false,
        validateOnBlur: config.validateOnBlur       ?? false,
        storageKey: config.storageKey               ?? null,
        options: config.options                     ?? null,
        validator: config.validator                 ?? null,
        onActive: config.onActive                   ?? null,
        onHover: config.onHover                     ?? null,
        onFocus: config.onFocus                     ?? null,
        onBlur: config.onBlur                       ?? null,
        reset: config.reset                         ?? [],
    }), [config])

    //+ ///////////////////////////////////////////////////////////////// STATE

    const [value, setValue] = useState(settings.value)
    const [wasValidated, setWasValidated] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const [invalidMessage, setInvalidMessage] = useState('')
    const [isEmpty, setIsEmpty] = useState(value?.toString().length === 0)
    const [isFocused, setIsFocused] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [style, setStyle] = useState({})
    const [className, setClassName] = useState(settings.className)

    const initRef = useRef(false)

    
    //+ ///////////////////////////////////////////////////////////// FUNCTIONS

    const handleValidate = useCallback(() => {
        log('handleValidate')
        setWasValidated(true)


    
        
        if(settings.validator){
            if(settings.validator instanceof RegExp){
                let validatorResult = settings.validator.test(value)
                setIsValid(validatorResult)
                setInvalidMessage(validatorResult ? '' : settings.invalidMessage)
            }else if(typeof settings.validator === 'function'){
                let validatorResult = settings.validator(value) ? true : false
                setIsValid(validatorResult)
                setInvalidMessage(validatorResult ? '' : settings.invalidMessage)
            }else{
                let validatorResult = settings.validator === value
                setIsValid(validatorResult)
                setInvalidMessage(validatorResult ? '' : settings.invalidMessage)
            }
        }else if(settings.options && settings.options.length){
            if(!settings.options.includes(value)){
                if(value.length){
                    setIsValid(false)
                    setInvalidMessage(`Value "${value}" does not exist in options: ${settings.options.join(', ')}`)
                }else{
                    setIsValid(true)
                    setInvalidMessage('')
                }
            }else{
                setIsValid(true)
                setInvalidMessage('')
            }
        }else{
            setIsValid(true)
            setInvalidMessage('')
        }
    }, [settings, value])


    const handleReset = () => {
        // shouldUpdate.current = true
        log('handleReset')
        setIsValid(settings.validOnDefault ? true : false)
        setIsEmpty(value?.toString().length === 0)
        setValue(settings.value)
        setWasValidated(false)
        setInvalidMessage('')
        removeStorage()
        initRef.current = false
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        log('handleChange:', e.target.value)
        if(settings.type === 'checkbox'){
            setValue(e.target.checked.toString())
        }
        // else if(settings.options && settings.options.length){
        //     settings.options.forEach((opt:string) => {
        //         console.log(`Checking match: "${e.target.value}" => "${opt}"`)
        //         let reg = new RegExp(e.target.value,'gm').test(opt)
        //         if(reg){
        //             console.log(`Match: "${e.target.value}" => "${opt}"`)
        //             // setValue(opt)
        //         }
        //     })
        // }
        else{
            setValue(e.target.value)
        }
    }


    const getStorage = () => {
        if(!shouldLoadStorage.current){
            log('getStorage cancelled by: shouldLoadStorage.current = false')
            return
        }
        log('getStorage')
        if(!settings.storageObject || !settings.storageKey) return null;
        const found = settings.storageObject.getItem(settings.storageKey)
        if(found){
            setValue(found)
        }
    }
    
    const setStorage = (value:string) => {
        log('setStorage')
        if(!settings.storageObject || !settings.storageKey) return;
        settings.storageObject.setItem(settings.storageKey, value)
    }
    
    const removeStorage = () => {
        log('removeStorage')
        if(!settings.storageObject || !settings.storageKey) return;
        settings.storageObject.removeItem(settings.storageKey)
    }

 




    //+///////////////////////////////////////////////////////////////// EVENTS
    
    const onMouseEnter = () => {
        log('onMouseEnter')
        setIsHovered(true)
        settings.onHover && settings.onHover(value)
    }
    
    const onMouseLeave = () => {
        log('onMouseLeave')
        setIsHovered(false)
        setIsActive(false)
    }
    
    const onMouseUp = () => {
        log('onMouseUp')
        setIsActive(false)
    }
    
    const onMouseDown = () => {
        log('onMouseDown')
        setIsActive(true)
    }
    
    const onFocus = () => {
        log('onFocus')
        setIsFocused(true)
        settings.onFocus && settings.onFocus(value)
    }
    
    const onBlur = () => {
        log('onBlur')
        setIsFocused(false)
        setIsHovered(false)
        settings.onBlur && settings.onBlur(value)
        settings.validateOnBlur && handleValidate()
    }




    //+ ///////////////////////////////////////////////////////////////// SETUP

    useEffect(()=>{
        // setting styles should go in order from least important to most

        const handleClassVsStyle = (SGN: string, className?: string) => {
            // if(typeof settings.style[SGN] === 'string'){
            //     setClassName(settings.className + ' ' + settings.style[SGN])
            //     setStyle(settings.rootStyle)
            // }else{
                setStyle({...settings.style, ...settings.styleGroup[SGN]})
                setClassName(settings.className + ' ' + SGN.replace('-', ' '))
            // }
        }

        
        if(wasValidated){
            if(isValid){
                if(isFocused) handleClassVsStyle(StyleGroupNames.VALID_FOCUS) 
                if(isHovered) handleClassVsStyle(StyleGroupNames.VALID_HOVER)
                if(isActive) handleClassVsStyle(StyleGroupNames.VALID_ACTIVE)
                if(!isHovered && !isActive && !isFocused) handleClassVsStyle(StyleGroupNames.VALID)
            }else{
                if(isFocused) handleClassVsStyle(StyleGroupNames.INVALID_FOCUS) 
                if(isHovered) handleClassVsStyle(StyleGroupNames.INVALID_HOVER)
                if(isActive) handleClassVsStyle(StyleGroupNames.INVALID_ACTIVE)
                if(!isHovered && !isActive && !isFocused) handleClassVsStyle(StyleGroupNames.INVALID)
            }
            
        }else{
            if(isFocused) handleClassVsStyle(StyleGroupNames.DEFAULT_FOCUS) 
            if(isHovered) handleClassVsStyle(StyleGroupNames.DEFAULT_HOVER)
            if(isActive) handleClassVsStyle(StyleGroupNames.DEFAULT_ACTIVE)
            if(!isHovered && !isActive && !isFocused) handleClassVsStyle(StyleGroupNames.DEFAULT)
        }


    }, [isHovered, isFocused, isValid, isEmpty, isActive, wasValidated, value])

    const shouldLoadStorage = useRef(true)
    

    

    useEffect(()=>{
        if(!initRef.current){
            log('init...')
            getStorage()
            if(value === '' && settings.value){
                setValue(settings.value)
            }
            handleValidate()
        }else{
            if(settings.validateOnChange){
                handleValidate()
            }
            if(settings.saveOnChange){
                setStorage(value)
            }
        } 
        
        setIsEmpty(value.toString().length === 0)
        log(settings.style)
        
        initRef.current = true
    },[value, settings.validateOnChange, settings.saveOnChange])

    //! Just changed this from 'useUpdateEffect'
    useEffect(() => {
        shouldLoadStorage.current = false
        log('handleReset')
        setIsValid(settings.validOnDefault)
        setIsEmpty(value?.toString().length === 0)
        setValue('')
        setWasValidated(false)
        setInvalidMessage('')
        removeStorage()
        initRef.current = false
    }, [config.reset])





    //+ //////////////////////////////////////////////////////////////// RETURN

    return {
        value,
        setValue,

        validate: handleValidate,
        reset: handleReset,
        save: setStorage,
        remove: removeStorage,

        
        isValid,
        isEmpty,
        isHovered,
        isFocused,
        wasValidated,
        invalidMessage: isValid ? '' : wasValidated ? invalidMessage : '',

        bind: {
            value,
            style,
            className,
            type: settings.type,
            name: settings.name,
            readOnly: settings.readOnly,
            disabled: settings.disabled,
            placeholder: settings.placeholder,
            onFocus,
            onBlur,
            onMouseEnter,
            onMouseLeave,
            onMouseUp,
            onMouseDown,
            onReset: handleReset,
            onChange: (e:any) => handleChange(e),
            onClick: (e:any) => handleChange(e),
        },
    };
    
    
}

export default useInput