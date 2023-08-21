import { useState, useEffect, SetStateAction, Dispatch } from 'react';



/**
 * [useClamp](https://hooks.pratiq.dev/docs/hooks/useClamp)
 * 
 * Clamp integer state within dynamic ranges
 * ________________________________________________________________________
 * @param
 * | type       | keys                  | description                           |
 * | :----------|:----------------------| :-------------------------------------|
 * | `object`   | **[config]**          | Config object (optional)              |
 * | `number`   | **[config.min]**      | The minimum clamping value (optional) |
 * | `number`   | **[config.max]**      | The maximum clamping value (optional) |
 * | `number`   | **[config.value]**    | The initial value to clamp (optional) |
 * 
 * @returns 
 * | type                               | keys                  | description                       |
 * | :----------------------------------|:----------------------| :---------------------------------|
 * | `object`                           | **value**             | The returned object               |
 * | `number`                           | **value**             | The clamped value                 |
 * | `Dispatch<SetStateAction<number>>` | **setValue**          | Function to set clamped value     |
 * | `() => void`                       | **reset**             | Function to reset value           |
 * | `number`                           | **min**               | Minimum clamping value            |
 * | `number`                           | **max**               | Maximum clamping value            |
 * | `Dispatch<SetStateAction<number>>` | **setMin**            | Function to set new minimum bound |
 * | `Dispatch<SetStateAction<number>>` | **setMax**            | Function to set new maximum bound |
 * | `number`                           | **initialValue**      | Initial value of the clamping     |
 * | `number`                           | **expectedValue**     | Expected value of the clamping    |
 * ________________________________________________________________________
 * @interface
 * ```
 * export namespace UseClamp {
 *   export type Config = {
 *     min?: number;
 *     max?: number;
 *     value?: number;
 *   }
 *
 *   export type Return = {
 *     value: number;
 *     setValue: Dispatch<SetStateAction<number>>;;
 *     reset: () => void;
 *     min: number;
 *     max: number;
 *     setMin: Dispatch<SetStateAction<number>>;
 *     setMax: Dispatch<SetStateAction<number>>;
 *     initialValue: number;
 *     expectedValue: number;
 *   }
 *
 *   export interface Hook {
 *     (config: Config): Return;
 *   }
 * }
 * ```
 * ________________________________________________________________________
 * @example
 * const clamp = useClamp({ min: 1, max: 10, value: 5 })
 * <button onClick={() => clamp.setValue(12)}>Clamp Value</button>
 */


const useClamp: UseClamp.Hook = (config: UseClamp.Config = {}): UseClamp.Return => {
    // Deconstruct values from config with default values
    const { min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER, value = 0 } = config;

    const [stateMin, setMinState] = useState(min);
    const [stateMax, setMaxState] = useState(max);
    const [expectedValue, setExpectedValue] = useState(value);

    // Function to calculate the clamped value based on min, max, and expected value
    const clampValue = (value: number) => {
        return Math.min(Math.max(value, stateMin), stateMax);
    };

    const [clampedValue, setClampedValue] = useState(() => clampValue(expectedValue));

    const handleClamp = (cb: SetStateAction<number>) => {
        let res = typeof cb === 'function' ? cb(clampedValue) : cb;
        setExpectedValue(res);
        setClampedValue(clampValue(res));
    }

    useEffect(() => {
        setClampedValue(clampValue(expectedValue));
    }, [expectedValue, stateMin, stateMax]);

    useEffect(() => setMinState(min), [min]);
    useEffect(() => setMaxState(max), [max]);
    useEffect(() => setExpectedValue(value), [value]);

    // Function to reset the value to its initial state
    const reset = () => {
        setExpectedValue(value);
        setClampedValue(clampValue(value));
    };

    return {
        value: clampedValue,
        setValue: handleClamp,
        reset,
        min: stateMin,
        max: stateMax,
        setMin: setMinState, // Function to set a new minimum bound
        setMax: setMaxState, // Function to set a new maximum bound
        initialValue: value,
        expectedValue,
    };
};


export namespace UseClamp {
    export type Config = {
        min?: number;
        max?: number;
        value?: number;
    }

    export type Return = {
        value: number;
        setValue: Dispatch<SetStateAction<number>>;
        reset: () => void;
        min: number;
        max: number;
        setMin: Dispatch<SetStateAction<number>>;
        setMax: Dispatch<SetStateAction<number>>;
        initialValue: number;
        expectedValue: number;
    }

    export interface Hook {
        (config: Config): Return;
    }
}

export default useClamp;
