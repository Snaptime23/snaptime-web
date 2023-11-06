import { useNavigate } from 'react-router-dom';

const useFetchWithRedirect = () => {
  const navigate = useNavigate();
  const fetchWithRedirect = async (input: URL | RequestInfo, init?: RequestInit): Promise<Response> => {
    try {
      const response = await fetch(input, init);
      if (response.status === 401) {
        navigate('/login');
      }
      try {
        const json = (await response.json()) as { code: number };
        if (json.code === 401) {
          navigate('/login');
        }
      } catch {
        // do nothing
      }
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return fetchWithRedirect;
};

export { useFetchWithRedirect };
