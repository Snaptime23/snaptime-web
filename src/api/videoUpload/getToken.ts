import { baseUrl } from '../config.ts';

const url = baseUrl + '/api/video/upload/token';

interface SuccessResponse {
  code: number;
  message: string;
  result: {
    token: string;
    resource_key: string;
    video_id: string;
  };
}

async function getVideoUploadToken(payload: { fileExtension: string }) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('authKey')}`,
    },
    body: JSON.stringify({ file_extension: payload.fileExtension }),
  });
  const data = (await response.json()) as unknown;
  if (!(data instanceof Object) || !('result' in data)) {
    throw new Error('Failed to get video upload token');
  }
  try {
    const result = (data as SuccessResponse).result;
    return {
      token: result.token,
      resourceKey: result.resource_key,
      videoId: result.video_id,
    };
  } catch (e) {
    throw new Error('Failed to get video upload token');
  }
}

export { getVideoUploadToken };
