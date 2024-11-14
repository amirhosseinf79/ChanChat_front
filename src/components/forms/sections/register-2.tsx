import { useContext } from "react";
import { RegisterContexts } from "../../contexts/register-section-context";
import DefaultInput from "../../element/text-input/input";

export default function RegisterSec2() {
  const { fields, dispatch } = useContext(RegisterContexts);
  return (
    <div className="flex flex-col gap-6">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
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
          value={fields.email}
          onChange={(s) => dispatch({ email: s })}
          placeholder="Enter Email"
        />
        <DefaultInput
          value={fields.phone_number}
          onChange={(s) => dispatch({ phone_number: s })}
          placeholder="Enter phone number"
        />
      </div>
    </div>
  );
}
