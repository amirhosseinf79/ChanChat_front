import { ChatT, LastMessageT } from "../types/chat";
import { messageT, wsMessage } from "../types/message";
import { sentByMe } from "./auth";

function getChatObj(list: ChatT[], id?: number) {
  const current_chat = list.find((i) => i.id == id);
  return current_chat;
}

function getLastMessage(message?: wsMessage) {
  let last_message: LastMessageT | null = null;

  if (message?.updated_chat.last_message)
    last_message = message.updated_chat.last_message;

  return last_message;
}

export function updateNewChat(list: ChatT[], message: wsMessage) {
  let chatObj = getChatObj(list, message.updated_chat.id);

  if (chatObj) {
    if (!sentByMe(message.message?.author.id)) {
      chatObj = {
        ...message.updated_chat,
        unread_messages: chatObj.unread_messages + 1,
        is_online: message.user_status,
      };
    } else {
      chatObj = {
        ...message.updated_chat,
        is_online: message.user_status,
      };
      const lastMsg = getLastMessage(message);
      if (lastMsg && lastMsg.seen_users.length > 0)
        chatObj = { ...chatObj, unread_messages: 0 };
    }
  } else {
    chatObj = message.updated_chat;
  }

  return chatObj;
}

export function appendItemToFirst<T extends ChatT | messageT>(
  list: T[],
  chatObj: T
) {
  const tmp_list = list.filter((i) => i.id != chatObj.id);
  return tmp_list ? [chatObj, ...tmp_list] : [chatObj];
}

export function updateChatList(list: ChatT[], message: wsMessage) {
  let newData: any;

  if (!sentByMe(message.message?.id)) {
    if (message.action == "typing_start")
      newData = { ...newData, is_typing: true };
    else if (message.action == "typing_end")
      newData = { ...newData, is_typing: false };
    // else if (message.action == "mark_read")
    //   if (sentByMe(message.updated_chat.last_message?.author.id))
    //     newData = { ...newData, unread_messages: 0 };
  }

  const newList = list.map((i) =>
    i.id == message.updated_chat.id ? { ...i, ...newData } : i
  );
  return { newList, newData };
}

export function markSeenMessages(list: messageT[], message: wsMessage) {
  const last_message = getLastMessage(message);

  const tmp_list: messageT[] = list.map((i: messageT) =>
    i.id == message.message!.id ||
    message.updated_chat.last_message!.seen_users.length
      ? {
          ...i,
          seen_by: last_message ? last_message.seen_users : [],
        }
      : i
  );
  return tmp_list;
}
