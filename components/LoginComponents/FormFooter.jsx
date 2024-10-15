import Link from "next/link";
import { ROUTES } from "@/utils/rotues";
import Image from "next/image";
import ic_google from "@/images/ic_google.png";
import ic_kakao from "@/images/ic_kakao.png";
import styles from "./FormFooter.module.css";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function FormFooter() {
  const { data: session } = useSession();
  const handleGoogleLogin = async () => {
    await signIn("google");
  };

  return (
    <>
      <div className={styles.easyLogin}>
        <p className={styles.easyLoginText}>간편로그인하기</p>
        <div className={styles.easyLoginImg}>
          <Image
            className={styles.img}
            src={ic_google}
            alt="google"
            onClick={handleGoogleLogin}
          />
          <Link href="https://www.kakaocorp.com/page">
            <Image className={styles.img} src={ic_kakao} alt="kakao" />
          </Link>
        </div>
      </div>
      <div className={styles.signinContainer}>
        <p className={styles.signinText}>
          판다마켓이 처음이신가요?{" "}
          <Link href={ROUTES.SIGNIN} passHref>
            <span className={styles.signinLink}>회원가입</span>
          </Link>
        </p>
      </div>
      {session && (
        <div>
          <p>로그인된 사용자: {session.user.name}</p>
        </div>
      )}
    </>
  );
}
