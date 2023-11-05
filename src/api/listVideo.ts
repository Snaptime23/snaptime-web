import { UserInfo } from '../hooks/useUserInfo.ts';
import { store } from '../store/index.ts';
import { baseUrl } from './config.ts';

interface ListVideoSuccessResponse {
  code: number;
  message: string;
  result: {
    video: ListVideoResult;
  };
}

export type ListVideoResult = Video[];

interface Video {
  video_id: string;
  author: Author;
  play_url: string;
  cover_url: string;
  favorite_count: number;
  comment_count: number;
  is_favorite: number;
  title: string;
  is_encoding: boolean;
}

interface Author {
  user_id: string;
  user_name: string;
  follow_count: number;
  follower_count: number;
  is_follow: number;
  avatar: string;
  publish_num: number;
  favourite_num: number;
  like_num: number;
  received_like_num: number;
}

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
