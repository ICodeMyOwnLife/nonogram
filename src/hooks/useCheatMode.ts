import { useState, useEffect, useCallback, useRef } from 'react';

export default function useCheatMode(toggleCheat: (e: KeyboardEvent) => boolean) {
  const [cheatMode, setCheatMode] = useState(false);
  const toggleCheatRef = useRef(toggleCheat);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (toggleCheatRef.current(e)) {
      setCheatMode(prevCheatMode => !prevCheatMode);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keypress', handleKeyDown, false);
    return () => window.removeEventListener('keypress', handleKeyDown, false);
  }, [handleKeyDown]);

  useEffect(() => {
    toggleCheatRef.current = toggleCheat;
  }, [toggleCheat]);

  return cheatMode;
}
