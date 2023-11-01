interface Commnent {
  uuid: string;
  userUuid: string; // uuid
  contentText: string;
  replyTo: string | null;
}

export type { Commnent };
