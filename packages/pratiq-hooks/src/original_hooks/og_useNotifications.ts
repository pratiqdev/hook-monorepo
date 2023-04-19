import {useState} from 'react'

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

const useNotifications = (options?: object) => {
    const [perm, setPerm] = useState(Notification.permission)
    let avail = typeof window !== 'undefined' && "Notification" in window ? true : false

    const requestNotifications = () => {
        avail && Notification.requestPermission()
                .then(permission => {
                    setPerm(permission)
                })
    }

    const sendNotification = (text: string) => {
        if (perm === 'granted' && avail) {
            new Notification(text, options && options);
        } 
        else if(perm !== 'denied' && avail){
            Notification.requestPermission()
                .then(permission => {
                    setPerm(permission)
                    sendNotification(text) 
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