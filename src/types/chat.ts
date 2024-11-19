export interface ChatListT {
  total: number;
  offset: number;
  limit: number;
  results: ChatT[];
}

export interface ChatT {
  id: number;
  is_group: boolean;
  is_joined: boolean;
  is_typing?: boolean;
  title: titleT;
  is_online: boolean;
  members: number;
  unread_messages: number;
  last_message: LastMessageT | null;
}

export interface titleT {
  [key: string]: string;
}

export interface AuthorT {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
}

export interface LastMessageT {
  author: AuthorT;
  preview: string;
  created_at: string;
  sent_by_me: boolean;
  seen_users: AuthorT[];
}

export type chatFilterT = {
  title?: string;
  offset?: number;
  limit?: number;
};
