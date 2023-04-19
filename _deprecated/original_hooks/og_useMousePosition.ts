import {useState} from 'react'
    
/**
* useMousePosition()
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

const useMousePosition = () => {
    const [coords, setCoords] = useState({ x: 0, y: 0 });

    return {
        ...coords,
        bind: {
        onMouseMove: (e: any) => {
            setCoords({ x: e.screenX, y: e.screenY });
        },
        },
    };
}

export default useMousePosition