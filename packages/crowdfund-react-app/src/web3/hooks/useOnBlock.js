import { useEffect, useLayoutEffect, useRef } from 'react';

/**
 * Run a method on every new block
 * @param  {Object}   provider                      Network provider
 * @param  {Function} callback                      Callback method
 * @param  {Array}    [conditions=[]]               Conditions to consider
 */
const useOnBlock = (provider, callback, conditions = []) => {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!provider) {
      return () => undefined;
    }
    for (let i = 0; i < conditions.length; i += 1) {
      if (!conditions[i]) return () => undefined;
    }

    provider.on('block', savedCallback.current);

    return () => provider.off('block', savedCallback.current);
  }, [provider, ...conditions]); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useOnBlock;
