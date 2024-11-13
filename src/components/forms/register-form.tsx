import { useContext, useEffect, useReducer } from "react";
import DefaultInput from "../element/text-input/input";
import LoginFormContext from "../contexts/auth-form-context";
import { registerFields } from "../../types/auth-register";
import { formReducer, init_form_state } from "../contexts/form-reducer";
import DefaultBtn from "../element/button/default-btn";
import { AuthUser } from "../../helpers/auth";
import TextBtn from "../element/button/text-btn";
import ErrorBox from "../boxes/error-box";

export default function RegisterForm() {
  const { setFormType } = useContext(LoginFormContext);
  const [fields, dispatch] = useReducer<
    (s: registerFields, a: registerFields) => registerFields
  >(formReducer<registerFields>, init_form_state);

  const { data, error, handleFetch, loading } = AuthUser<registerFields>({
    url: "/auth/createAccount",
    fields,
  });

  useEffect(() => {
    if (data) setFormType("Login");
  }, [data, error]);

  return (
    <div className="flex flex-col gap-6 bg-inherit">
      <div className="flex justify-center pb-6 border-b border-b-white">
        <h2 className="text-3xl">Register</h2>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <DefaultInput
          value={fields.username}
          onChange={(s) => dispatch({ username: s })}
          placeholder="Enter username"
        />
        <DefaultInput
          value={fields.email}
          onChange={(s) => dispatch({ email: s })}
          placeholder="Enter Email"
        />
        <DefaultInput
          value={fields.first_name}
          onChange={(s) => dispatch({ first_name: s })}
          placeholder="Enter First name"
        />
        <DefaultInput
          value={fields.last_name}
          onChange={(s) => dispatch({ last_name: s })}
          placeholder="Enter Last name"
        />
        <DefaultInput
          value={fields.phone_number}
          onChange={(s) => dispatch({ phone_number: s })}
          placeholder="Enter phone number"
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
            handler={handleFetch}
            loading={loading}
            value="Register"
          />
          <TextBtn
            className="text-indigo-900"
            handler={() => setFormType("Login")}
            value="or Login"
          />
        </div>
      </div>
    </div>
  );
}
