/**
 * [isBrowser](https://hooks.pratiq.dev/docs/utils/isBrowser)
 * 
 * Checks if the code is running in a browser environment.
 * 
 * This is a simple utility for client/server environments.
 * If you're building a UI component and want to trigger certain 
 * client-only actions after mount, setting a boolean on the 
 * first render can be more suitable. For example, this is often 
 * done for things like animations that should only trigger once a
 * component is actually in the DOM. See `@pratiq/hooks/useBrowser`
 * ________________________________________________________________________________________________________
 * @returns 
 * | keys       | type     | description                                 |
 * |:-----------|:---------|:--------------------------------------------|
 * | **boolean**| `boolean`| `true` if window is found, `false` otherwise     |
 * ________________________________________________________________________________________________________
 * 
 * @example
 * 
 * const result = isBrowser();
 * 
 * if (result) {
 *   console.log('This code is running in a browser.');
 * } else {
 *   console.log('This code is not running in a browser.');
 * }
 */

export const isBrowser = (): boolean => !!(
    typeof window !== 'undefined' 
    && window.document 
    && window.document.createElement
)