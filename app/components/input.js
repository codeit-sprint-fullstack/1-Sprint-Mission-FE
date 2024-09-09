import { useState } from "react";

import style from "./input.module.css";

export function Input({ validateFunc, placeholder, setValid }) {
  const [value, setValue] = useState("");

  const handleChangeInput = (e) => {
    if (validateFunc(e.target.value)) {
      setValue(e.target.value);
      setValid(true);
    } else {
      setValid(false);
    }
  };

  return (
    <input
      className={style.input}
      placeholder={placeholder}
      onChange={handleChangeInput}
    >
      {value}
    </input>
  );
}

export default Input;
