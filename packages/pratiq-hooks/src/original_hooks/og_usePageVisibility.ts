import {useState, useEffect} from 'react'
import isBrowser from '../utils/isBrowser.js'
    
/**
* usePageVisibility()
* ---
* 
* Determine if page is currently visible
* 
* @returns boolean true if page is visible

* @example
* const isVisible = usePageVisibility()
* 
*/



const usePageVisibility = () => {
  if(!isBrowser()) return;

  const [state, setState] = useState({
    hidden: document.hidden,
    visibilityState: document.visibilityState,
});

  const onVisibilityChangeEvent = (event: any) => {
    setState({
      hidden: document.hidden,
      visibilityState: document.visibilityState,
    });
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', onVisibilityChangeEvent);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChangeEvent);
    };
  }, []);

  return state;
}

export default usePageVisibility