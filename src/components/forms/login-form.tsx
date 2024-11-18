import { useContext, useEffect, useReducer } from "react";
import DefaultInput from "../element/text-input/input";
import LoginFormContext from "../contexts/auth-form-context";
import { AuthUser } from "../../helpers/auth";
import ApiService from "../../services/base-api";
import { useNavigate } from "react-router-dom";
import DefaultBtn from "../element/button/default-btn";
import TextBtn from "../element/button/text-btn";
import ErrorBox from "../boxes/error-box";
import { formReducer, init_form_state } from "../contexts/form-reducer";
import { loginFields } from "../../types/auth-login";

export default function LoginForm() {
  const { setFormType } = useContext(LoginFormContext);
  const [fields, dispatch] = useReducer<
    (s: loginFields, a: loginFields) => loginFields
  >(formReducer<loginFields>, init_form_state);

  const { data, error, handleFetch, loading } = AuthUser<loginFields>({
    url: "/auth/login",
    fields,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const api = new ApiService();
      api.saveToken(data.data);
      navigate("/");
    }
  }, [data, error, navigate]);

  return (
    <div className="flex flex-col md:h-auto h-[88vh] gap-6 bg-inherit md:p-5 p-0 md:w-96">
      <div className="flex flex-col justify-between gap-6 h-full overflow-auto">
        <div className="flex flex-col gap-5">
          <div className="flex justify-center md:pb-5 md:p-0 p-5 md:border-b border-b-none border-b-white md:bg-transparent bg-indigo-700">
            <h2 className="text-3xl text-white">Login</h2>
          </div>
          <div className="flex flex-col gap-4 md:mx-0 mx-5">
            <DefaultInput
              value={fields.username}
              onChange={(s) => dispatch({ username: s })}
              placeholder="Enter username"
              handleEnter={handleFetch}
            />
            <DefaultInput
              type="password"
              value={fields.password}
              onChange={(s) => dispatch({ password: s })}
              placeholder="Enter password"
              handleEnter={handleFetch}
            />
          </div>
        </div>
        <div className="md:mx-0 mx-5">
          <ErrorBox error={error?.details} className="bg-red-300 text-black" />
        </div>
      </div>
      <div className="flex flex-col justify-center text-center gap-2 md:mx-0 mx-5">
        <div className="flex md:flex-row flex-col gap-2 justify-center">
          <DefaultBtn
            className="md:w-1/3 w-full"
            disabled={!fields.username || !fields.password}
            handler={handleFetch}
            loading={loading}
            value="Login"
          />
          <TextBtn
            className="text-indigo-900 dark:text-indigo-100"
            handler={() => setFormType("Register")}
            value="or Create account"
          />
        </div>
      </div>
    </div>
  );
}
