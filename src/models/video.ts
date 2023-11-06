import { Tag } from './tag.ts';

interface Video {
  videoId: string;
  title: string;
  userId: string;
  coverImageUrl: string;
  lowBitrateUrl: string;
  highBitrateUrl: string;
  tags: Tag[];
}

export type { Video };
