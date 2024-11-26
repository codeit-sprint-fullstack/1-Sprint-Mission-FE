import classNames from "classnames";

import SignInSet from "./SignInSet";
import SimpleSignIn from "../components/SimpleSignIn";
import { LogoLinkW396 } from "../components/LogoLink";
import SignBottomText from "../components/SignBottomText";

export default function SignInPage() {
  const mainClass = classNames(
    "w-[64rem]",
    "flex",
    "flex-col",
    "justify-center",
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
      <SignInSet />
      <SimpleSignIn />
      <SignBottomText
        message={"판다마켓이 처음이신가요?"}
        linkText={"회원가입"}
        linkPath={"/sign-up"}
      />
    </div>
  );
}
