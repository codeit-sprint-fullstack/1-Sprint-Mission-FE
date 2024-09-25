import Link from "next/link";
import classNames from "classnames";

import SignUpSet from "./SignUpSet";
import SimpleSignIn from "../components/SimpleSignIn";

export default function SignUpPage() {
  const extraTextSetClass = classNames(
    "flex",
    "flex-row",
    "items-center",
    "justify-center",
    "gap-0.4rem",
    "mt-2.4rem"
  );
  const extraTextClass = classNames(
    "text-1.5rem",
    "text-gray-800",
    "font-medium"
  );
  const linkTextClass = classNames(
    "text-1.5rem",
    "font-medium",
    "text-dodger-blue",
    "underline"
  );

  return (
    <div className="sign-in__main">
      <Link className={"sign-in__btn-logo-frame"} href="/">
        <button className="sign-in__btn-logo" />
      </Link>
      <SignUpSet />
      <SimpleSignIn />
      <div className={extraTextSetClass}>
        <p className={extraTextClass}>이미 가입하셨나요?</p>
        <Link className={linkTextClass} href="/sign-in">
          로그인하기
        </Link>
      </div>
    </div>
  );
}
