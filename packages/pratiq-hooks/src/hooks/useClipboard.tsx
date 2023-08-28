import { useState } from 'react'
import { isBrowser } from '@pratiq/utils';
     

/**
 * [useClipboard](https://hooks.pratiq.dev/docs/hooks/useClipboard)
 * 
 * Copy text to and read from the clients clipboard
 * ________________________________________________________________________
 * @param
 * | keys                  | type       | description                                              |
 * |:--                    |:--         |:--                                                       |
 * | **[initialValue]**    | `string`   | Initial value for the clipboard (optional)               |
 * | **[flashTime]**       | `number`   | The delay in ms before flash boolean reset to false      |
 * ________________________________________________________________________
 * @returns
 * | keys                  | type                       | description                                              |
 * |:--                    |:--                         |:--                                                       |
 * | **value**             | `string`                   | The current value of the clipboard                       |
 * | **copy**              | `(str:string) => boolean`  | Copy a string to the clipboard                           |
 * | **success**           | `boolean`                  | True if the value was copied successfully                |
 * | **flash**             | `boolean`                  | True if successfully copied, resets to false after `flashTime` (default: 1000ms) |
 * ________________________________________________________________________
 * @interface
 * ```
 * export namespace UseClipboard {
 *     export type Return = {
 *         value: string;
 *         copy: Function;
 *         success: boolean;
 *         flash: boolean;
 *         reset: Function;
 *     }
 *     export interface Hook {
 *         (initialValue: string, flashTime: number): Return;
 *     }
 * }
 * ```
 * ________________________________________________________________________
 * @example
 * const { copy, value, success, reset, flash } = useClipboard();
 * const codeSample = `...some code`
 * <pre onClick={() => copy(codeSample)}>{codeSample}</pre>
 */




const useClipboard: UseClipboard.Hook = (initialValue:string = '', flashTime: number = 1000): UseClipboard.Return => {
    const [value, setValue] = useState(initialValue)
    const [success, setSuccess] = useState(false)
    const [flash, setFlash] = useState(false)

    if(!isBrowser() || !navigator?.clipboard){
        console.log('no browser or clipboard:', { navigator, isBrowser: isBrowser() })
        return {
            copy: async (value: string) => false,
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


export namespace UseClipboard {
    export type Return = {
        value: string;
        copy: (value: string) => Promise<boolean>;
        success: boolean;
        flash: boolean;
        reset: Function;
    }
    export interface Hook {
        (): Return;
        (initialValue: string): Return;
        (initialValue: string, flashTime: number): Return;
    }
}



export default useClipboard