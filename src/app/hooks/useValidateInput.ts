import { useState } from "react";

export function useValidateInput(validate: Function) {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.toString().trimStart();
    setValue(newValue);
    setIsValid(validate(newValue));
  };

  return {
    value,
    isValid,
    onChange: handleChangeValue,
    setValue,
  };
}

export default useValidateInput;
