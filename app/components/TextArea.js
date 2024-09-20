"use client";

import { useState, useEffect } from "react";

import useValidateInput from "../hooks/useValidateInput";
import style from "./text-area.module.css";

export function TextArea({
  validateFunc,
  placeholder,
  getValid,
  onChange,
  value,
}) {
  const [inputClass, setInputClass] = useState(style.input);
  const customInput = useValidateInput(validateFunc);

  useEffect(() => {
    customInput.setValue(value);
  }, [value]);

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
    <textarea
      className={inputClass}
      placeholder={placeholder}
      value={customInput.value}
      onChange={handleChangeInput}
    ></textarea>
  );
}

export default TextArea;
