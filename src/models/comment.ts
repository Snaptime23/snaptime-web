interface Commnent {
  id: string;
  userId: string; // uuid
  content: string;
  likeCount: number;
  createdAt: string;
  replyTo: string | null;
}

export type { Commnent };
