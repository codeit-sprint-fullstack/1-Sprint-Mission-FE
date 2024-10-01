import { FormProvider, useForm } from "react-hook-form";
import styles from "./authForm.module.scss";
import Input from "../comm/Input";
import Button from "../../ui/Button";
import { PasswordInput } from "../comm/PasswordInput";
import { AUTH } from "@/variables/formValidation";

export default function LoginForm({ logIn }) {
  const formMethods = useForm();

  const {
    handleSubmit,
    formState: { isValid },
    reset,
  } = formMethods;

  const handleLoginSubmit = (data) => {
    logIn.mutate(data, {
      onSuccess: () => {
        console.log("로그인 됨");
        reset();
      },
    });
  };

  return (
    <>
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
          <PasswordInput
            name="password"
            label="비밀번호"
            validations={AUTH.PASSWORD}
          />
          <Button variant="auth" type="submit" disabled={!isValid}>
            로그인
          </Button>
        </form>
      </FormProvider>
    </>
  );
}
