import { useCallback } from 'react';
import { useFetchWithRedirect } from '../../hooks/useFetchWithRedirect.ts';
import { baseUrl } from '../config.ts';

const url = baseUrl + '/api/video/upload/meta';

const useCompleteMeta = () => {
  const fetchWithRedirect = useFetchWithRedirect();
  const completeMeta = useCallback(
    async (
      meta: {
        video_id: string;
        description: string;
        title: string;
        video_tags: string[];
      },
      callbacks?: {
        onComplete?: () => void;
        onFailed?: () => void;
      }
    ): Promise<void> => {
      let json: unknown = null;
      const response = await fetchWithRedirect(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authKey')}`,
        },
        body: JSON.stringify(meta),
      });
      json = response as unknown;
      if (!(json instanceof Object) || !('code' in json)) {
        throw new Error('Failed to complete meta data');
      }
      try {
        if (json.code === 200) {
          callbacks?.onComplete?.();
        } else {
          callbacks?.onFailed?.();
          throw new Error('Failed to complete meta data');
        }
      } catch (e) {
        console.debug(e);
        callbacks?.onFailed?.();
        throw e;
      }
    },
    [fetchWithRedirect]
  );
  return completeMeta;
};

export { useCompleteMeta };
