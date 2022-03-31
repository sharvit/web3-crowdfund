import { useEffect, useLayoutEffect, useRef } from 'react';

/**
 * Run a method every X milliseconds
 * @param  {Function} callback               Callback to call
 * @param  {Number}   delay                  Delay in milliseconds
 */
const useInterval = (delay, callback) => {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    if (!delay) {
      return () => undefined;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
};

export default useInterval;
