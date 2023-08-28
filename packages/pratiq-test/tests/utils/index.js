import { renderHook, act } from '@testing-library/react-hooks'
import { expect } from 'chai'
import heading from './heading'
export * from '@pratiq/hooks'
export * from 'react'

const fn = (implementation) => {
    let mockFn = function (...args) {
        mockFn.mock.calls.push(args);
        mockFn.mock.instances.push(this);
        return implementation ? implementation(...args) : undefined;
    };

    mockFn = {
        ...mockFn,
        calls: [],
        instances: [],
        mockClear: function () {
            this.calls = [];
            this.instances = [];
        },
        mockReset: function () {
            this.calls = [];
            this.instances = [];
            mockFn.mockImplementation = null;
        },
        mockImplementation: function (newImplementation) {
            implementation = newImplementation;
        },
    };

    return mockFn;
}


export {
    fn,
    renderHook,
    act,
    expect,
    heading
}