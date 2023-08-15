import { useState, useEffect, SetStateAction } from 'react';

export type UseClampConfig = {
    min?: number;
    max?: number;
    value?: number;
}

export type UseClampReturn = {
    value: number;
    setValue: (cb: SetStateAction<number>) => void;
    reset: () => void;
    min: number;
    max: number;
    setMin: (min: number) => void;
    setMax: (max: number) => void;
    initialValue: number;
    expectedValue: number;
}

const useClamp = (config: UseClampConfig = {}): UseClampReturn => {
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

export default useClamp;
