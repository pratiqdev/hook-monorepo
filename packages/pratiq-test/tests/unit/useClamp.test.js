/**
 * @jest-environment jsdom
 */

import { useClamp, renderHook, act, expect, heading, useState } from '../utils'


//+ describe what this group is testing
describe(heading('useClamp'), () => {
    
    test('1. Provides a hook', async () => {
        expect(typeof useClamp).eq('function')
    })

    test('2. Allows undefined config', async () => {

        const { result } = renderHook(() => useClamp())
        const hook = result.current

        // assert types
        expect(typeof hook.value).eq('number')
        expect(typeof hook.initialValue).eq('number')
        expect(typeof hook.setValue).eq('function')
        expect(typeof hook.reset).eq('function')
        expect(hook.min).eq(Number.MIN_SAFE_INTEGER)
        expect(hook.max).eq(Number.MAX_SAFE_INTEGER)

        expect(hook.value).eq(0)
        expect(hook.initialValue).eq(0)
        // expect(hook.setValue).eq('function')
        // expect(reset).eq('function')
    })

    test('3. Sets correct initial values', async () => {

        //+ 
        const { result, rerender, waitForNextUpdate } = renderHook((propObj) => useClamp(propObj), {
            initialProps: { 
                min: 1,
                max: 3,
                value: 2
             }
        })

        expect(result.current.value).eq(2)
        expect(result.current.min).eq(1)
        expect(result.current.max).eq(3)


        rerender({ 
            min: 100,
            max: 300,
            value: 200
        })

        // await waitForNextUpdate()

        
        expect(result.current.value).eq(200)
        expect(result.current.min).eq(100)
        expect(result.current.max).eq(300)
            
    })

    test('4. Updates values when config.min state changes', async () => {
        // Define the wrapper component that includes the state
        const useTestClampMin = (initialMin) => {
            const [stateMin, setStateMin] = useState(initialMin);
            const clampConfig = useClamp({
                min: stateMin,
                value: 2,
                max: 3,
            });

            return { ...clampConfig, setStateMin };
        };

        // Define the renderHook setup
        const { result } = renderHook(() => useTestClampMin(1));

        act(() => {
            result.current.setStateMin(3); // Update the stateMin value
        });

        expect(result.current.value).eq(3);
    });

    test('5. Updates values when config.max state changes', async () => {
        // Define the wrapper component that includes the state
        const useTextClampMax = (initialMax) => {
            const [stateMax, setStateMax] = useState(initialMax);
            const clampConfig = useClamp({
                min: 1,
                value: 2,
                max: stateMax,
            });

            return { ...clampConfig, setStateMax };
        };

        // Define the renderHook setup
        const { result } = renderHook(() => useTextClampMax(1));

        act(() => {
            result.current.setStateMax(1); // Update the stateMin value
        });

        expect(result.current.value).eq(1);
    });

    test('6. Updates values when config.value state changes', async () => {
        // Define the wrapper component that includes the state
        const useTextClampValue = (initialValue) => {
            const [stateValue, setStateValue] = useState(initialValue);
            const clampConfig = useClamp({
                min: 1,
                value: stateValue,
                max: 5,
            });

            return { ...clampConfig, setStateValue };
        };

        // Define the renderHook setup
        const { result } = renderHook(() => useTextClampValue(1));

        act(() => {
            result.current.setStateValue(3); // Update the stateMin value
        });

        expect(result.current.value).eq(3);
    });

    test('7. Min setter method updates min and clamped value', async () => {
        // Define the wrapper component that includes the state
        const useTestClampMin = (initialMin) => {
            const [stateMin, setStateMin] = useState(initialMin);
            const clampConfig = useClamp({
                min: stateMin,
                value: 2,
                max: 3,
            });

            return { ...clampConfig, setStateMin };
        };

        // Define the renderHook setup
        const { result } = renderHook(() => useTestClampMin(1));

        act(() => {
            result.current.setStateMin(3); // Update the stateMin value
        });

        expect(result.current.value).eq(3);

        act(() => {
            result.current.setMin(0)
        })

        expect(result.current.min).eq(0)
        expect(result.current.value).eq(2)
    });

    test('8. Max setter method updates max and clamped value', async () => {
        // Define the wrapper component that includes the state
        const useTextClampMax = (initialMax) => {
            const [stateMax, setStateMax] = useState(initialMax);
            const clampConfig = useClamp({
                min: 1,
                value: 2,
                max: stateMax,
            });

            return { ...clampConfig, setStateMax };
        };

        // Define the renderHook setup
        const { result } = renderHook(() => useTextClampMax(1));

        act(() => {
            result.current.setStateMax(1); // Update the stateMin value
        });

        expect(result.current.value).eq(1);

        act(() => {
            result.current.setMax(3)
        })

        expect(result.current.max).eq(3)
        expect(result.current.value).eq(2)
    });


    test('9. Value setter method updates expected and clamped value', async () => {

        // Define the wrapper component that includes the state
        const useTextClampValue = (initialValue) => {
            const [stateValue, setStateValue] = useState(initialValue);
            const clampConfig = useClamp({
                min: 1,
                value: stateValue,
                max: 5,
            });

            return { ...clampConfig, setStateValue };
        };

        // Define the renderHook setup
        const { result } = renderHook(() => useTextClampValue(1));

        act(() => {
            result.current.setStateValue(3); // Update the stateMin value
        });

        expect(result.current.value).eq(3);

        act(() => {
            result.current.setValue(7)
        })

        expect(result.current.expectedValue).eq(7)
        expect(result.current.value).eq(5)

    })


    // Test case when useExpected is set to false (default case)
    it('10. should use clampedValue when useExpected is false', () => {
        const { result } = renderHook(() => useClamp({ min: 0, max: 10, value: 5 }));
        expect(result.current.value).eq(5);

        act(() => {
            result.current.setValue(12); // set to a value greater than max
        });

        expect(result.current.value).eq(10); // Should be clamped to max
        expect(result.current.expectedValue).eq(12); // Should be set to provided val

        act(() => {
            result.current.setValue(-2); // set to a value smaller than min
        });

        expect(result.current.value).eq(0); // Should be clamped to min
        expect(result.current.expectedValue).eq(-2); // Should be set to provided val

        act(() => {
            // set to a value greater than max
            result.current.setValue(20);
        });

        // Should not be clamped
        expect(result.current.expectedValue).eq(20);
        // Should still be clamped for output
        expect(result.current.value).eq(10);

        act(() => {
            // set to a value greater than max
            result.current.setValue(n => n - 1);
        });

        // Should use value for cb
        expect(result.current.expectedValue).eq(9);

        // unchanged because cb used value(10 => 10 - 1) = 9 instead of expected(20 => 20 - 1) = 19
        expect(result.current.value).eq(9); 

    });

    // Test case when useExpected is set to true
    it('11. should use expectedValue when useExpected is true', () => {
        const { result } = renderHook(() => useClamp({ min: 0, max: 10, value: 5, useExpected: true }));
        expect(result.current.value).eq(5);

        act(() => {
            // set to a value greater than max
            result.current.setValue(20); 
        });

        // Should not be clamped
        expect(result.current.expectedValue).eq(20); 
        // Should still be clamped for output
        expect(result.current.value).eq(10); 

        act(() => {
            // set to a value greater than max
            result.current.setValue(n => n - 1); 
        });

        // Should use expectedValue for cb
        expect(result.current.expectedValue).eq(19); 
        
        // unchanged because cb used expected(20 => 20 - 1) = 19 instead of value(10 => 10 - 1) = 9
        expect(result.current.value).eq(10); 
    });

    // You can also test other functionalities (e.g., reset, setMin, setMax) in relation to useExpected here





})
