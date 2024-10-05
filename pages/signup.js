import styles from "@/styles/Login.module.css";
import Image from "next/image";
import Link from "next/link";
import signLogo from "@/images/signLogo.png";
import google from "@/images/GoogleDirect.png";
import kakao from "@/images/kakaoDirect.png";
import SignUpForm from "@/components/SignCommon/SignUpForm";
import Modal from "@/components/SignCommon/Modal";

export default function SignUp() {
  return (
    <div className={styles.center}>
      <div className={styles.container}>
        <Link href={"/"}>
          <Image src={signLogo} alt="signLogo" />
        </Link>
        <SignUpForm />
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
          <span>이미 회원이신가요?</span>
          <Link href={"/login"} className={styles.otherCaseLink}>
            로그인
          </Link>
        </div>
        {/* dialog 모달 따로 컴포넌트로 제작 아래를 이용 */}
        <dialog id="password-error-dlg">
          <span id="error-message">error</span>
          <button id="dialog-button">확인</button>
        </dialog>
      </div>
    </div>
  );
}
