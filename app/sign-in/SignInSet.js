"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "@/lib/api-codeit-auth";

function EmailInput({ label, register, errors }) {
  let inputClass = "sign-in__input";
  if (errors.password) {
    inputClass = "sign-in__input invalid-border";
  }

  return (
    <div className="sign-in__input-set">
      <label className="sign-in__label">이메일</label>
      <input
        className="sign-in__input"
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
  const [btnVisibleClass, setBtnVisibleClass] = useState("input-visible");

  let inputClass = "sign-in__input";
  if (errors.password) {
    inputClass = "sign-in__input invalid-border";
  }

  const handleVisiblePassword = () => {
    setInputType(inputType === "password" ? "text" : "password");
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

export default function SignInSet() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const email = watch("email");
  const password = watch("password");

  const handleSignInBtnClick = () => {
    console.log("handleSignInBtnClick");
    console.log({ email: email, password: password });
    // signIn({ email: email, password: password });
  };

  return (
    <form onSubmit={handleSubmit(handleSignInBtnClick)}>
      <EmailInput label="email" register={register} errors={errors} />
      <PasswordInput label="password" register={register} errors={errors} />
      <button>sign-in</button>
    </form>
  );
}
