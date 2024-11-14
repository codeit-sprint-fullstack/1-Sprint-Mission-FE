"use client";

import classNames from "classnames";
import { UseFormRegister, FieldErrors } from "react-hook-form";

import { userSchema } from "../constants/schema";

export interface InputNicknameProps {
  register: UseFormRegister<{ [key: string]: string }>;
  errors: FieldErrors<{ nickname?: string }>;
}

export default function InputNickname({
  register,
  errors,
}: InputNicknameProps) {
  const inputClass = classNames("sign-in__input", "focus:border-input--focus", {
    "invalid-border": errors.nickname,
  });

  return (
    <div className="sign-in__input-set">
      <label className="sign-in__label" htmlFor="nickname">
        닉네임
      </label>
      <input
        className={inputClass}
        id="nickname"
        type="text"
        placeholder="닉네임을 입력해주세요"
        {...register("nickname", {
          required: "닉네임을 입력해주세요",
          // min length을 1로 설정해둔 상태라 추후 변경되었을 때 사용하기 위해 주석처리
          // minLength: {
          //   value: userSchema.MIN_LENGTH_NICKNAME,
          //   message: `${userSchema.MIN_LENGTH_NICKNAME}자 이상 닉네임이 필요합니다`,
          // },
          maxLength: {
            value: userSchema.MAX_LENGTH_NICKNAME,
            message: `${userSchema.MAX_LENGTH_NICKNAME}자 이하 닉네임이 필요합니다`,
          },
          setValueAs: (value) => value.replace(/\s+$/, ""),
        })}
        aria-invalid={errors.nickname ? "true" : "false"}
      />
      {errors.nickname && (
        <p className="warning-text">{errors.nickname.message}</p>
      )}
    </div>
  );
}
