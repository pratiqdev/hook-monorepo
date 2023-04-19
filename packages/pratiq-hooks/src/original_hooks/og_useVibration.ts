import {useState} from 'react'
  
export type Vibrate = number | number[];

export const defaultValue: Vibrate = 200;


/**
 * useVibration()
 * ---
 * 
 * Save array in state and use common methods to update the array state
 * 
 * @param {array} initialValue
 * @returns array, array functions
 * 
 * @example
 * 
 */


const useVibration = (_default: Vibrate = defaultValue) => {
  const [available, setAvailable] = useState(false)
  "vibrate" in Navigator && setAvailable(true)

  const vibrate = (value: Vibrate = _default) => navigator.vibrate(value);

  return [vibrate, available];
};

export default useVibration;