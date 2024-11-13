"use client";

import { useState, useEffect } from "react";

import useValidateInput from "../hooks/useValidateInput";
import style from "./text-area.module.css";

interface TextAreaProps {
  validateFunc: (comment: string) => 0 | 402 | 500 | undefined;
  placeholder: string;
  getValid: (valid: number | boolean | null) => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
}

export default function TextArea({
  validateFunc,
  placeholder,
  getValid,
  onChange,
  value = "",
}: TextAreaProps) {
  const [inputClass, setInputClass] = useState(style.input);
  const customInput = useValidateInput(validateFunc);

  useEffect(() => {
    customInput.setValue(value);
  }, [value, customInput]);

  useEffect(() => {
    if (!customInput.isValid) {
      setInputClass(style.input);
    } else {
      setInputClass(style["input-invalid"]);
    }

    if (getValid) {
      getValid(customInput.isValid);
    }
  }, [customInput.isValid, getValid]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e);
  };

  // 어차피 다른 라이브러리 사용해서 사용하면 useValidateInput을 사용 안할 예정
  //customInput.onChange(e);

  return (
    <textarea
      className={inputClass}
      placeholder={placeholder}
      value={customInput.value}
      onChange={handleChangeInput}
    ></textarea>
  );
}
