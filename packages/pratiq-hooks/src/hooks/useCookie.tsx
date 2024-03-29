import {useEffect, useState} from 'react'
import { isBrowser } from '@pratiq/utils'
import debug from 'debug'
const log = debug('@pq:useCookie')

/** 
 * [@pratiq/hooks - useCookie](https://hooks.pratiq.dev/docs/hooks/useCookie)
 * 
 */

const useCookie = (key: string, initialValue?: string) => {
    const empty = [
        null,
        () => {},
        () => {}
    ]
    if (!isBrowser()) return empty

    const [value, setValue] = useState(initialValue ?? '')

    const getCookie = () => {
        log('getCookie')
        let name = key + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                log('getCookie | return:', c.substring(name.length, c.length))
                return c.substring(name.length, c.length);
            }
        }
        log('getCookie | return: ""')
        return "";
    }


    const handleCookie = (value: string, expiration: number = 86_400_000) => {
        const d = new Date();
        d.setTime(d.getTime() + (expiration));
        let expires = "expires="+d.toUTCString();
        document.cookie = key + "=" + value + ";" + expires + ";path=/; SameSite=None; Secure;"
        setValue(getCookie)
    }



    const removeCookie = () => {
        document.cookie = key + '=; Max-Age=-99999999; path=/; SameSite=None; Secure;"'; 
        setValue(getCookie())
    }

    useEffect(()=>{
        setValue(getCookie())
    }, [])

    return [
        value, 
        handleCookie, 
        removeCookie
    ]
}

export default useCookie