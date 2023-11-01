interface User {
  id: string;
  nickname: string;
  bio: string;
  avatarUrl: string;
  followCount: number;
  followerCount: number;
  videoCount: number;
}

export type { User };
