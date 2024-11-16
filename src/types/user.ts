export interface userFilterT {
  q: string;
  offset: number;
  limit: number;
}

export interface userListT {
  total: number;
  offset: number;
  limit: number;
  results: userT[];
}

export interface userT {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  is_online: boolean;
  last_online: string;
  is_blocked: boolean;
  is_blocked_you: boolean;
}
