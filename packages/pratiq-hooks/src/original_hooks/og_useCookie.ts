import {useState} from 'react'
import isBrowser from '../utils/isBrowser.js'
    
/**
* useClipboard()
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

const useCookie= (cookieName: string, cookieValue: string) => {
    if (!isBrowser()) return;

    const getCookie = () => {
        let name = cookieName + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }



    const [value, setValue] = useState(getCookie)


    const handleCookie = (cvalue: string, expiration: number | undefined) => {
        const d = new Date();
        d.setTime(d.getTime() + (expiration ?? 24 * 60 * 60 * 1000));
        let expires = "expires="+d.toUTCString();
        document.cookie = cookieName + "=" + cvalue + ";" + expires + ";path=/";
        setValue(getCookie)
    }



    const removeCookie = () => {
        if(getCookie() !== ''){
            document.cookie = cookieName+'=; Max-Age=-99999999;'; 
            setValue(getCookie)
        }
    }

    return [value, handleCookie, removeCookie]
}

export default useCookie