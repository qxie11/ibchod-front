import { useRef } from 'react';

/**
 * Hook to determine if it's the first render of the component
 * @returns {boolean} true if it's the first render, false otherwise
 */
export function useIsFirstRender(): boolean {
  const isFirstRender = useRef(true);

  if (isFirstRender.current) {
    isFirstRender.current = false;
    return true;
  }

  return false;
}
