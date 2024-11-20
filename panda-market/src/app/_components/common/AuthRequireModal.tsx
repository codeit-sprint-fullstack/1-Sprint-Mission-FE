"use client";

import { useRouter } from "next/navigation";
import { ConfirmModal } from "./ConfirmModal";

interface AuthRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  returnUrl: string;
}

export function AuthRequiredModal({
  isOpen,
  onClose,
  returnUrl,
}: AuthRequiredModalProps) {
  const router = useRouter();

  const handleLogin = () => {
    const loginUrl = `/login?returnUrl=${encodeURIComponent(returnUrl)}`;
    router.push(loginUrl);
  };

  return (
    <ConfirmModal
      isOpen={isOpen}
      title="로그인 필요"
      message={`로그인이 필요한 서비스입니다.\n로그인 하시겠습니까?`}
      confirmText="로그인하기"
      cancelText="취소"
      onConfirm={handleLogin}
      onCancel={onClose}
      variant="default"
    />
  );
}
