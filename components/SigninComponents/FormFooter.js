import Link from "next/link";
import { ROUTES } from "@/utils/rotues";
import Image from "next/image";
import ic_google from "@/images/ic_google.png";
import ic_kakao from "@/images/ic_kakao.png";
import styles from "./SigninForm.module.css";

export default function FormFooter() {
  return (
    <>
      <div className={styles.easyLogin}>
        <p className={styles.easyLoginText}>간편로그인하기</p>
        <div className={styles.easyLoginImg}>
          <Image className={styles.img} src={ic_google} alt="google" />
          <Image className={styles.img} src={ic_kakao} alt="kakao" />
        </div>
      </div>

      <div className={styles.signinContainer}>
        <p className={styles.signinText}>
          이미 회원이신가요?{" "}
          <Link href={ROUTES.LOGIN} passHref>
            <span className={styles.signinLink}>로그인</span>
          </Link>
        </p>
      </div>
    </>
  );
}
