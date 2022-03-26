import { useState } from 'react';
import { logger } from '../helpers';

const { localStorage } = global;

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      logger.info(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      logger.error(error);
    }
  };
  return [storedValue, setValue];
};

export default useLocalStorage;
