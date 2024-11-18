import styles from "@/styles/Login.module.css";
import Image from "next/image";
import Link from "next/link";
import signLogo from "@/images/signLogo.png";
import google from "@/images/GoogleDirect.png";
import kakao from "@/images/kakaoDirect.png";
import LoginForm from "@/components/SignCommon/LoginForm";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();

  // useEffect를 사용하여 컴포넌트가 렌더링될 때 accessToken을 확인
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    // accessToken이 존재하면 "/" 로 리다이렉트
    if (accessToken) {
      router.push("/");
    }
  }, []);

  return (
    <div className={styles.center}>
      <div className={styles.container}>
        <Link href={"/"}>
          <Image src={signLogo} alt="signLogo" />
        </Link>
        <LoginForm />
        <div className={styles.simpleLogin}>
          <span className={styles.simpleLoginText}>간편 로그인하기</span>
          <div className={styles.simpleLoginIcons}>
            <Link href={"https://www.google.co.kr/?hl=ko"}>
              <Image src={google} alt="google" />
            </Link>
            <Link href={"https://www.kakaocorp.com/page/"}>
              <Image src={kakao} alt="kakao" />
            </Link>
          </div>
        </div>
        <div className={styles.otherCase}>
          <span>판다마켓이 처음이신가요?</span>
          <Link href={"/signup"} className={styles.otherCaseLink}>
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
