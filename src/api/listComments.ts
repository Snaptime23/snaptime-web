import { store } from '../store/index.ts';
import { baseUrl } from './config.ts';

interface ApiResponse {
  code: number;
  message: string;
  result: {
    comment_info: Comments[] | null;
    has_next: number;
    next_page_token: string;
    has_like: number;
  };
}

interface Comments {
  comment_id: string;
  user: User;
  video_id: string;
  content: string;
  publish_date: number;
  replies: number;
}

interface User {
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

async function listVideoComments(videoId: string, nextPageToken: string, root_id?: string): Promise<ApiResponse> {
  const authState = store.getState().auth;
  const url = `${baseUrl}/api/comment/list?video_id=${videoId}&token=${nextPageToken}&root_id=${root_id}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${authState.authKey}`,
    },
  });
  const data = (await response.json()) as unknown;
  if (!(data instanceof Object) || !('result' in data)) {
    throw new Error('listUserVideos response data error');
  }
  return data as ApiResponse;
}

// .then((res) => {
//   setHasNextPage(res.result.has_next > 0 ? true : false);
//   next_page_token = res.result.next_page_token;
//   // 解析字段
//   const comments = res.result.comment_info.map((comment) => {
//     return {
//       id: comment.comment_id,
//       avatarUrl: comment.user.avatar,
//       username: comment.user.user_name,
//       nickname: comment.user.user_name,
//       content: comment.content,
//       likeCount: parseNumber(comment.user.like_num),
//       date: parseTime(comment.publish_date * 1000),
//       replyCount: comment.replies,
//       hasLike: res.result.has_like,
//     };
//   });

export { listVideoComments };
