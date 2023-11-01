import { Commnent } from './commnet.ts';
import { Tag } from './tag.ts';

interface Video {
  uuid: string;
  title: string;
  coverImageUrl: string;
  lowBitrateUrl: string;
  highBitrateUrl: string;
  tags: Tag[];
  comments: Commnent[];
  userUuid: string;
}

export type { Video };
