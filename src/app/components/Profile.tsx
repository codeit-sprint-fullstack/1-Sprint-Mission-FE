"use client";

import Image from "next/image";

import classNames from "classnames";
import { PROFILE_CLASSES } from "../constants/Profile";

export default function Profile({
  type,
  profileImgUrl,
  onClick,
}: {
  type: number;
  profileImgUrl?: string | null;
  onClick?: (...args: any[]) => void;
}) {
  const imgFrameClass = classNames(
    PROFILE_CLASSES[type],
    "box-border",
    "border-1",
    "rounded-full",
    "border-gray-300",
    "overflow-hidden",
    "relative"
  );

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // 임시 제한
    if (onClick) {
      onClick();
    }
  };

  // 임시로 고정 프로필 이미지 설정
  if (!profileImgUrl) {
    profileImgUrl = "/icons/ic_profile40.svg";
  }

  return (
    <button onClick={handleProfileClick}>
      <div className={imgFrameClass}>
        <Image src={profileImgUrl} sizes="100vw" fill alt="프로필 사진" />
      </div>
    </button>
  );
}
