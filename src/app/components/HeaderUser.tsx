"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";

import Profile from "./Profile";
import useAuth from "../hooks/useAuth";

import { getMyInfo } from "src/lib/api-user";
import { PROFILE_H40 } from "../constants/Profile";

function BtnLogin() {
  const btnSignInFrameClass = classNames(
    "w-[8.8rem]",
    "h-[4.2rem]",
    "relative"
  );

  return (
    <Link href="/sign-in" target="_self" className={btnSignInFrameClass}>
      <Image
        src="buttons/btn_to_sign_in_page_88_43.svg"
        alt="로그인 버튼"
        fill
        style={{ objectFit: "cover" }}
      />
    </Link>
  );
}

export function HeaderUser() {
  const { isSignedIn, userId, userNickname, userProfileUrl, login } = useAuth();

  const userInfoClass = classNames(
    "flex",
    "flex-row",
    "items-center",
    "cursor-pointer"
  );
  const userNicknameClass = classNames(
    "text-2lg",
    "leading-26",
    "text-gray-600",
    "ml-0.8rem"
  );

  const handleProfileClick = () => {
    alert("아직 구현되지 않은 기능입니다");
  };

  useEffect(() => {
    getMyInfo(userId)
      .then((data) => {
        login(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [login]);

  return isSignedIn ? (
    <div className={userInfoClass} onClick={handleProfileClick}>
      <Profile
        type={PROFILE_H40}
        profileImgUrl={userProfileUrl}
        onClick={handleProfileClick}
      />
      <p className={userNicknameClass}>{userNickname}</p>
    </div>
  ) : (
    <BtnLogin />
  );
}
