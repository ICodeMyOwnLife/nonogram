import { useEffect, useRef } from 'react';

export default function useInterval(
  callback: VoidFunction,
  period: number,
  running = true,
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (running) {
      intervalId = setInterval(() => callbackRef.current(), period);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [period, running]);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
}
