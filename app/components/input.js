"use client";

import { useState, useEffect } from "react";

import useValidateInput from "../hooks/useValidateInput";
import style from "./input.module.css";

export function Input({ validateFunc, placeholder, getValid, onChange }) {
  const [inputClass, setInputClass] = useState(style.input);
  const customInput = useValidateInput(validateFunc);

  useEffect(() => {
    if (!customInput.isValid) {
      setInputClass(style.input);
    } else {
      setInputClass(style["input-invalid"]);
    }

    if (getValid) {
      getValid(customInput.isValid);
    }
  }, [customInput.isValid]);

  const handleChangeInput = (e) => {
    if (onChange) {
      onChange(e);
    }

    customInput.onChange(e);
  };

  return (
    <input
      className={inputClass}
      placeholder={placeholder}
      value={customInput.value}
      onChange={handleChangeInput}
    ></input>
  );
}

export default Input;
