"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signUp } from "@/lib/api-codeit-auth";
import classNames from "classnames";

function EmailInput({ label, register, errors }) {
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
      <label className="sign-in__label">이메일</label>
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
      {errors.email && <p className="sign-in__warn">{errors.email.message}</p>}
    </div>
  );
}

function PasswordInput({ label, register, errors }) {
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
      <label className="sign-in__label">비밀번호</label>
      <div className="sign-in__input-frame">
        <input
          className={inputClass}
          id="password"
          type={inputType}
          placeholder="비밀번호를 입력해주세요"
          {...register(label, {
            required: "비밀번호를 입력해주세요",
            minLength: { value: 8, message: "8자 이상 비밀번호가 필요합니다" },
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

function PasswordConfirmInput({ label, register, errors }) {
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
      <label className="sign-in__label">비밀번호</label>
      <div className="sign-in__input-frame">
        <input
          className={inputClass}
          id="passwordConfirm"
          type={inputType}
          placeholder="비밀번호를 입력해주세요"
          {...register(label, {
            required: "비밀번호를 입력해주세요",
            minLength: { value: 8, message: "8자 이상 비밀번호가 필요합니다" },
            pattern: {
              value: /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/,
              message: "사용하지 못하는 문자 형식이 포함되어 있습니다",
            },
          })}
          aria-invalid={errors.password ? "true" : "false"}
        />
        <img className={btnVisibleClass} onClick={handleVisiblePassword} />
      </div>
      {(errors.passwordConfirm && (
        <p className="sign-in__warn">{errors.password.message}</p>
      )) ||
        (errors.password !== errors.passwordConfirm && (
          <p className="sign-in__warn">{"비밀번호가 일치하지 않습니다"}</p>
        ))}
    </div>
  );
}

export default function SignInSet() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const btnSignInClass = classNames(
    "sign-in__btn",
    "bg-sign-in__btn",
    "disabled:bg-sign-in__btn--disabled",
    "mobile:bg-sign-in__btn--mobile",
    "mobile:disabled:bg-sign-in__btn--mobile--disabled"
  );

  const router = useRouter();
  const email = watch("email");
  const password = watch("password");

  const handleSignInBtnClick = () => {
    signUp({ email: email, password: password }).then((data) => {
      router.push("/");
    });
  };

  return (
    <form onSubmit={handleSubmit(handleSignInBtnClick)}>
      <EmailInput label="email" register={register} errors={errors} />
      <NicknameInput label="email" register={register} errors={errors} />
      <PasswordInput label="password" register={register} errors={errors} />
      <PasswordConfirmInput
        label="passwordConfirm"
        register={register}
        errors={errors}
      />
      <button className={btnSignInClass} disabled={!isValid} />
    </form>
  );
}
