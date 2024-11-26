"use client";

import { useState } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import classNames from "classnames";

import { userSchema } from "../constants/schema";

export interface InputPasswordProps {
  register: UseFormRegister<{ [key: string]: string }>;
  errors: FieldErrors<{ password?: string }>;
}

export default function InputPassword({
  register,
  errors,
}: InputPasswordProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const inputClass: string = classNames(
    "sign-in__input",
    "focus:border-input--focus",
    { "invalid-border": errors.password }
  );

  const handleVisiblePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
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
          type={isPasswordVisible ? "text" : "password"}
          placeholder="비밀번호를 입력해주세요"
          {...register("password", {
            required: "비밀번호를 입력해주세요",
            minLength: {
              value: userSchema.MIN_LENGTH_PASSWORD,
              message: `${userSchema.MIN_LENGTH_PASSWORD}자 이상 비밀번호가 필요합니다`,
            },
            maxLength: {
              value: userSchema.MAX_LENGTH_PASSWORD,
              message: `${userSchema.MAX_LENGTH_PASSWORD}자 이하 비밀번호가 필요합니다`,
            },
            pattern: {
              value: /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/,
              message: "사용하지 못하는 문자 형식이 포함되어 있습니다",
            },
            setValueAs: (value) => value.trim(),
          })}
          aria-invalid={errors.password ? "true" : "false"}
        />
        <img
          className={classNames("visibility-toggle", {
            "input--visible": isPasswordVisible,
            "input--invisible": !isPasswordVisible,
          })}
          onClick={handleVisiblePassword}
          alt="비밀번호 확인"
        />
      </div>
      {errors.password && (
        <p className="warning-text">{errors.password.message}</p>
      )}
    </div>
  );
}
