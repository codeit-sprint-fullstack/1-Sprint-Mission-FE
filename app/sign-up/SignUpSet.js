"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signUp } from "@/lib/api-codeit-auth";
import Modal from "react-modal";
import classNames from "classnames";

import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import useAuth from "../hooks/useAuth";
import {
  MIN_NICKNAME_LENGTH,
  MAX_NICKNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
} from "../constants/sign-in";

export function NicknameInput({ label, register, errors }) {
  let inputClass = classNames("sign-in__input", "focus:border-input--focus");
  if (errors.nickname) {
    inputClass = classNames(
      "sign-in__input",
      "focus:border-input--focus",
      "invalid-border"
    );
  }

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
        {...register(label, {
          required: "닉네임을 입력해주세요",
          minLength: {
            value: MIN_NICKNAME_LENGTH,
            message: `${MIN_NICKNAME_LENGTH}자 이상 닉네임가 필요합니다`,
          },
          maxLength: {
            value: MAX_NICKNAME_LENGTH,
            message: `${MAX_NICKNAME_LENGTH}자 이하 닉네임가 필요합니다`,
          },
        })}
        aria-invalid={errors.nickname ? "true" : "false"}
      />
      {errors.nickname && (
        <p className="warning-text">{errors.nickname.message}</p>
      )}
    </div>
  );
}

function PasswordConfirmInput({ label, register, errors }) {
  const [inputType, setInputType] = useState("password");
  const [btnVisibleClass, setBtnVisibleClass] = useState("input--invisible");

  let inputClass = classNames("sign-in__input", "focus:border-input--focus");
  if (errors.passwordConfirm) {
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
      <label className="sign-in__label" htmlFor="passwordConfirm">
        비밀번호 확인
      </label>
      <div className="sign-in__input-frame">
        <input
          className={inputClass}
          id="passwordConfirm"
          type={inputType}
          placeholder="비밀번호를 다시 한 번 입력해주세요"
          {...register(label, {
            required: "비밀번호를 다시 한 번 입력해주세요",
            minLength: {
              value: MIN_PASSWORD_LENGTH,
              message: `${MIN_PASSWORD_LENGTH}자 이상 비밀번호가 필요합니다`,
            },
            pattern: {
              value: /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/,
              message: "사용하지 못하는 문자 형식이 포함되어 있습니다",
            },
          })}
          aria-invalid={errors.passwordConfirm ? "true" : "false"}
        />
        <img
          className={btnVisibleClass}
          onClick={handleVisiblePassword}
          alt="비밀번호 확인"
        />
      </div>
      {(errors.passwordConfirm && (
        <p className="warning-text">{errors.passwordConfirm.message}</p>
      )) ||
        (errors.password !== errors.passwordConfirm && (
          <p className="warning-text">{"비밀번호가 일치하지 않습니다"}</p>
        ))}
    </div>
  );
}

export default function SignUpSet() {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const { login } = useAuth();

  const btnSignInClass = classNames(
    "sign-in__btn",
    "bg-sign-in__btn",
    "disabled:bg-sign-in__btn--disabled",
    "mobile:bg-sign-in__btn--mobile",
    "mobile:disabled:bg-sign-in__btn--mobile--disabled"
  );

  const router = useRouter();
  const email = watch("email");
  const nickname = watch("nickname");
  const password = watch("password");
  const passwordConfirm = watch("passwordConfirm");

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSignUpBtnClick = () => {
    signUp({
      email: email,
      nickname: nickname,
      password: password,
      passwordConfirmation: passwordConfirm,
    })
      .then((user) => {
        login(user);
        router.push("/items");
      })
      .catch((err) => {
        setModalMessage(err.response.data.message);
        setShowModal(true);
        console.error("Sign-up error:", err);
      });
  };

  return (
    <form onSubmit={handleSubmit(handleSignUpBtnClick)}>
      <EmailInput label="email" register={register} errors={errors} />
      <NicknameInput label="nickname" register={register} errors={errors} />
      <PasswordInput label="password" register={register} errors={errors} />
      <PasswordConfirmInput
        label="passwordConfirm"
        register={register}
        errors={errors}
      />
      <button className={btnSignInClass} disabled={!isValid} />
      <Modal
        className="simple-modal"
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        contentLabel="sign-in-modal"
      >
        <p className="text-simple-modal">{modalMessage}</p>
        <button className="btn-simple-modal" onClick={handleCloseModal} />
      </Modal>
    </form>
  );
}
