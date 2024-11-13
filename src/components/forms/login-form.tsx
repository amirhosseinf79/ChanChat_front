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
      api.saveToken(data.data.token);
      navigate("/");
    }
  }, [data, error, navigate]);

  return (
    <div className="flex flex-col gap-6 bg-inherit">
      <div className="flex justify-center pb-6 border-b border-b-white">
        <h2 className="text-3xl text-white">Login</h2>
      </div>
      <div className="flex flex-col gap-4">
        <DefaultInput
          value={fields.username}
          onChange={(s) => dispatch({ username: s })}
          placeholder="Enter username"
        />
        <DefaultInput
          type="password"
          value={fields.password}
          onChange={(s) => dispatch({ password: s })}
          placeholder="Enter password"
        />
      </div>
      <div className="flex flex-col justify-center text-center gap-2 bg-indigo-300 rounded-lg shadow-inner mx-2 p-2">
        <ErrorBox error={error?.details} className="bg-red-300 text-black" />
        <div className="flex gap-2 justify-center">
          <DefaultBtn
            disabled={!fields.username || !fields.password}
            handler={handleFetch}
            loading={loading}
            value="Login"
          />
          <TextBtn
            className="text-indigo-900"
            handler={() => setFormType("Register")}
            value="or Create account"
          />
        </div>
      </div>
    </div>
  );
}
