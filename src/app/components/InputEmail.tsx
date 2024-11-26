"use client";

import classNames from "classnames";
import { UseFormRegister, FieldErrors } from "react-hook-form";

import { userSchema } from "../constants/schema";

export interface InputEmailProps {
  register: UseFormRegister<{ [key: string]: string }>;
  errors: FieldErrors<{ email?: string }>;
}

export default function InputEmail({ register, errors }: InputEmailProps) {
  const inputClass = classNames("sign-in__input", "focus:border-input--focus", {
    "invalid-border": errors.email,
  });

  return (
    <div className="sign-in__input-set">
      <label className="sign-in__label" htmlFor="email">
        이메일
      </label>
      <input
        className={inputClass}
        id="email"
        type="email"
        placeholder="이메일을 입력해주세요"
        {...register("email", {
          required: "이메일을 입력해주세요",
          maxLength: {
            value: userSchema.MAX_LENGTH_EMAIL,
            message: `${userSchema.MAX_LENGTH_EMAIL}자 이하 이메일이 필요합니다`,
          },
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "이메일 형식이 아닙니다",
          },
          setValueAs: (value) => value.trim(),
        })}
        aria-invalid={errors.email ? "true" : "false"}
      />
      {errors.email && <p className="warning-text">{errors.email.message}</p>}
    </div>
  );
}
