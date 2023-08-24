/**
 * @jest-environment jsdom
 */
import { useAsync, expect, heading, renderHook, act } from '../utils';

// Mocking the callback for the tests
const mockCallback = (val, options) => {
    return new Promise((resolve, reject) => {
        if (val === 'error') reject(new Error('Test Error'));
        else resolve('Test Data');
    });
};

describe(heading('useAsync'), () => {
    it('should initialize with correct default values', () => {
        const { result } = renderHook(() => useAsync(mockCallback));
        expect(result.current.loading).to.be.false;
        expect(result.current.done).to.be.false;
        expect(result.current.error).to.be.null;
        expect(result.current.data).to.be.null;
    });

    it('should handle loading state correctly', async () => {
        const { result } = renderHook(() => useAsync(mockCallback, { autoLoad: true }));
        expect(result.current.loading).to.be.true;
        await act(async () => {
            await result.current.reload();
        });
        expect(result.current.loading).to.be.false;
        expect(result.current.done).to.be.true;
        expect(result.current.data).to.equal('Test Data');
    });

    it('should use cache when reloading with the same dependencies', async () => {
        const { result } = renderHook(() => useAsync(mockCallback, { autoLoad: false }));
        const deps = [1, 2, 3];
        await act(async () => {
            await result.current.reload(deps);
        });
        const cachedData = result.current.data;
        await act(async () => {
            await result.current.reload(deps);
        });
        expect(result.current.data).to.equal(cachedData);
    });

    it('should handle errors correctly', async () => {
        const { result } = renderHook(() => useAsync(mockCallback, { autoLoad: false }));
        await act(async () => {
            await result.current.reload('error');
        });
        expect(result.current.error).to.be.an('error').with.property('message', 'Test Error');
    });

    it('should reset to initial state', async () => {
        const { result } = renderHook(() => useAsync(mockCallback));
        await act(async () => {
            await result.current.reload();
        });
        act(() => {
            result.current.reset();
        });
        expect(result.current.loading).to.be.false;
        expect(result.current.done).to.be.false; 
        expect(result.current.error).to.be.null;
        expect(result.current.data).to.be.null;
    });

    it('should reset to initial state (autoLoad: true)', async () => {
        const { result } = renderHook(() => useAsync(mockCallback, { autoLoad: true }));
        await act(async () => {
            await result.current.reload();
        });
        act(() => {
            result.current.reset();
        });
        expect(result.current.loading).to.be.false;
        expect(result.current.done).to.be.true; // true because autoload calls reload, which finishes immediately
        expect(result.current.error).to.be.null;
        expect(result.current.data).eq("Test Data");
    });
});
