"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { AxiosError } from "axios";
import { signUp } from "src/lib/api-auth";
import Modal from "react-modal";
import classNames from "classnames";

import InputEmail from "../components/InputEmail";
import InputNickname from "../components/InputNickname";
import InputPassword from "../components/InputPassword";
import InputPasswordConfirm from "../components/InputPasswordConfirm";

import { ErrorResponse } from "src/types/axios";

export default function SignUpSet() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const methods = useForm({ mode: "onChange" });

  const btnSignUpClass = classNames(
    "sign-in__btn",
    "bg-sign-up__btn",
    "disabled:bg-sign-up__btn--disabled",
    "mo:bg-sign-up__btn--mo",
    "mo:disabled:bg-sign-up__btn--mo--disabled"
  );

  const router = useRouter();
  const email = methods.watch("email");
  const nickname = methods.watch("nickname");
  const password = methods.watch("password");
  const passwordConfirm = methods.watch("passwordConfirm");

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
        router.push("/sign-in");
      })
      .catch((err) => {
        if ((err as AxiosError).response) {
          const axiosError = err as AxiosError<ErrorResponse>;
          setModalMessage(
            axiosError.response?.data.message ||
              "에러가 발생하였습니다(AxiosError)"
          );
        } else {
          setModalMessage((err as { message: string }).message);
        }

        setShowModal(true);
        console.error("Sign-up error:", err);
      });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSignUpBtnClick)}>
        <InputEmail
          register={methods.register}
          errors={methods.formState.errors}
        />
        <InputNickname
          register={methods.register}
          errors={methods.formState.errors}
        />
        <InputPassword
          register={methods.register}
          errors={methods.formState.errors}
        />
        <InputPasswordConfirm
          register={methods.register}
          errors={methods.formState.errors}
        />
        <button
          className={btnSignUpClass}
          disabled={
            !methods.formState.isValid ||
            !!methods.formState.errors.passwordConfirm
          }
        />
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
    </FormProvider>
  );
}
