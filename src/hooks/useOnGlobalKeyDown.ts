import { useEffect } from 'react';

function useOnGlobalKeyDown(handler: (event: KeyboardEvent) => void) {
  useEffect(() => {
    const eventHandler = (e: KeyboardEvent) => {
      if (e.repeat) return;
      handler(e);
    };
    document.body.addEventListener('keydown', eventHandler, { passive: true });
    return () => {
      document.body.removeEventListener('keydown', eventHandler);
    };
  }, [handler]);
}

export { useOnGlobalKeyDown };
