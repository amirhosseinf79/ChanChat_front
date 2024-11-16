import { AuthorT, ChatT } from "./chat";

export interface messageListT {
  total: number;
  offset: number;
  limit: number;
  results: messageT[];
}

export interface messageT {
  id: number;
  type: messageTypeT;
  author: AuthorT;
  chat: ChatT;
  reply: Reply | null;
  sent_by_me: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  edited_at: string | null;
  delete_for_me: boolean;
  text: string;
  photo: null;
  video: null;
  seen_by: AuthorT[];
}

export interface Reply {
  message_id: number;
  preview: string;
}

export interface messageTypeT {
  Message: "message" | "video" | "photo";
}

export interface wsMessage {
  updated_chat: ChatT;
  message?: messageT;
}

export type messageFilterT = {
  content?: string;
  offset?: number;
  limit?: number;
  from_date?: string;
  to_date?: string;
};
