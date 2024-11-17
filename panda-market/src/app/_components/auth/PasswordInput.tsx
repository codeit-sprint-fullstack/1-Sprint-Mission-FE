"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface PasswordInputProps {
  id: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: string;
  className: string;
}

export function PasswordInput({
  id,
  placeholder = "비밀번호를 입력해주세요",
  register,
  error,
  className,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        {...register}
        type={showPassword ? "text" : "password"}
        id={id}
        className={className}
        placeholder={placeholder}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-7 -translate-y-1/2 text-secondary-500 hover:text-secondary-700"
      >
        {showPassword ? (
          <EyeOff className="h-5 w-5" />
        ) : (
          <Eye className="h-5 w-5" />
        )}
      </button>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
