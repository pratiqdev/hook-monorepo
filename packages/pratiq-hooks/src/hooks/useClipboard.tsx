import {useEffect, useState} from 'react'
import isBrowser from '../utils/isBrowser';
    
/**
 
A React hook that provides functionality to copy text to clipboard and reset the clipboard.


--- 

@browser  
__NO SSR__ 
This hook relies on functions or properties only available in the browser. It will fail in SSR environments.

---

@returns 
__clipboard__ `object`  
An object containing the following properties:  

__clipboard.copy__ `function`  
A function that takes a string as an argument and copies it to the clipboard.  

__clipboard.reset__ `function`  
A function that clears the clipboard.  

__clipboard.value__ `string`  
The text that is currently on the clipboard.  

__clipboard.success__ `boolean`  
A boolean indicating whether the copy operation was successful.  

__clipboard.flash__ `boolean`  
A boolean indicating whether a visual cue (such as a flash) should be displayed to indicate a successful copy operation.  

---

@example
const { copy, value, success, reset, flash } = useClipboard();

// Copy text to clipboard
copy('Hello World!');

// Check if the copy operation was successful
if (success) {
    console.log('Text copied to clipboard:', value);
}

// Reset the clipboard
reset();
*/

// TODO - research using clipboard entries instead of most recent value

export interface I_UseClipboardReturn {
    value: string;
    copy: Function;
    success: boolean;
    flash: boolean;
    reset: Function;
}

const useClipboard = (): I_UseClipboardReturn => {
    const [value, setValue] = useState('')
    const [success, setSuccess] = useState(false)
    const [flash, setFlash] = useState(false)

    if(!isBrowser() || !navigator?.clipboard){
        return {
            copy: () => {},
            value: '',
            success: false,
            flash: false,
            reset: () => {}
        }
    }



    const copyToClipboard = async (text: string = ''): Promise<boolean> => {
        try{
            await navigator.clipboard.writeText(text)
            let val = await navigator.clipboard.readText()
            setSuccess(true)
            setValue(val)
            setFlash(true)
            setTimeout(() => {
                setFlash(false)
            }, 1000)
            return true
        }catch(err){
            setSuccess(false)
            return false
        }
    }

    const reset = () => {
        navigator.clipboard.writeText('')
        setValue('')
        setSuccess(false)
    }

    return {
        copy:copyToClipboard, 
        value, 
        success, 
        reset,
        flash,
    }
}

export default useClipboard