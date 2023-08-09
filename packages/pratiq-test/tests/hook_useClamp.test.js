/**
 * @jest-environment jsdom
 */
import { useClamp, renderHook, act, expect, heading, useState } from './utils'



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
        expect(hook.min).to.be.undefined
        expect(hook.max).to.be.undefined

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

    


})
