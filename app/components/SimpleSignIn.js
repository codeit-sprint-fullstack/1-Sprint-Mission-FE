import Link from "next/link";
import classNames from "classnames";

import { GOOGLE, KAKAO, OAUTH_INFO } from "../constants/oauth";

function OAuthSignIn({ oauth }) {
  let btnClass = classNames("oauth-btn");
  switch (oauth) {
    case GOOGLE: {
      btnClass = classNames(btnClass, "bg-oauth-btn__google");
      break;
    }
    default:
    case KAKAO: {
      btnClass = classNames(btnClass, "bg-oauth-btn__kakao");
      break;
    }
  }

  return (
    <Link href={OAUTH_INFO[oauth].tempOAuthLink}>
      <button className={btnClass} />
    </Link>
  );
}

function OAuthSignInSet() {
  const oauthSignInSetClass = classNames(
    "flex",
    "flex-row",
    "justify-between",
    "gap-1.6rem"
  );
  return (
    <div className={oauthSignInSetClass}>
      <OAuthSignIn oauth={GOOGLE} />
      <OAuthSignIn oauth={KAKAO} />
    </div>
  );
}

export default function SimpleSignIn() {
  const simpleSignInClass = classNames(
    "flex",
    "flex-row",
    "items-center",
    "justify-between",
    "mt-2.4rem",
    "rounded-lg",
    "box-border",
    "px-2.4rem",
    "bg-solitude",
    "w-simple-sign-in",
    "h-simple-sign-in",
    "mobile:w-mobile-simple-sign-in"
  );
  const labelClass = classNames("text-lg", "font-medium", "text-gray-800");
  return (
    <div className={simpleSignInClass}>
      <p className={labelClass}>간편 로그인하기</p>
      <OAuthSignInSet />
    </div>
  );
}
