import { useState } from "react";

export function useValidateInput(validate) {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleChangeValue = (e) => {
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
