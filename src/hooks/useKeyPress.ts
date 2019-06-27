import { useRef, useEffect, useCallback } from 'react';

export default function useKeyPress(handler: (e: KeyboardEvent) => void) {
  const handlerRef = useRef(handler);
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    handlerRef.current && handlerRef.current(e);
  }, []);

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);
}
