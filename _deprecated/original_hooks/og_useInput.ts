import React, {useMemo, useState, useCallback, useEffect} from 'react'
    

export enum StyleGroupNames {
    DEFAULT = 'default',
    HOVER = 'hover',
    FOCUS = 'focus',
    VALID = 'valid',
    INVALID = 'invalid',
}



export interface I_useInputConfig {
    type?: string;
    name?: string;
    style?: string | { [Property in StyleGroupNames]: React.CSSProperties };
    value?: string;
    placeholder?: string;
    readOnly?: boolean;
    disabled?: boolean;
    validOnDefault?: boolean;
    validateOnBlur?: boolean;
    validateOnChange?: boolean;
    validator?: (value: string) => boolean;
    onHover?: (value: string) => void;
    onFocus?: (value: string) => void;
    onBlur?: (value: string) => void;
}

/**
 * useInput()
 * ---
 * 
 * Provide simple bindings between state and an input. 
 * 
 * @param config - config object
 * @param string - some string
 * 
 * @example
 * const username = useInput({
 *      placeholder: 'Username',
 *      validateOnChange: true,
 *      validator: (v) => /^[a-z0-9]+$/.test(v)
 * })
 * 
 * <input {...username.bind} />
 * 
 */

//+ 

const useInput = (config: I_useInputConfig = {}) => {

    const settings = useMemo(() => { return {
        type: config.type                           ?? 'text',
        name: config.name                           ?? '',
        style: config.style                         ?? null,
        value: config.value                         ?? '',
        placeholder: config.placeholder             ?? '',
        readOnly: config.readOnly                   ?? false,
        disabled: config.disabled                   ?? false,
        validOnDefault: config.validOnDefault       ?? false,
        validateOnChange: config.validateOnChange   ?? false,
        validateOnBlur: config.validateOnBlur       ?? false,
        validator: config.validator                 ?? null,
        onHover: config.onHover                     ?? null,
        onFocus: config.onFocus                     ?? null,
        onBlur: config.onBlur                       ?? null,
    }}, [config])

    //+ ///////////////////////////////////////////////////////////////// STATE

    const [value, setValue] = useState(settings.value)
    const [isValid, setIsValid] = useState(settings.validOnDefault ? true : settings.validator ? settings.validator(value) : false)
    const [isEmpty, setIsEmpty] = useState(value?.toString().length === 0)
    const [isFocused, setIsFocused] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [style, setStyle] = useState(StyleGroupNames.DEFAULT)
    
    //+ ///////////////////////////////////////////////////////////// FUNCTIONS

    //- determine if the validator is an instance of RegExp and treat it
    //- as if it were
    //- validator: (v) => /^[a-z0-9]+$/.test(v)
    //- validator: /^[a-z0-9]+$/

    const handleValidate = useCallback(() => {

        if(settings.validator){
            if(settings.validator instanceof RegExp){
                setIsValid(settings.validator.test(value))
            }else if(typeof settings.validator === 'function'){
                setIsValid(settings.validator(value))
            }
        }else{
            setIsValid(true)
        }
    // setIsValid(settings.validator ? settings.validator(value) : true)

    }, [settings, value])


    const handleReset = () => {
        setIsValid(settings.validOnDefault)
        setIsEmpty(value?.toString().length === 0)
        setValue(settings.value)
    }


    const handleChange = (e) => {
        if(settings.type === 'checkbox'){
            setValue(e.target.checked)
        }else{
            setValue(e.target.value)
        }
    }

 

    //+///////////////////////////////////////////////////////////////// EVENTS
    
    const onMouseEnter = () => {
        setIsHovered(true)
        settings.onHover && settings.onHover(value)
    }

    const onMouseLeave = () => {
        setIsHovered(false)
    }

    const onFocus = () => {
        setIsFocused(true)
        settings.onFocus && settings.onFocus(value)
    }

    const onBlur = () => {
        setIsFocused(false)
        setIsHovered(false)
        settings.onBlur && settings.onBlur(value)
        settings.validateOnBlur && settings.validator(value)
    }

    /// USE EFFECT _________________________________________________________________________________________

    useEffect(() => {
        settings.validateOnChange && handleValidate()
        setIsEmpty(value.toString().length === 0)
    }, [value, settings.validateOnChange, handleValidate]);


    useEffect(()=>{
        if(isHovered){
            setStyle(StyleGroupNames.HOVER)
        }
        if(1){}

    }, [isHovered, isFocused, isValid])


    /// RETURN ____________________________________________________________________________________________

    return {
        value,
        setValue,

        validate: handleValidate,
        reset: handleReset,
        
        isValid,
        isEmpty,
        isHovered,
        isFocused,

        bind: {
            value,
            style,
            type: settings.type,
            name: settings.name,
            readOnly: settings.readOnly,
            disabled: settings.disabled,
            placeholder: settings.placeholder,
            onFocus,
            onBlur,
            onMouseEnter,
            onMouseLeave,
            onMouseDown: onFocus,
            onReset: handleReset,
            onChange: (e:any) => handleChange(e),
            onClick: (e:any) => handleChange(e),
        },
    };
    
    
}

export default useInput