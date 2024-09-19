import Link from "next/link";
import EasyLogin from "./EasyLogin";
import Image from "next/image";
import { useEffect, useState } from "react";
import style from "./AuthenticationBody.module.css";

export default function AuthenticationBody({ children, mode }) {
  const [adviceText, setadviceText] = useState("판다마켓이 처음이신가요?");
  const [adviceLink, setAdviceLink] = useState("/signup");
  const [adviceLinkText, setAdviceLinkText] = useState("회원가입");

  useEffect(() => {
    if (mode === "login") {
      setadviceText("판다마켓이 처음이신가요?");
      setAdviceLink("/signup");
      setAdviceLinkText("회원가입");
    } else if (mode === "signup") {
      setadviceText("이미 회원이신가요?");
      setAdviceLink("/login");
      setAdviceLinkText("로그인");
    }
  }, [mode]);

  return (
    <div className={style.contaner}>
      <Link href="/">
        <Image
          className={style.pandaLogo}
          src={"/images/pandaLogo.svg"}
          width={396}
          alt="판다 로고"
          height={132}
        />
      </Link>
      {children}
      <EasyLogin />
      <div className={style.adviceBox}>
        <div className={style.adviceText}>{adviceText}</div>
        <Link href={adviceLink}>
          <div className={style.adviceLink}>{adviceLinkText}</div>
        </Link>
      </div>
    </div>
  );
}
