"use client";

import { Loader2 } from "lucide-react";

interface LoaderProps {
  size?: "mobile" | "tablet" | "pc";
  fullscreen?: boolean;
}

export const Loader = ({
  size = "mobile",
  fullscreen = false,
}: LoaderProps) => {
  // 사이즈에 따른 클래스 매핑
  const sizeClasses = {
    mobile: "h-4 w-4",
    tablet: "h-8 w-8",
    pc: "h-12 w-12",
  };

  // 기본 로더 컴포넌트
  const LoaderComponent = (
    <div className="flex items-center justify-center">
      <Loader2
        className={`animate-spin text-primary-100 ${sizeClasses[size]}`}
      />
    </div>
  );

  // fullscreen이 true인 경우 전체 화면 중앙 정렬
  if (fullscreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80">
        {LoaderComponent}
      </div>
    );
  }

  return LoaderComponent;
};

// 컨테이너와 함께 사용하는 로더
export const LoaderWithContainer = ({
  size = "tablet",
  height = "h-[200px]",
}: {
  size?: "mobile" | "tablet" | "pc";
  height?: string;
}) => {
  return (
    <div className={`flex w-full items-center justify-center ${height}`}>
      <Loader size={size} />
    </div>
  );
};
