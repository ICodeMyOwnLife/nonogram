import { useState, useEffect, useCallback } from 'react';

export default function useCheat(toggleCheat: (e: KeyboardEvent) => boolean) {
  const [cheatMode, setCheatMode] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (toggleCheat(e)) {
        setCheatMode(prevHack => !prevHack);
      }
    },
    [toggleCheat],
  );

  useEffect(() => {
    window.addEventListener('keypress', handleKeyDown, false);
    return () => window.removeEventListener('keypress', handleKeyDown, false);
  }, [handleKeyDown]);

  return cheatMode;
}
