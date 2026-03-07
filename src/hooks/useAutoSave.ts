import { useEffect } from 'react';

export function useAutosave(callback: () => void, deps: unknown[]) {
  useEffect(() => {
    const t = setTimeout(() => callback(), 500);
    return () => clearTimeout(t);
  }, deps);
}
