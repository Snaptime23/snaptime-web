export interface ApiVideo {
  video_id: string;
  author: ApiAuthor;
  play_url: string;
  cover_url: string;
  favorite_count: number;
  comment_count: number;
  is_favorite: number;
  title: string;
  is_encoding: boolean;
}

export interface ApiAuthor {
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
