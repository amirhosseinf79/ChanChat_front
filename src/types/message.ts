import { AuthorT, ChatT } from "./chat";

export interface messageListT {
  total: number;
  offset: number;
  limit: number;
  results: messageT[];
}

export interface messageT {
  id: number;
  type: messageTypeT | string;
  author: AuthorT;
  chat: ChatT;
  reply: Reply | null;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  edited_at: string | null;
  delete_for_me: boolean;
  image?: string;
  video?: string;
  text?: string;
  caption?: string;
  seen_by: AuthorT[];
}

export interface Reply {
  message_id: number;
  preview: string;
  author: string;
}

export interface messageTypeT {
  Message: "message" | "video" | "photo";
}

type wsActionT = "typing" | "message_create" | "chat_create" | "online_status";

export interface wsMessage {
  updated_chat: ChatT;
  user_status: boolean;
  action: wsActionT;
  message?: messageT;
}

export interface wsMessageInput {
  action: wsActionT;
  message?: messageT;
}

export type messageFilterT = {
  content?: string;
  offset?: number;
  limit?: number;
  from_date?: string;
  to_date?: string;
};

export interface messageCreateFields {
  reply_id?: number;
  type?: messageTypeT | string;
  text?: string;
  caption?: string;
}

export const initMessageFilter: messageFilterT = {
  content: "",
  from_date: "",
  limit: 10,
  offset: 0,
  to_date: "",
};