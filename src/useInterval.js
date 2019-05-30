import { useRef, useEffect } from 'react';

function useInterval(callback, delay) {
  
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null && delay !== undefined) {
      let id = setInterval(tick, delay);
      return () => { console.log("clear", id); clearInterval(id); }
    }
  }, [delay]);
}

export default useInterval;