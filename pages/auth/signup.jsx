import SignUpForm from "@/components/form/auth/SignUpForm";
import styles from "@/styles/pages/auth/main.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <section className={styles.AuthPage}>
      <SignUpForm />
      <div className={styles["social-login"]}>
        <p>간편 로그인 하기</p>
        <ul>
          <li>
            <Link href="https://www.google.com/">
              <Image
                src="/assets/icons/ic_google.svg"
                alt="google icon"
                width={42}
                height={42}
              />
            </Link>
          </li>
          <li>
            <Link href="https://www.kakaocorp.com/page/">
              <Image
                src="/assets/icons/ic_kakao.svg"
                alt="kakaotalk icon"
                width={42}
                height={42}
              />
            </Link>
          </li>
        </ul>
      </div>
      <p className={styles.text}>
        이미 회원이신가요?
        <Link href="/auth/login" className={styles.link}>
          로그인
        </Link>
      </p>
    </section>
  );
}
