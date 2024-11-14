import { createContext } from "react";
import { registerFields } from "../../types/auth-register";

export type registerSection = "sec1" | "sec2";

interface prp {
  fields: registerFields;
  dispatch: (s: registerFields) => any;
}

export const RegisterContexts = createContext<prp>({
  fields: {},
  dispatch: () => {},
});
