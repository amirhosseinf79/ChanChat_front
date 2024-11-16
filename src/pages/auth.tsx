import { useState } from "react";
import LoginForm from "../components/forms/login-form";
import RegisterForm from "../components/forms/register-form";
import LoginFormContext, {
  loginFormType,
} from "../components/contexts/auth-form-context";

export default function Auth() {
  const [formType, setFormType] = useState<loginFormType>("Login");
  return (
    <div className="flex flex-col justify-center items-center md:h-screen h-[92vh]">
      <div className="md:h-auto md: h-[92vh] flex md:w-auto w-full">
        <div className="md:bg-indigo-800 bg-transparent md:rounded-lg rounded-none w-full flex flex-col md:h-auto h-[92vh] overflow-hidden">
          <LoginFormContext.Provider value={{ setFormType }}>
            {formType == "Login" ? <LoginForm /> : <RegisterForm />}
          </LoginFormContext.Provider>
        </div>
      </div>
    </div>
  );
}
