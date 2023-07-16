/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react-hooks'
import { expect } from 'chai'
import { useClamp } from '@pratiq/hooks'

// console.log('SIMPLE TEST')
describe('1. config and initial values', () => {

    test('A. should allow undefined config', () => {

        

        const { result } = renderHook(() => useClamp())
        const hook = result.current

        // assert types
        expect(typeof hook.value).eq('number')
        expect(typeof hook.initialValue).eq('number')
        expect(typeof hook.setValue).eq('function')
        expect(typeof hook.reset).eq('function')
        expect(hook.min).to.be.null
        expect(hook.max).to.be.null

        expect(hook.value).eq(0)
        expect(hook.initialValue).eq(0)
        // expect(hook.setValue).eq('function')
        // expect(reset).eq('function')
    })

    // test('B. should use provided config', () => {

    //     const config = {
    //         min: 0,
    //         max: 10,
    //         value: 2,
    //     }

    //     const { result } = renderHook(() => useClamp(config))
    //     const hook = result.current

    //     // assert types
    //     expect(typeof hook.value).eq('number')
    //     expect(typeof hook.setValue).eq('function')
    //     expect(typeof hook.reset).eq('function')
    //     expect(typeof hook.min).eq('number')
    //     expect(typeof hook.max).eq('number')
    //     expect(typeof hook.initialValue).eq('number')

    //     expect(hook.value).eq(config.value)
    //     expect(hook.initialValue).eq(config.value)
    //     expect(hook.min).eq(config.min)
    //     expect(hook.max).eq(config.max)
    //     // expect(hook.setValue).eq('function')
    //     // expect(reset).eq('function')
    // })

    // test('C. should reject or ignore incorrect types and values', () => {

    //     const { result1 } = renderHook(() => useClamp({
    //         min: () => {},
    //         max: () => {}
    //     }))
    //     const hook = result1.current
    //     expect(hook.min).to.be.null
    //     expect(hook.max).to.be.null

    //     const { result2 } = renderHook(() => useClamp({
    //         min: undefined,
    //         max: 'forty-two'
    //     }))
    //     const hook2 = result2.current
    //     expect(hook2.min).to.be.null
    //     expect(hook2.max).to.be.null

    //     const { result3 } = renderHook(() => useClamp({
    //         min: false,
    //         max: true,
    //     }))
    //     const hook3 = result3.current
    //     expect(hook3.min).to.be.null
    //     expect(hook3.max).to.be.null

    // })

})
