import Link from "next/link";
import SignInSet from "./SignInSet";

export default function SignUpPage() {
  return (
    <div className="sign-in__main">
      <Link className={"sign-in__btn-logo-frame"} href="/">
        <button className="sign-in__btn-logo" />
      </Link>
      <SignInSet />
    </div>
  );
}
