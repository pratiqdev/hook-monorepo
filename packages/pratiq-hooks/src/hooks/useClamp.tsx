import { useState, useEffect, SetStateAction, Dispatch } from 'react';



/**
 * [useClamp](https://hooks.pratiq.dev/docs/hooks/useClamp)
 * 
 * Clamp integer state within dynamic ranges
 * ________________________________________________________________________________________________________
 * @param
 * | keys                      | type       | description                           |
 * | :-------------------------|:-----------| :-------------------------------------|
 * | **[config]**              | `object`   | Config object (optional)              |
 * | **[config.min]**          | `number`   | The minimum clamping value (optional) |
 * | **[config.max]**          | `number`   | The maximum clamping value (optional) |
 * | **[config.value]**        | `number`   | The initial value to clamp (optional) |
 * | **[config.useExpected]**  | `boolean`  | Pass the expected value to the state setter callback (optional, default false) |
 * ________________________________________________________________________________________________________
 * @returns 
 * | keys                        | type                               | description                       |
 * |:----------------------------|:-----------------------------------|:----------------------------------|
 * | **clamp**                   | `object`                           | The returned object               |
 * | **clamp.value**             | `number`                           | The clamped value                 |
 * | **clamp.setValue**          | `Dispatch<SetStateAction<number>>` | Function to set clamped value     |
 * | **clamp.reset**             | `() => void`                       | Function to reset value           |
 * | **clamp.min**               | `number`                           | Minimum clamping value            |
 * | **clamp.max**               | `number`                           | Maximum clamping value            |
 * | **clamp.setMin**            | `Dispatch<SetStateAction<number>>` | Function to set new minimum bound |
 * | **clamp.setMax**            | `Dispatch<SetStateAction<number>>` | Function to set new maximum bound |
 * | **clamp.initialValue**      | `number`                           | Initial value of the clamping     |
 * | **clamp.expectedValue**     | `number`                           | Expected value of the clamping    |
 * ________________________________________________________________________________________________________
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
 *     setValue: Dispatch<SetStateAction<number>>;
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
 * ________________________________________________________________________________________________________
 * @example
 * const clamp = useClamp({ 
 *  min: 1, 
 *  max: 10, 
 *  value: 5,
 *  useExpected: true
 * })
 * 
 * <button onClick={() => clamp.setValue(12)}>Clamp Value</button>
 */


const useClamp: UseClamp.Hook = (config: UseClamp.Config = {}): UseClamp.Return => {
    // Deconstruct values from config with default values
    const { 
        min = Number.MIN_SAFE_INTEGER, 
        max = Number.MAX_SAFE_INTEGER, 
        value = 0,
        useExpected = false
    } = config;

    const [stateMin, setMinState] = useState(min);
    const [stateMax, setMaxState] = useState(max);
    const [expectedValue, setExpectedValue] = useState(value);

    // Function to calculate the clamped value based on min, max, and expected value
    const clampValue = (value: number) => {
        return Math.min(Math.max(value, stateMin), stateMax);
    };

    const [clampedValue, setClampedValue] = useState(() => clampValue(expectedValue));

    const setValue = (cb: SetStateAction<number>) => {
        setExpectedValue(v => typeof cb === 'function' ? cb(useExpected ? v : clampedValue) : cb);
        setClampedValue(v => clampValue(typeof cb === 'function' ? cb(useExpected ? expectedValue : v) : cb));
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
        setValue,
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
        useExpected?: boolean;
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
