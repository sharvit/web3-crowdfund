import { useEffect } from 'react';

const useConnectionEvents = (connection, events = {}) =>
  useEffect(() => {
    if (!connection || !events) return () => undefined;

    Object.entries(events).forEach(([name, callback]) => {
      connection.on(name, callback);
    });

    return () => {
      Object.entries(events).forEach(([name, callback]) => {
        connection.removeListener(name, callback);
      });
    };
  }, [connection, events]);

export default useConnectionEvents;
