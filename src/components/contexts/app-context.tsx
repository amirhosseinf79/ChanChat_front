import { createContext } from "react";
import { ChatT } from "../../types/chat";

interface ctxT {
  chatDetails?: ChatT;
  setChatDetails?: (s: ChatT) => any;
}

export const AppContext = createContext<ctxT>({});
