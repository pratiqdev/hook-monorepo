
const E_Tags = {
    collection: 'collection',
    time: 'time',
    data: 'data',
    storage: 'storage',
    device: 'device',
    state: 'state',
    effect: 'effect',
    components: 'components',
}


const data = {
    
    useStateArray:{
        title: 'useStateArray',
        description:'Manage array state with common state altering methods.',
        tags: [E_Tags.collection, ]
    },

    useStateMap: {
        title: 'useStateMap',
        description: 'Manage ESMap objects with common state altering methods',
        tags: [E_Tags.collection]
    },

    useStateSet: {
        title: 'useStateSet',
        description: 'Manage ESSet objects with common state altering methods',
        tags: [E_Tags.collection]
    },
    
    useAsync: {
        title: 'useAsync',
        description: 'Run an async function and access internal loading and error state',
        tags: [E_Tags.effect]
    },
    
    useClamp: {
        title: 'useClamp',
        description: 'Clamp numerical values within the provided range',
        tags: [E_Tags.state]
    },

    useClickOutside: {
        title: 'useClickOutside',
        description: 'Listen for click events outside the boundary of an element',
        tags: [E_Tags.device]
    },

    useClipboard: {
        title: 'useClipboard',
        description: 'Copy and paste using the clients clipboard',
        tags: [E_Tags.device]
    },

    useCookie: {
        title: 'useCookie',
        description: 'Manage and store cookies in state',
        tags: [E_Tags.device]
    },
    
    useCountdown: {
        title: 'useCountdown',
        description: 'Run a countdown timer with state and optional callbacks ',
        tags: [E_Tags.time]
    },
    
    useDebounceEffect: {
        title: 'useDebounceEffect',
        description: 'Use effect with a debounced callback',
        tags: [E_Tags.effect]
    },
    
    useDynamic: {
        title: 'useDynamic',
        description: 'Dynamically load components with built-in pagination and navigation controls',
        tags: [E_Tags.components]
    },
    
    useErrorBoundary: {
        title: 'useErrorBoundary',
        description: 'Wrap components in an error boundary and render a fallback component on error.',
        tags: [E_Tags.components]
    },
    
    useEventListener: {
        title: 'useEventListener',
        description: 'Use event listeners that automatically register and unregister on component mount',
        tags: [E_Tags.device]
    },
    
    useFetch: {
        title: 'useFetch',
        description: 'Manage fetch requests with loading and error state',
        tags: [E_Tags.effect]
    },
    
    useGeolocation: {
        title: 'useGeolocation',
        description: 'Get up-to-date location data from the client device, set to react-state',
        tags: [E_Tags.device]
    },
    
    usePerformance:  {
        title: 'usePerformance',
        description: 'Track the performance stats of rapid-fire events',
        tags: [E_Tags.device]
    },
    
    useInput: {
        title: 'useInput',
        description: 'Store and manage complex objects in client-side storage using IndexedDB',
        tags: [E_Tags.components]
    },
    
    useInterval: {
        title: 'useInterval',
        description: 'Run a callback on an interval with automatic removal on component unmount',
        tags: [E_Tags.time]
    },
    
    useKeyboard: {
        title: 'useKeyboard',
        description: 'Easy access to keyboard events with built-in combo handling',
        tags: [E_Tags.device]
    },
    
    useMediaQuery: {
        title: 'useMediaQuery',
        description: 'Register multiple media queries for handling complex layouts.',
        tags: [E_Tags.device]
    },
    
    useMousePosition: {
        title: 'useMousePosition',
        description: 'Get the current coordinates of the cursor in the window or a selected element',
        tags: [E_Tags.device]
    },
    
    useNotifications: {
        title: 'useNotifications',
        description: 'Send notifications to the client device for info, status updates, alerts or anything!',
        tags: [E_Tags.device]
    },
    
    useIDB: {
        title: 'useIDB',
        description: 'Store and manage complex objects in client-side storage using IndexedDB',
        tags: [E_Tags.storage]
    },
    
    useStateWithHistory: {
        title: 'useStateWithHistory',
        description: 'Send notifications to the client device for info, status updates, alerts or anything!',
        tags: [E_Tags.state]
    },
    
    useStateWithValidation: {
        title: 'useStateWithValidation',
        description: 'Automatically validate and store the last valid value',
        tags: [E_Tags.state]
    },
    
    useTemperature: {
        title: 'useTemperature',
        description: 'Display temperature units with built-in conversions',
        tags: [E_Tags.state]
    },
    useWindow: {
        title: 'useWindow',
        description: 'Get info about the current windows size, rotation scroll depth, mouse position and more',
        tags: [E_Tags.device]
    }

    
}


module.exports = data