import { createContext } from "react";
import { wsMessage } from "../../types/message";

interface ctxT {
  setMessage: (c: wsMessage) => any;
}

export const LocalWsContext = createContext<ctxT>({ setMessage: () => {} });
