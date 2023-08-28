/**
 * [debounce](https://hooks.pratiq.dev/docs/utils/debounce)
 * 
 * Creates a debounced function that delays invoking func until after wait milliseconds have elapsed since the last time the debounced function was invoked.
 * ________________________________________________________________________________________________________
 * @param
 * | keys                      | type                         | description                           |
 * | :-------------------------|:-----------------------------| :-------------------------------------|
 * | **func**                  | `Debounce.Callback<T, R>`    | The function to debounce              |
 * | **wait**                  | `number`                     | The number of milliseconds to delay   |
 * | **[options]**             | `Debounce.Config`            | The options object (optional)         |
 * | **[options.leading]**     | `boolean`                    | Specify invoking on the leading edge  |
 * | **[options.maxWait]**     | `number`                     | Maximum time func is allowed to be delayed|
 * | **[options.trailing]**    | `boolean`                    | Specify invoking on the trailing edge |
 * ________________________________________________________________________________________________________
 * @returns 
 * | keys                        | type                          | description                           |
 * |:----------------------------|:------------------------------|:--------------------------------------|
 * | **debouncedFunction**       | `Debounce.Return<T, R>`       | The debounced function                |
 * | **debouncedFunction.cancel**| `() => void`                  | Function to cancel the delayed func call|
 * | **debouncedFunction.flush** | `() => R | undefined`         | Function to immediately invoke func  |
 * ________________________________________________________________________________________________________
 * @interface
 * ```
 * export namespace Debounce {
 *   export type Callback<T extends any[], R> = (...args: T) => R;
 *
 *   export interface Config {
 *     leading?: boolean;
 *     maxWait?: number;
 *     trailing?: boolean;
 *   }
 *   
 *   export interface Return<T extends any[], R> {
 *     (...args: T): R | undefined;
 *     cancel: () => void;
 *     flush: () => R | undefined;
 *   }
 * }
 * ```
 * ________________________________________________________________________________________________________
 * @example
 * const debouncedSave = debounce(saveData, 200);
 * 
 * function saveData(input) {
 *  // save logic
 * }
 * 
 * <button onClick={debouncedSave}>Save</button>
 */


function debounce<T extends any[], R>(
  func: Debounce.Callback<T, R>,
  wait: number,
  options?: Debounce.Config
): Debounce.Return<T, R> {
  let lastArgs: T | undefined;
  let lastThis: any;
  let maxWait: number | undefined;
  let result: R | undefined;
  let number: number | undefined;
  let lastCallTime: number | undefined;
  let lastInvokeTime = 0;
  let leading = false;
  let maxing = false;
  let trailing = true;

  if (typeof func !== 'function') {
    return {
      cancel: () => {},
      flush: () => undefined,
    } as Debounce.Return<T, R>
  }

  if (typeof options === 'object') {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? Math.max(Number(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time: number): R | undefined {
    const args = lastArgs!;
    const thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time: number): R | undefined {
    lastInvokeTime = time;
    number = setTimeout(timerExpired, wait) as unknown as number; // to avoid using NodeJS.Timeout type
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time: number): number {
    const timeSinceLastCall = time - (lastCallTime ?? 0);
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;

    return maxing ? Math.min(timeWaiting, (maxWait as number) - timeSinceLastInvoke) : timeWaiting;
  }

  function shouldInvoke(time: number): boolean {
    const timeSinceLastCall = time - (lastCallTime ?? 0);
    const timeSinceLastInvoke = time - lastInvokeTime;

    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= (maxWait as number))
    );
  }

  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    number = setTimeout(timerExpired, remainingWait(time)) as unknown as number; // to avoid using NodeJS.Timeout type
  }

  function trailingEdge(time: number): R | undefined {
    number = undefined;

    if (trailing && lastArgs) {
      return invokeFunc(time);
    }

    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (number !== undefined) {
      clearTimeout(number as number);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = number = undefined;
  }

  function flush(): R | undefined {
    return number === undefined ? result : trailingEdge(Date.now());
  }

  function debounced(...args: T): R | undefined {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);

    lastArgs = args;
    /* @ts-expect-error "`this` explicitly has an `any` type" */
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (number === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        clearTimeout(number as number);
        number = setTimeout(timerExpired, wait) as unknown as number; // to avoid using NodeJS.Timeout type
        return invokeFunc(lastCallTime);
      }
    }

    if (number === undefined) {
      number = setTimeout(timerExpired, wait) as unknown as number; // to avoid using NodeJS.Timeout type
    }

    return result;
  }

  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}




export namespace Debounce {
  export type Callback<T extends any[], R> = (...args: T) => R;
  export interface Config {
    leading?: boolean;
    maxWait?: number;
    trailing?: boolean;
  }
  export interface Return<T extends any[], R> {
    (...args: T): R | undefined;
    cancel: () => void;
    flush: () => R | undefined;
  }
}




export default debounce;