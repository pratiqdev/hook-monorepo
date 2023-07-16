/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react-hooks'
import { expect } from 'chai'
import { useClamp } from '@pratiq/hooks'

console.log('SIMPLE TEST')

test('should use counter', () => {
    const { result } = renderHook(() => useClamp({
        min: 0,
        max: 10,
        value: 2,
    }))

    const {value, setValue, reset} = result.current

    expect(value).eq(0)
    expect(typeof setValue).eq('function')
})