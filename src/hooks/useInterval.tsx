import { useEffect, useRef } from 'react';

export default function useInterval(callback: VoidFunction, period: number) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    const intervalId = setInterval(callbackRef.current, period);
    return () => clearInterval(intervalId);
  }, [period]);

  useEffect(() => {
    debugger;
    callbackRef.current = callback;
  }, [callback]);
}
