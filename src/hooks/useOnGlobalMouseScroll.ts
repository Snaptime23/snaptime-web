import { useEffect } from 'react';

function useOnGlobalMouseScroll(handler: (event: KeyboardEvent) => void) {
  useEffect(() => {
    document.addEventListener('scroll', handler);
    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [handler]);
}

export { useOnGlobalMouseScroll };
