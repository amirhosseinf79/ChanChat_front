import { createContext } from "react";
import { messageListT, wsMessage, wsMessageInput } from "../../types/message";
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
