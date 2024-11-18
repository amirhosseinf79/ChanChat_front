import { createContext } from "react";
import {
  messageCreateFields,
  messageListT,
  Reply,
  wsMessage,
  wsMessageInput,
} from "../../types/message";
import errorType from "../../types/error";

interface ctxT {
  handleNextPage: () => any;
  hasNext: () => boolean;
  loading: boolean;
  sendMessage: (c: wsMessageInput) => any;
  messageList?: messageListT;
  messageError?: errorType;
  message?: wsMessage;
}

export const MessageContext = createContext<ctxT>({
  handleNextPage: () => {},
  hasNext: () => false,
  loading: false,
  sendMessage: () => {},
});

interface ctx2T {
  fields?: messageCreateFields;
  setFields?: (c: messageCreateFields) => any;
  replyObj?: Reply;
  setReplyObj?: (c: Reply | undefined) => any;
}

export const MessageActionContext = createContext<ctx2T>({});
