import React from "react";
import { useForm } from "@/hooks/useForm";
import { useAuthValidation } from "@/hooks/useAuthValidation";
import { useModal } from "@/contexts/ModalContext";
import {
  InputField,
  PasswordField,
  SubmitButton,
} from "@/components/common/InputField";
import styles from "./AuthForm.module.css";

const AuthForm = ({ mode = "login" }) => {
  const { register, handleSubmit, errors, isValid } = useForm(mode);
  const { handleSubmit: handleAuthSubmit, isLoading } = useAuthValidation(mode);
  const { showModal } = useModal();

  const onSubmit = (data) => {
    if (isValid) {
      handleAuthSubmit(data);
    } else {
      const errorMessages = Object.values(errors)
        .map((error) => error?.message)
        .filter(Boolean);
      if (errorMessages.length > 0) {
        showModal({
          showImage: false,
          content: errorMessages.join("\n"),
          confirmText: "확인",
          showCancel: false,
          customClass: styles.authErrorModal,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <InputField
        name="email"
        label="이메일"
        type="email"
        placeholder="이메일을 입력해주세요"
        register={register}
        error={errors.email}
      />
      {mode === "register" && (
        <InputField
          name="nickname"
          label="닉네임"
          placeholder="닉네임을 입력해주세요"
          register={register}
          error={errors.nickname}
        />
      )}
      <PasswordField
        name="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요"
        register={register}
        error={errors.password}
      />
      {mode === "register" && (
        <PasswordField
          name="confirmPassword"
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 한 번 입력해주세요"
          register={register}
          error={errors.confirmPassword}
        />
      )}
      <SubmitButton isValid={isValid} isLoading={isLoading} mode={mode} />
    </form>
  );
};

export default AuthForm;
