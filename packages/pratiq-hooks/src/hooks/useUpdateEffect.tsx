import { EffectCallback, useEffect, useRef } from 'react';

const useUpdateEffect = (effect: EffectCallback | (() => void), deps: any[] = []) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      // Skip the effect on mount
      isMounted.current = true;
      return;
    }
    console.log('Running update effect...')

    effect();
  }, deps);
}

export default useUpdateEffect