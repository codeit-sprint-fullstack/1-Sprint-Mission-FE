import type { AuthError, AuthErrorCode, NextAuthError } from "../_types/auth";

export const AUTH_ERROR_MESSAGES: Record<AuthErrorCode, string> = {
  CredentialsSignin: "이메일 또는 비밀번호가 올바르지 않습니다.",
  Configuration: "이메일 또는 비밀번호가 올바르지 않습니다.",
  AccessDenied: "접근이 거부되었습니다.",
  Verification: "인증에 실패했습니다.",
  TokenExpired: "인증이 만료되었습니다. 다시 로그인해주세요.",
  SessionRequired: "로그인이 필요합니다.",
};

function isAuthError(error: unknown): error is AuthError {
  return (
    error instanceof Error &&
    "type" in error &&
    "code" in error &&
    (error as AuthError).type === "AuthError"
  );
}

function isNextAuthError(error: unknown): error is NextAuthError {
  return (
    error instanceof Error &&
    "type" in error &&
    (error as NextAuthError).type === "NextAuthError"
  );
}

export function getAuthErrorMessage(error: unknown): string {
  if (isAuthError(error)) {
    return (
      AUTH_ERROR_MESSAGES[error.code] ||
      error.message ||
      "알 수 없는 오류입니다."
    );
  }

  if (isNextAuthError(error)) {
    if (error.provider) {
      return `${error.provider} 인증 중 오류가 발생했습니다.`;
    }
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string" && error in AUTH_ERROR_MESSAGES) {
    return AUTH_ERROR_MESSAGES[error as AuthErrorCode];
  }

  return "예상치 못한 오류가 발생했습니다. 다시 시도해주세요.";
}
