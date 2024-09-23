import styles from "./authForm.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../comm/Input";
import Button from "../../ui/Button";
import { PasswordInput } from "../comm/PasswordInput";
import { AUTH } from "@/variables/formValidation";

export default function SignUpForm() {
  const formMethods = useForm();

  const {
    handleSubmit,
    formState: { isValid },
    reset,
  } = formMethods;

  const handleLoginSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <FormProvider {...formMethods}>
      <form
        className={styles.AuthForm}
        onSubmit={handleSubmit(handleLoginSubmit)}
      >
        <Input
          name="email"
          label="이메일"
          type="email"
          validations={AUTH.EMAIL}
        />
        <Input
          name="nickname"
          label="닉네임"
          type="text"
          validations={AUTH.NICKNAME}
        />
        <PasswordInput
          name="password"
          label="비밀번호"
          validations={AUTH.PASSWORD}
        />
        <PasswordInput
          name="passwordConfirmation"
          label="비밀번호 확인"
          validations={AUTH.CONFIRM_PW}
        />
        <Button variant="auth" type="submit" disabled={!isValid}>
          로그인
        </Button>
      </form>
    </FormProvider>
  );
}
