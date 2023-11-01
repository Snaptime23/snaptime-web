import { Tag } from './tag.ts';

interface Video {
  id: string;
  title: string;
  userId: string;
  coverImageUrl: string;
  lowBitrateUrl: string;
  highBitrateUrl: string;
  tags: Tag[];
}

export type { Video };
