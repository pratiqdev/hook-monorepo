import {useEffect, useState} from 'react'
import isBrowser from '../utils/isBrowser.js';
    
/**
 
React hook for copying text to, read from and reset the clipboard.

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



const useClipboard = (initialValue:string = '', flashTime: number = 1000): UseClipboardReturn => {
    const [value, setValue] = useState(initialValue)
    const [success, setSuccess] = useState(false)
    const [flash, setFlash] = useState(false)

    if(!isBrowser() || !navigator?.clipboard){
        console.log('no browser or clipboard:', { navigator, isBrowser: isBrowser() })
        return {
            copy: () => {},
            value: '',
            success: false,
            flash: false,
            reset: () => {}
        }
    }

    const readFromClipboard = async () => {
        try {
            // Bypass TypeScript's type checking by using "as any"
            const text = await navigator.clipboard.readText();
            return text;
        } catch (err) {
            console.error('Failed to read from clipboard. Some environments support writing, but not reading from the clipboard.');
            return null;
        }
    }



    const copyToClipboard = async (text: string = ''): Promise<boolean> => {
        try{
            console.log('writing text:', text)
            await navigator.clipboard.writeText(text)
            // const permissionStatus = await navigator.permissions.query({ name: 'clipboard-read' } as any);
            let val = await readFromClipboard() ?? text
            console.log('new text:', val)

            setSuccess(true)
            setValue(val)
            setFlash(true)
            setTimeout(() => {
                setFlash(false)
            }, flashTime)
            return true
        }catch(err){
            console.log('clipboard error:', err)
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

export type UseClipboardReturn = {
    value: string;
    copy: Function;
    success: boolean;
    flash: boolean;
    reset: Function;
}


export default useClipboard