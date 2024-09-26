import React from "react";
import { useForm } from "@/hooks/useForm";
import { useAuthValidation } from "@/hooks/useAuthValidation";
import {
  InputField,
  PasswordField,
  SubmitButton,
} from "@/components/common/InputField";
import styles from "./AuthForm.module.css";

const AuthForm = ({ mode = "login" }) => {
  const { formData, handleChange, handleBlur, errors, touched, isFormValid } =
    useForm(mode);
  const { handleSubmit, isLoading } = useAuthValidation(mode);

  return (
    <form
      onSubmit={(e) => handleSubmit(e, formData, isFormValid, errors)}
      className={styles.form}
    >
      <InputField
        name="email"
        label="이메일"
        type="email"
        placeholder="이메일을 입력해주세요"
        {...{ formData, handleChange, handleBlur, errors, touched }}
      />
      {mode === "register" && (
        <InputField
          name="nickname"
          label="닉네임"
          placeholder="닉네임을 입력해주세요"
          {...{ formData, handleChange, handleBlur, errors, touched }}
        />
      )}
      <PasswordField
        name="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요"
        {...{ formData, handleChange, handleBlur, errors, touched }}
      />
      {mode === "register" && (
        <PasswordField
          name="confirmPassword"
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 한 번 입력해주세요"
          {...{ formData, handleChange, handleBlur, errors, touched }}
        />
      )}
      <SubmitButton isValid={isFormValid} isLoading={isLoading} mode={mode} />
    </form>
  );
};

export default AuthForm;
