import LoginForm from "@/components/form/auth/LogInForm";
import { useAuth } from "@/context/AuthProvider";
import styles from "@/styles/pages/auth/main.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  });

  return (
    <section className={styles.AuthPage}>
      <LoginForm />
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
        판다마켓이 처음이신가요?{" "}
        <Link href="/auth/signup" className={styles.link}>
          회원가입
        </Link>
      </p>
    </section>
  );
}
