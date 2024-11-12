"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import Modal from "react-modal";
import classNames from "classnames";

import { signIn } from "src/lib/api-auth";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
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
    "mobile:bg-sign-in__btn--mobile",
    "mobile:disabled:bg-sign-in__btn--mobile--disabled"
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
        console.error("load user data failed: No user data returned.");
      }
    } catch (err) {
      if ((err as AxiosError).response) {
        const axiosError = err as AxiosError<ErrorResponse>;
        setModalMessage(
          axiosError.response?.data.message ||
            "에러가 발생하였습니다(AxiosError)"
        );
      } else {
        setModalMessage("에러가 발생하였습니다(not AxiosError)");
      }

      setShowModal(true);
      console.error("Sign-in error:", err);
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
    if (isSignedIn) {
      router.push(prePath);
    }
  }, [isSignedIn, router, prePath]);

  return (
    <form onSubmit={handleSubmit(handleSignInBtnClick)}>
      <EmailInput label="email" register={register} errors={errors} />
      <PasswordInput label="password" register={register} errors={errors} />
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
