import Link from "next/link";
import classNames from "classnames";

import style from "./sign-up.module.css";

export default function SignUpPage() {
  const signUpClass = classNames(
    "flex",
    "flex-col",
    "mt-sign-in-mt",
    "mb-sign-in-mb",
    "tablet:tablet-mt-sign-in-mt",
    "tablet:tablet-mb-sign-in-mb",
    "mobile:mobile-mt-sign-in-mt",
    "mobile:mobile-mb-sign-in-mb",
    "mx-auto"
  );
  const linkBtnLogoClass = classNames(
    "mx-auto",
    "w-btn-logo",
    "h-btn-logo",
    "mobile:w-mobile-btn-logo",
    "mobile:h-mobile-btn-logo"
  );
  const btnLogoClass = classNames(
    "w-btn-logo",
    "h-btn-logo",
    "mobile:w-mobile-btn-logo",
    "mobile:h-mobile-btn-logo"
  );
  return (
    <div className={signUpClass}>
      <Link className={linkBtnLogoClass}>
        <button className="btn-sign-in-logo" />
      </Link>
    </div>
  );
}
