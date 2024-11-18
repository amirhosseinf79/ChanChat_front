import { createContext } from "react";
import { wsMessageInput } from "../../types/message";

interface ctxT {
  sendMessage: (c: wsMessageInput) => any;
}

export const LocalWsContext = createContext<ctxT>({ sendMessage: () => {} });
