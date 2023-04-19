import {useState, useRef} from 'react'
    
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
    const ref = useRef<any>(null)

    return {
        ...coords,
        bind: {
            onMouseMove: function(event: any) {
                // const position = {
                //     x: event.pageX,
                //     y: event.pageY
                //   };
                
                //   const offset = {
                //     left: referenceElement.offsetLeft,
                //     top: referenceElement.offsetTop
                //   };
                
                //   let reference = referenceElement.offsetParent;
                
                //   while(reference){
                //     offset.left += reference.offsetLeft;
                //     offset.top += reference.offsetTop;
                //     reference = reference.offsetParent;
                //   }
                
                //   return { 
                //     x: position.x - offset.left,
                //     y: position.y - offset.top,
                //   }; 

                  
                // const x = e.pageX - e.currentTarget.offsetLeft; 
                // const y = e.pageY - e.currentTarget.offsetTop; 
                const x = event.clientX
                const y = event.clientY
                setCoords({ x, y });
            },
        },
    
    };
}

export default useMousePosition