"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import classNames from "classnames";

import Profile from "@/app/components/Profile";
//temp
// import { signUp } from "@/lib/api-codeit-auth";
// import { setAccessToken } from "@/lib/token-codeit";
// import { setRecentUserId } from "@/lib/user-info";
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
  //temp
  // const tempSignUp = () => {
  //   signUp({
  //     email: "test-codeit16@codeit.com",
  //     nickname: "codeit16",
  //     password: "!codeit16",
  //     passwordConfirmation: "!codeit16",
  //   }).then((data) => {
  //     setRecentUserId("test-codeit16@codeit.com");
  //     setAccessToken(data.accessToken);
  //   });
  // };

  return (
    <Link href="/sign-in" target="_self">
      <button className={btnSignInClass} /* onClick={tempSignUp}  */ />
    </Link>
  );
}

export function HeaderUser() {
  const [profileImgUrl, setPofileImgUrl] = useState(null);
  const [nickname, setNickname] = useState("");
  const [tempIsSignin, setTempIsSignin] = useState(false);

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

  const result = tempIsSignin ? (
    <div className={userInfoClass} onClick={handleProfileClick}>
      <Profile type={PROFILE_H40} profileImgUrl={profileImgUrl} />
      <p className={userNicknameClass}>{nickname}</p>
    </div>
  ) : (
    <BtnLogin />
  );

  useEffect(() => {
    getMyInfo()
      .then((data) => {
        setTempIsSignin(true);
        setPofileImgUrl(data.image);
        setNickname(data.nickname);
      })
      .catch((err) => {
        console.log(err);
        setTempIsSignin(false);
      });
  }, []);

  return result;
}
