import { useState } from "react";
import LoginForm from "../components/forms/login-form";
import RegisterForm from "../components/forms/register-form";
import LoginFormContext, {
  loginFormType,
} from "../components/contexts/auth-form-context";

export default function Auth() {
  const [formType, setFormType] = useState<loginFormType>("Login");
  return (
    <div className="flex flex-col justify-center items-center md:h-screen h-[92vh] p-4">
      <div>
        <div className="bg-indigo-500 p-5 rounded-lg w-full flex flex-col">
          <LoginFormContext.Provider value={{ setFormType }}>
            {formType == "Login" ? <LoginForm /> : <RegisterForm />}
          </LoginFormContext.Provider>
        </div>
      </div>
    </div>
  );
}
