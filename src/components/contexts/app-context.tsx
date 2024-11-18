import { createContext } from "react";
import { ChatT } from "../../types/chat";

interface ctxT {
  chatDetails?: ChatT;
  setChatDetails?: (s: ChatT | undefined) => any;
}

export const AppContext = createContext<ctxT>({});
