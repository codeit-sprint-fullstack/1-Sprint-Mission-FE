"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import Modal from "react-modal";
import classNames from "classnames";

import { signIn } from "src/lib/api-auth";
import InputEmail from "../components/InputEmail";
import InputPassword from "../components/InputPassword";
import useAuth from "../hooks/useAuth";

import { ErrorResponse } from "src/types/axios";

export default function SignInSet() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const { login, isSignedIn, prePath } = useAuth();

  const btnSignInClass = classNames(
    "sign-in__btn",
    "bg-sign-in__btn",
    "disabled:bg-sign-in__btn--disabled",
    "mo:bg-sign-in__btn--mo",
    "mo:disabled:bg-sign-in__btn--mo--disabled"
  );

  const router = useRouter();
  const email = watch("email");
  const password = watch("password");

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSignInBtnClick = async () => {
    try {
      const user = await signIn({ email, password });

      if (user) {
        login(user);
        router.push("/");
      } else {
        console.error("응답(정보)이 없습니다");
      }
    } catch (err) {
      let errorMessage = "에러가 발생하였습니다";

      if (err instanceof AxiosError && err.response?.data) {
        errorMessage =
          err.response.data.message || "에러가 발생하였습니다(AxiosError)";
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setModalMessage(errorMessage);
      setShowModal(true);

      setError("email", {
        type: "manual",
        message: "이메일을 확인해 주세요.",
      });
      setError("password", {
        type: "manual",
        message: "비밀번호를 확인해 주세요.",
      });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      Modal.setAppElement(document.body);
    }
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      router.push(prePath);
    }
  }, [isSignedIn, router, prePath]);

  return (
    <form onSubmit={handleSubmit(handleSignInBtnClick)}>
      <InputEmail register={register} errors={errors} />
      <InputPassword register={register} errors={errors} />
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
