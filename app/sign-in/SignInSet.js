"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn } from "@/lib/api-codeit-auth";
import classNames from "classnames";

import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import useAuth from "../hooks/useAuth";

export default function SignInSet() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
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

  // 임시로 기록. 가입해둔 id
  console.log("temp sign-in info : ", {
    email: "test-codeit16@codeit.com",
    password: "!codeit16",
  });

  const router = useRouter();
  const email = watch("email");
  const password = watch("password");

  const handleSignInBtnClick = async () => {
    try {
      const user = await signIn({ email, password });
      console.log("user : ", user);
      if (user) {
        login(user);
        router.push("/");
      } else {
        console.error("load user data failed: No user data returned.");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
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

  return (
    <form onSubmit={handleSubmit(handleSignInBtnClick)}>
      <EmailInput label="email" register={register} errors={errors} />
      <PasswordInput label="password" register={register} errors={errors} />
      <button className={btnSignInClass} disabled={!isValid} />
    </form>
  );
}
