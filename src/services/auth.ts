import { titleT } from "../types/chat";
import ApiService from "./base-api";

export function sentByMe(id: number) {
  const api = new ApiService();
  return `${id}` == api.getUser();
}

export function generateChatTitle(title?: titleT) {
  if (!title) return "";

  const api = new ApiService();
  const user = api.getUser();
  const otherUser = Object.keys(title).find((i) => i != user);
  return otherUser ? title[otherUser] : "";
}
