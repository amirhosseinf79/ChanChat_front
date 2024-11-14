import { useContext, useEffect, useReducer, useState } from "react";
import LoginFormContext from "../contexts/auth-form-context";
import { registerFields } from "../../types/auth-register";
import { formReducer, init_form_state } from "../contexts/form-reducer";
import DefaultBtn from "../element/button/default-btn";
import { AuthUser } from "../../helpers/auth";
import TextBtn from "../element/button/text-btn";
import ErrorBox from "../boxes/error-box";
import {
  RegisterContexts,
  registerSection,
} from "../contexts/register-section-context";
import RegisterSec1 from "./sections/register-1";
import RegisterSec2 from "./sections/register-2";

export default function RegisterForm() {
  const { setFormType } = useContext(LoginFormContext);
  const [section, setSection] = useState<registerSection>("sec1");
  const [fields, dispatch] = useReducer<
    (s: registerFields, a: registerFields) => registerFields
  >(formReducer<registerFields>, init_form_state);

  const { data, error, handleFetch, loading } = AuthUser<registerFields>({
    url: "/auth/createAccount",
    fields,
  });

  useEffect(() => {
    if (data) setFormType("Login");
    if (error) setSection("sec1");
  }, [data, error]);

  return (
    <div className="flex flex-col gap-6 md:h-auto md:w-96 h-[92vh] justify-between bg-inherit md:p-5 p-0">
      <div className="flex flex-col gap-6 justify-between h-full overflow-auto">
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center md:pb-5 md:p-0 p-5 md:border-b border-b-none border-b-white md:bg-transparent bg-indigo-700">
            <div className="w-28">
              {section == "sec2" && (
                <DefaultBtn
                  handler={() => setSection("sec1")}
                  value="Back"
                  className="font-bold w-full -mb-1"
                />
              )}
            </div>
            <h2 className="text-3xl w-full text-center">Register</h2>
            <div className="w-28"></div>
          </div>
          <div className="md:mx-0 mx-5">
            <RegisterContexts.Provider value={{ fields, dispatch }}>
              {section == "sec1" ? <RegisterSec1 /> : <RegisterSec2 />}
            </RegisterContexts.Provider>
          </div>
        </div>
        <div className="md:mx-0 mx-5">
          <ErrorBox error={error?.details} className="bg-red-300 text-black" />
        </div>
      </div>
      <div className="flex flex-col justify-center text-center gap-2 md:mx-0 mx-5">
        <div className="flex md:flex-row flex-col gap-2 justify-center">
          <DefaultBtn
            disabled={
              section == "sec1" ? !fields.username || !fields.password : false
            }
            className="md:w-1/3 w-full"
            handler={section == "sec1" ? () => setSection("sec2") : handleFetch}
            loading={loading}
            value={section == "sec1" ? "Continue" : "Register"}
          />
          <TextBtn
            className="text-indigo-900 dark:text-indigo-100"
            handler={() => setFormType("Login")}
            value="or Login"
          />
        </div>
      </div>
    </div>
  );
}
