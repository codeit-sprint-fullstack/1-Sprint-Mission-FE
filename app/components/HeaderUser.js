"use client";

import Link from "next/link";
import Profile from "@/app/components/Profile";
import { PROFILE_H40 } from "../constants/Profile";

import style from "./header-user.module.css";

function BtnLogin() {
  return (
    <Link href="/login" target="_self">
      <button className={style["btn-login"]} />
    </Link>
  );
}

export function HeaderUser() {
  const tempIsSignin = false;

  const handleProfileClick = () => {
    alert("아직 구현되지 않은 기능입니다");
  };

  const result = tempIsSignin ? (
    <Profile type={PROFILE_H40} onClick={handleProfileClick} />
  ) : (
    <BtnLogin />
  );

  return result;
}
