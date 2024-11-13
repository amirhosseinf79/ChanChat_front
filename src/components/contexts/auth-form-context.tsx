import { createContext } from "react";

type loginFormType = "Login" | "Register";

interface ctxType {
  setFormType: (s: loginFormType) => unknown;
}

const LoginFormContext = createContext<ctxType>({ setFormType: () => {} });
export default LoginFormContext;
export type { loginFormType };
