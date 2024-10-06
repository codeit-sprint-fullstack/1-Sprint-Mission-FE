"use client";

import classNames from "classnames";

export default function EmailInput({ label, register, errors }) {
  let inputClass = classNames("sign-in__input", "focus:border-input--focus");
  if (errors.password) {
    inputClass = classNames(
      "sign-in__input",
      "focus:border-input--focus",
      "invalid-border"
    );
  }

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
        {...register(label, {
          required: "이메일을 입력해주세요",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "이메일 형식이 아닙니다",
          },
        })}
        aria-invalid={errors.email ? "true" : "false"}
      />
      {errors.email && <p className="warning-text">{errors.email.message}</p>}
    </div>
  );
}
