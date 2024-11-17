import type { BuiltInProviderType } from "next-auth/providers";
import type { LiteralUnion } from "next-auth/react";

export type AuthErrorCode =
  | "CredentialsSignin"
  | "Configuration"
  | "AccessDenied"
  | "Verification"
  | "TokenExpired"
  | "SessionRequired";

export interface AuthError extends Error {
  type: "AuthError";
  code: AuthErrorCode;
}

export interface NextAuthError extends Error {
  type: "NextAuthError";
  provider?: LiteralUnion<BuiltInProviderType, string>;
}

export interface LoginFormData {
  // FormData 타입들 넣는게 나은가?
  email: string;
  password: string;
}

export interface SignupFormData extends LoginFormData {
  name: string;
  passwordConfirm: string;
}
