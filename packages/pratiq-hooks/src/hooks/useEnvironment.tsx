import { useEffect, useState } from 'react';

// function useEnvironment({ checkWindowObject = false } = {}) {
//     const [isClient, setIsClient] = useState(false);
//     const [isBrowser, setIsBrowser] = useState(false);

//     useEffect(() => {
//         // Check for client-side (non-SSR)
//         setIsClient(true);

//         // If configured to check for the window object, do so
//         if (checkWindowObject) {
//             setIsBrowser(typeof window === 'object');
//         }
//     }, [checkWindowObject]);

//     return checkWindowObject ? isBrowser : isClient;
// }

// // Usage for checking client-side
// const isClient = useEnvironment();

// // Usage for checking browser's window object
// const isBrowser = useEnvironment({ checkWindowObject: true });


// import { useEffect, useState } from 'react';

function useEnvironment() {
    const [environment, setEnvironment] = useState({
        hasWindow: false,
        hasDocument: false,
        isTouchDevice: false,
        isOnline: false,
        viewportSize: { width: 0, height: 0 },
        supportsCookies: false,
        prefersDarkMode: false,
        supportsGeolocation: false,
        supportsFileApi: false,
        supportsWebGL: false,
        supportsNotifications: false,
        grantedNotifications: false
    });

    useEffect(() => {
        const updateEnvironment = async () => {
            let grantedNoti = typeof navigator === 'object' 
                ? (await navigator?.permissions?.query({ name: 'geolocation' })).state === 'granted'
                    ? true
                    : false
                : false

            setEnvironment({
                hasWindow: typeof window === 'object',
                hasDocument: typeof document === 'object',
                isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
                isOnline: navigator.onLine,
                viewportSize: {
                    width: window.innerWidth,
                    height: window.innerHeight,
                },
                supportsCookies: navigator.cookieEnabled,
                prefersDarkMode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
                supportsGeolocation: 'geolocation' in navigator,
                supportsFileApi: 'FileReader' in window,
                supportsWebGL: (() => {
                    try {
                        const canvas = document.createElement('canvas');
                        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
                    } catch (e) {
                        return false;
                    }
                })(),
                supportsNotifications: 'Notification' in window,
                grantedNotifications: grantedNoti   
            });
        };

        updateEnvironment();

        // Optional: Update on specific events like resize, online/offline status change
        window?.addEventListener?.('resize', updateEnvironment);
        window?.addEventListener?.('online', updateEnvironment);
        window?.addEventListener?.('offline', updateEnvironment);

        return () => {
            window?.removeEventListener?.('resize', updateEnvironment);
            window?.removeEventListener?.('online', updateEnvironment);
            window?.removeEventListener?.('offline', updateEnvironment);
        };
    }, []);

    return environment;
}


export default useEnvironment