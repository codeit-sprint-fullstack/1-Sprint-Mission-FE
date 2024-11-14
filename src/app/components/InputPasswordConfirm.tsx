"use client";

import { useState } from "react";
import { useFormContext, UseFormRegister, FieldErrors } from "react-hook-form";
import classNames from "classnames";

import { userSchema } from "../constants/schema";

export interface InputPasswordConfirmProps {
  register: UseFormRegister<{ [key: string]: string }>;
  errors: FieldErrors<{ password?: string; passwordConfirm?: string }>;
}

export default function InputPasswordConfirm({
  register,
  errors,
}: InputPasswordConfirmProps) {
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] =
    useState<boolean>(false);
  const { watch } = useFormContext();
  const password = watch("password");

  const inputClass: string = classNames(
    "sign-in__input",
    "focus:border-input--focus",
    { "invalid-border": errors.passwordConfirm }
  );

  const handleVisiblePassword = () => {
    setIsPasswordConfirmVisible(!isPasswordConfirmVisible);
  };

  return (
    <div className="sign-in__input-set">
      <label className="sign-in__label" htmlFor="passwordConfirm">
        비밀번호 확인
      </label>
      <div className="sign-in__input-frame">
        <input
          className={inputClass}
          id="passwordConfirm"
          type={isPasswordConfirmVisible ? "text" : "password"}
          placeholder="비밀번호를 입력해주세요"
          {...register("passwordConfirm", {
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
            validate: (value) =>
              value === password || "비밀번호가 일치하지 않습니다",
            setValueAs: (value) => value.trim(),
          })}
          aria-invalid={errors.passwordConfirm ? "true" : "false"}
        />
        <img
          className={classNames("visibility-toggle", {
            "input--visible": isPasswordConfirmVisible,
            "input--invisible": !isPasswordConfirmVisible,
          })}
          onClick={handleVisiblePassword}
          alt="비밀번호 확인"
        />
      </div>
      {errors.passwordConfirm && (
        <p className="warning-text">{errors.passwordConfirm.message}</p>
      )}
    </div>
  );
}
