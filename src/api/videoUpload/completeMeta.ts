import { baseUrl } from '../config.ts';

const url = baseUrl + '/api/video/upload/meta';

const completeMeta = async (
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
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('authKey')}`,
    },
    body: JSON.stringify(meta),
  });
  const data = (await response.json()) as unknown;
  if (!(data instanceof Object) || !('code' in data)) {
    throw new Error('Failed to complete meta data');
  }
  try {
    if (data.code === 200) {
      callbacks?.onComplete?.();
    } else {
      callbacks?.onFailed?.();
      throw new Error('Failed to complete meta data');
    }
  } catch (e) {
    console.log(e);
    callbacks?.onFailed?.();
    throw e;
  }
};

export { completeMeta };
