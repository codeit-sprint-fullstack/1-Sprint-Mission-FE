"use client";

import { useState } from "react";
import classNames from "classnames";

import { MIN_PASSWORD_LENGTH } from "../constants/sign-in";

export default function PasswordInput({ label, register, errors }) {
  const [inputType, setInputType] = useState("password");
  const [btnVisibleClass, setBtnVisibleClass] = useState("input--visible");

  let inputClass = classNames("sign-in__input", "focus:border-input--focus");
  if (errors.password) {
    inputClass = classNames(
      "sign-in__input",
      "focus:border-input--focus",
      "invalid-border"
    );
  }

  const handleVisiblePassword = () => {
    setInputType(inputType === "password" ? "text" : "password");
    setBtnVisibleClass(
      btnVisibleClass === "input--visible"
        ? "input--invisible"
        : "input--visible"
    );
  };

  return (
    <div className="sign-in__input-set">
      <label className="sign-in__label" htmlFor="password">
        비밀번호
      </label>
      <div className="sign-in__input-frame">
        <input
          className={inputClass}
          id="password"
          type={inputType}
          placeholder="비밀번호를 입력해주세요"
          {...register(label, {
            required: "비밀번호를 입력해주세요",
            minLength: {
              value: MIN_PASSWORD_LENGTH,
              message: `${MIN_PASSWORD_LENGTH}자 이상 비밀번호가 필요합니다`,
            },
            pattern: {
              value: /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/,
              message: "사용하지 못하는 문자 형식이 포함되어 있습니다",
            },
          })}
          aria-invalid={errors.password ? "true" : "false"}
        />
        <img className={btnVisibleClass} onClick={handleVisiblePassword} />
      </div>
      {errors.password && (
        <p className="sign-in__warn">{errors.password.message}</p>
      )}
    </div>
  );
}
