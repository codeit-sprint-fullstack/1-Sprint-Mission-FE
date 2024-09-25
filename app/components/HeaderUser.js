"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import classNames from "classnames";

import Profile from "@/app/components/Profile";
import useAuth from "../hooks/useAuth";

import { getMyInfo } from "@/lib/api-codeit-user";
import { PROFILE_H40 } from "../constants/Profile";

import style from "./header-user.module.css";

function BtnLogin() {
  const btnSignInClass = classNames(
    "w-btn-sign-in",
    "h-btn-sign-in",
    "object-cover",
    style["btn-login"]
  );

  return (
    <Link href="/sign-in" target="_self">
      <button className={btnSignInClass} />
    </Link>
  );
}

export function HeaderUser() {
  const { isSignedIn, userNickname, userProfileUrl, login } = useAuth();

  const userInfoClass = classNames("flex", "flex-row", "items-center");
  const userNicknameClass = classNames(
    "text-2lg",
    "leading-26",
    "text-gray-600",
    "ml-0.8rem"
  );

  const handleProfileClick = () => {
    alert("아직 구현되지 않은 기능입니다");
  };

  const result = isSignedIn ? (
    <div className={userInfoClass} onClick={handleProfileClick}>
      <Profile type={PROFILE_H40} profileImgUrl={userProfileUrl} />
      <p className={userNicknameClass}>{userNickname}</p>
    </div>
  ) : (
    <BtnLogin />
  );

  useEffect(() => {
    getMyInfo()
      .then((data) => {
        login(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return result;
}
