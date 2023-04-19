import {useState} from 'react'
//@ts-expect-error
import isBrowser from '../utils/isBrowser'

export type I_UseNotificationOptions = {// example
    title?: string;                     // 'Welcome!'
    dir?: string;                       // 'rtl'
    lang?: string;                      // 'en:US'
    badge?: string;                     //  'path/to/image' ?
    body?: string;                      // 'This is the notification body!'
    tag?: string;                       // 'tag' ?
    icon?: string;                      // 'image-url-string'
    image?: string;                     // 'image-url-string'
    data?: any;                         // { some: 'data' }
    vibrate?: boolean;                  // true
    renotify?: boolean;                 // false
    requireInteraction?: boolean;       // true
    actions?: I_ActionObject[];         // [ { action:'', title:'', icon:'' },  ]       
    silent?: boolean;                   // false
}

export type I_ActionObject = {
    action: string;
    title: string;
    icon: string;
}

export type I_UseNotificationReturn = {
    notify: Function; 
    request: Function;
    available: boolean; 
    permission: string;
}

export type T_UseNotifications = (options?: I_UseNotificationOptions) => I_UseNotificationReturn;


/**
* useNotification()
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
const optionDefaults = {
    title: 'NOTIFICATION-TITLE',
    body: 'NOTIFICATION-BODY'
}


const useNotifications: T_UseNotifications = (options: I_UseNotificationOptions = {}) => {
    Object.assign(optionDefaults, options)
    const empty = {
        notify: () => {},
        request: () => {},
        available: false,
        permission: 'null',
    }
    if(!isBrowser() || typeof Notification === 'undefined') return empty;

    const [perm, setPerm] = useState(Notification.permission)
    let avail = typeof window !== 'undefined' && "Notification" in window ? true : false

    const requestNotifications = () => {
        avail && Notification.requestPermission()
                .then(permission => {
                    setPerm(permission)
                })
    }

    const sendNotification = (_options: I_UseNotificationOptions = {}) => {
        let tempOpt = Object.assign({...options}, _options)
        if (perm === 'granted' && avail) {
            //@ts-ignore
            new Notification(tempOpt.title, tempOpt);
        } 
        else if(perm !== 'denied' && avail){
            Notification.requestPermission()
                .then(permission => {
                    setPerm(permission)
                    sendNotification()
                })
        }
        else {
            return;
        }
    };

    return {
        notify: sendNotification, 
        request: requestNotifications, 
        available: avail, 
        permission: perm
    }
};

export default useNotifications