import { store } from '../store/index.ts';
import { ApiVideo } from './apiModel.ts';
import { baseUrl } from './config.ts';

interface VideoFeedSuccessResponse {
  code: number;
  message: string;
  result: {
    video_info: VideoFeedResult;
  };
}

export type VideoFeedResult = ApiVideo[];

async function getNewVideoFeed(): Promise<(ApiVideo & { uniqueDataId: string })[]> {
  const authState = store.getState().auth;
  const url = `${baseUrl}/api/video/feed`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${authState.authKey}`,
    },
  });
  const data = (await response.json()) as unknown;
  if (!(data instanceof Object) || !('result' in data)) {
    throw new Error('getNewVideoFeed response data error');
  }
  const result = (data as VideoFeedSuccessResponse).result.video_info;
  const res = result.map((item) => Object.assign({}, item, { uniqueDataId: crypto.randomUUID() }));
  return res;
}

export { getNewVideoFeed };
