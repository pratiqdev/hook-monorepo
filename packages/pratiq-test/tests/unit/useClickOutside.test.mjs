/**
 * @jest-environment jsdom
 */

import { useClickOutside, renderHook, act, heading, useState, } from '../utils'
import { jest, expect } from '@jest/globals'

describe('useClickOutside', () => {


    let container= null;

    // Create a mock callback function for each test
    const mockCallback = jest.fn();

    beforeEach(() => {
        mockCallback.mockClear();
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
    });

    // Test 1: Basic Case
    test('should call the callback when clicking outside the element', () => {
        const { result } = renderHook(() => useClickOutside(mockCallback));

        const div = document.createElement('div');
        act(() => {
            result.current(div);
        });

        act(() => {
            container.click();
        });

        expect(mockCallback).toHaveBeenCalled();
    });

    // Test 2: Multiple Elements
    test('should call the callback when clicking outside multiple elements', () => {
        const { result } = renderHook(() => useClickOutside(mockCallback));

        const div1 = document.createElement('div');
        const div2 = document.createElement('div');
        act(() => {
            result.current(div1);
            result.current(div2);
        });

        act(() => {
            container.click();
        });

        expect(mockCallback).toHaveBeenCalled();
    });

    // Test 3: Inside Click
    test('should not call the callback when clicking inside the element', () => {
        const { result } = renderHook(() => useClickOutside(mockCallback));

        const div = document.createElement('div');
        act(() => {
            result.current(div);
        });

        act(() => {
            div.click();
        });

        expect(mockCallback).not.toHaveBeenCalled();
    });

    // Test 4: Element Removal
    test('should still call the callback after element removal', () => {
        const { result } = renderHook(() => useClickOutside(mockCallback));

        const div = document.createElement('div');
        act(() => {
            result.current(div);
        });

        act(() => {
            result.current(null);
            container.click();
        });

        expect(mockCallback).toHaveBeenCalled();
    });

    // Test 5: No Browser Environment
    test('should handle non-browser environment gracefully', () => {
        // Assuming you've implemented isBrowser in your hook
        jest.mock('@pratiq/utils', () => {
            isBrowser: () => false
        });

        const { result } = renderHook(() => useClickOutside(mockCallback));

        expect(result.current).toBeDefined(); // Should not crash
    });
});
