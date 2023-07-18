/**
 * @jest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react-hooks'
import { expect } from 'chai'
import { useClamp } from '@pratiq/hooks'



//+ describe what this group is testing
describe('1. config and initial values', () => {

    //+ describe the test case
    test('A. should allow undefined config', () => {

        //+ 
        const { result, rerender } = renderHook((propObj) => useClamp(propObj), {
            initialProps: { 
                min: 0,
                max: 100,
                value: 0
             }
        })

        expect(result.current.value).eq(0)


        rerender({ 
            min: 0,
            max: 100,
            value: 10
        })

        act(() => {
            result.current.setValue(1)
        })

        expect(result.current.value).eq(1)

    })

})
