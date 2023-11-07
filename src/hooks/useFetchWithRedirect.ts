import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const useFetchWithRedirect = () => {
  const navigate = useNavigate();
  const fetchWithRedirect = useCallback(
    async (input: URL | RequestInfo, init?: RequestInit): Promise<Record<string, unknown>> => {
      let json: unknown = null;
      try {
        const response = await fetch(input, init);
        if (response.status === 401) {
          navigate('/login');
        }
        try {
          json = await response.json();
          if ((json as { code: number }).code === 401) {
            navigate('/login');
          }
        } catch {
          // do nothing
        }
        return new Object(json) as Record<string, unknown>;
      } catch (error) {
        console.debug(error);
        throw error;
      }
    },
    [navigate]
  );
  return fetchWithRedirect;
};

export { useFetchWithRedirect };
