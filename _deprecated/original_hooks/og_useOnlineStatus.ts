import {useState, useEffect} from 'react'
    
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

const useOnlineStatus = () => {

    const [state, setState] = useState(navigator.onLine);

    const onOnlineEvent = () => {
        setState(navigator.onLine);
    };

    const onOfflineEvent = () => {
        setState(navigator.onLine);
    };

    useEffect(() => {
        window.addEventListener('online', onOnlineEvent);
        window.addEventListener('offline', onOfflineEvent);

        return () => {
        window.removeEventListener('online', onOnlineEvent);
        window.removeEventListener('offline', onOfflineEvent);
        };
    });

    return state;
    
}

export default useOnlineStatus