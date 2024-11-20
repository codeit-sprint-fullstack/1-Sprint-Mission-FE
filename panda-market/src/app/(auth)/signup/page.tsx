"use client";

import Link from "next/link";
import Image from "next/image";
import SocialLogin from "../../_components/auth/SocialLogin";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/app/_trpc/client";
import { AuthForm } from "../../_components/auth/AuthForm";
import { TRPCClientError } from "@trpc/client";
import { useState } from "react";
import { getAuthErrorMessage } from "@/app/_utils/error";

type SignupFormData = {
  email: string;
  password: string;
  name: string;
  passwordConfirm: string;
};

type LoginFormData = {
  email: string;
  password: string;
};

export default function SignupPage() {
  const router = useRouter();
  const [customError, setCustomError] = useState<string | undefined>();

  const {
    mutateAsync: signup,
    isPending,
    error: trpcError,
  } = api.auth.register.useMutation({
    onSuccess: () => {
      router.push("/login?signup=success");
    },
  });

  const handleSubmit = async (data: LoginFormData | SignupFormData) => {
    try {
      setCustomError(undefined);

      const isSignupData = (
        data: LoginFormData | SignupFormData,
      ): data is SignupFormData => {
        return "name" in data && "passwordConfirm" in data;
      };

      if (isSignupData(data)) {
        if (data.password !== data.passwordConfirm) {
          setCustomError("비밀번호가 일치하지 않습니다.");
          return;
        }

        const { passwordConfirm, ...signupData } = data;
        await signup(signupData);
      }
    } catch (error) {
      if (error instanceof TRPCClientError) {
        setCustomError(error.message);
        return;
      }
      console.error("Signup error:", error);
      setCustomError(getAuthErrorMessage(error));
    }
  };

  useEffect(() => {
    if (trpcError) {
      setCustomError(trpcError.message);
    }
  }, [trpcError]);

  return (
    <div className="mx-auto flex h-full max-w-[640px] flex-col items-center justify-center space-y-6 p-6">
      <Link href="/">
        <Image
          src="images/logo-main.svg"
          width={198}
          height={66}
          alt="판다마켓 로고"
          className="tablet:h-[132px] tablet:w-[396px]"
          priority
        />
      </Link>
      <AuthForm
        type="signup"
        onSubmit={handleSubmit}
        isPending={isPending}
        error={customError}
      />
      <SocialLogin />
    </div>
  );
}
