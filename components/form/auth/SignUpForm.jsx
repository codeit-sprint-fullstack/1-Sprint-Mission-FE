import styles from "./authForm.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../comm/Input";
import Button from "../../ui/Button";
import { PasswordInput } from "../comm/PasswordInput";
import { AUTH } from "@/variables/formValidation";
import { useGlobalModal } from "@/hooks/useModals";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthProvider";

export default function SignUpForm() {
  const [newUser, setNewUser] = useState(false);
  const { signUp, user } = useAuth();
  const formMethods = useForm();
  const { onModalOpen, GlobalModal } = useGlobalModal();
  const {
    handleSubmit,
    formState: { isValid },
    reset,
  } = formMethods;

  const router = useRouter();

  const handleLoginSubmit = (data) => {
    signUp.mutate(data, {
      onSuccess: () => {
        setNewUser(true);
        onModalOpen({
          msg: "가입이 완료되었습니다.",
          path: "/",
        });
        reset();
      },
    });
  };

  useEffect(() => {
    if (user && !newUser) {
      router.push("/");
      setNewUser(false);
    }
  }, [user, router]);

  return (
    <>
      <GlobalModal />
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
    </>
  );
}
