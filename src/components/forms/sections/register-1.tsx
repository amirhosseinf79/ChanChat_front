import { useContext } from "react";
import { RegisterContexts } from "../../contexts/register-section-context";
import DefaultInput from "../../element/text-input/input";

export default function RegisterSec1() {
  const { fields, dispatch } = useContext(RegisterContexts);
  return (
    <div className="grid grid-cols-1 gap-4">
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
  );
}
