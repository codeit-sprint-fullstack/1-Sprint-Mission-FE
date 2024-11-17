"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInput } from "./PasswordInput";

// 공통 스타일
const inputClasses =
  "w-full rounded-[12px] bg-[#F3F4F6] px-[24px] py-[16px] text-sm border border-transparent transition-colors focus:border-[#3692FF] focus:outline-none focus:ring-0";
const labelClasses = "text-[18px] text-secondary-800 font-[700]";
const errorClasses = "mt-1 text-sm text-red-500";
const buttonClasses =
  "w-full rounded bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600 disabled:bg-secondary-400";

// Zod 스키마
const loginSchema = z.object({
  email: z.string().email({ message: "유효한 이메일을 입력해주세요" }),
  password: z.string().min(1, "비밀번호를 입력해주세요"),
});

const signupSchema = z
  .object({
    name: z.string().min(2, "이름은 2글자 이상이어야 합니다"),
    email: z.string().email("유효한 이메일을 입력해주세요"),
    password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다"),
    passwordConfirm: z.string().min(1, "비밀번호 확인을 입력해주세요"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirm"],
  });

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

type AuthFormProps = {
  type: "login" | "signup";
  onSubmit: (data: LoginFormData | SignupFormData) => Promise<void>;
  isPending?: boolean;
  error?: string;
};

export function AuthForm({ type, onSubmit, isPending, error }: AuthFormProps) {
  const [formError, setFormError] = useState<string | null>(error ?? null);

  type FormData = typeof type extends "login" ? LoginFormData : SignupFormData;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(type === "login" ? loginSchema : signupSchema),
  });

  const handleFormSubmit = handleSubmit(async (data) => {
    try {
      setFormError(null);
      await onSubmit(data);
    } catch (error) {
      if (error instanceof Error) {
        setFormError(error.message);
        if (
          error.message.includes("이메일") ||
          error.message.includes("비밀번호")
        ) {
          setError("email", {
            type: "manual",
            message: "이메일 또는 비밀번호가 올바르지 않습니다",
          });
          setError("password", {
            type: "manual",
            message: "이메일 또는 비밀번호가 올바르지 않습니다",
          });
        }
      } else {
        setFormError("인증 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
      console.error("Form submission error:", error);
    }
  });

  const email = watch("email");
  const password = watch("password");

  const isSubmitDisabled = !email || !password || isPending;

  return (
    <div className="p-auto mx-auto w-full space-y-6">
      {(formError ?? error) && (
        <div className="rounded bg-red-100 p-3 text-center text-error-red">
          {formError ?? error}
        </div>
      )}

      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div className="space-y-[16px]">
          <label htmlFor="email" className={labelClasses}>
            이메일
          </label>
          <div>
            <input
              {...register("email")}
              type="email"
              id="email"
              className={inputClasses}
              placeholder="이메일을 입력해주세요"
            />
            {errors.email && (
              <p className={errorClasses}>{errors.email.message}</p>
            )}
          </div>
        </div>

        {type === "signup" && (
          <div className="space-y-[16px]">
            <label htmlFor="name" className={labelClasses}>
              닉네임
            </label>
            <input
              {...register("name" as keyof FormData)}
              type="text"
              id="name"
              className={inputClasses}
              placeholder="닉네임을 입력해주세요"
            />
            {errors.name && (
              <p className={errorClasses}>{errors.name.message}</p>
            )}
          </div>
        )}

        <div className="space-y-[16px]">
          <label htmlFor="password" className={labelClasses}>
            비밀번호
          </label>
          <PasswordInput
            id="password"
            register={register("password")}
            error={errors.password?.message?.toString()}
            className={inputClasses}
            placeholder={
              type === "signup"
                ? "8자 이상 입력해주세요"
                : "비밀번호를 입력해주세요"
            }
          />
        </div>

        {type === "signup" && (
          <div className="space-y-[16px]">
            <label htmlFor="passwordConfirm" className={labelClasses}>
              비밀번호 확인
            </label>
            <PasswordInput
              id="passwordConfirm"
              register={register("passwordConfirm" as keyof FormData)}
              error={errors.passwordConfirm?.message?.toString()}
              className={inputClasses}
              placeholder="비밀번호를 다시 한 번 입력해주세요"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitDisabled}
          className={buttonClasses}
        >
          {isPending
            ? type === "login"
              ? "로그인 중..."
              : "가입 중..."
            : type === "login"
              ? "로그인"
              : "회원가입"}
        </button>

        <div className="text-center text-sm text-secondary-600">
          {type === "login" ? (
            <>
              계정이 없으신가요?{" "}
              <a href="/signup" className="text-blue-500 hover:underline">
                회원가입하기
              </a>
            </>
          ) : (
            <>
              이미 계정이 있으신가요?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                로그인하기
              </a>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
