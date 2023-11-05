import { UserInfo } from '../hooks/useUserInfo.ts';
import { store } from '../store/index.ts';
import { ApiVideo } from './apiModel.ts';
import { baseUrl } from './config.ts';

interface ListVideoSuccessResponse {
  code: number;
  message: string;
  result: {
    video: ListVideoResult;
  };
}

export type ListVideoResult = ApiVideo[];

async function listUserVideos(userInfo: UserInfo): Promise<ListVideoResult> {
  const authState = store.getState().auth;
  const url = `${baseUrl}/api/user/publish/list?user_id=${userInfo?.user_id}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${authState.authKey}`,
    },
  });
  const data = (await response.json()) as unknown;
  if (!(data instanceof Object) || !('result' in data)) {
    throw new Error('listUserVideos response data error');
  }
  const result = (data as ListVideoSuccessResponse).result.video;
  return result;
}

export { listUserVideos };