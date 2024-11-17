"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { AuthForm } from "../../_components/auth/AuthForm";
import SocialLogin from "../../_components/auth/SocialLogin";
import { useState } from "react";
import { getAuthErrorMessage } from "@/app/_utils/error";

import type { LoginFormData } from "@/app/_types/auth";

export default function LoginPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleLogin = async (data: LoginFormData) => {
    try {
      setIsPending(true);
      setError(undefined);

      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (!result) {
        throw new Error("로그인 요청 중 오류가 발생했습니다.");
      }

      if (result.error) {
        setError(getAuthErrorMessage(result.error));
        return;
      }

      if (result.ok) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(getAuthErrorMessage(error));
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="mx-auto flex h-full max-w-[640px] flex-col items-center justify-center space-y-6 p-6">
      <Link href="/">
        <Image
          src="/images/logo-main.svg"
          width={198}
          height={66}
          alt="판다마켓 로고"
          className="tablet:h-[132px] tablet:w-[396px]"
          priority
        />
      </Link>

      <AuthForm
        type="login"
        onSubmit={handleLogin}
        isPending={isPending}
        error={error}
      />
      <SocialLogin />
    </div>
  );
}
