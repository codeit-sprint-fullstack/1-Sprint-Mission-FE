import classNames from "classnames";

import SignUpSet from "./SignUpSet";
import SimpleSignIn from "../components/SimpleSignIn";
import { LogoLinkW396 } from "../components/LogoLink";
import SignBottomText from "../components/SignBottomText";

export default function SignUpPage() {
  const mainClass = classNames(
    "w-[64rem]",
    "flex",
    "flex-col",
    "mt-[23.1rem]",
    "mb-[28.4rem]",
    "mx-auto",
    "ta:mt-[19rem]",
    "ta:mb-[32.5rem]",
    "mo:w-mo-content",
    "mo:mt-[8rem]",
    "mo:mb-[23.1rem]"
  );

  return (
    <div className={mainClass}>
      <LogoLinkW396 />
      <SignUpSet />
      <SimpleSignIn />
      <SignBottomText
        message={"이미 가입하셨나요?"}
        linkText={"로그인하기"}
        linkPath={"/sign-in"}
      />
    </div>
  );
}
