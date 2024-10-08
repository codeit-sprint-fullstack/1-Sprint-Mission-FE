import styles from "@/styles/login.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import LoginForm from "../components/LoginForm.js";
import { useRouter } from "next/router";
export default function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 비동기 함수 정의
    const fetchProfile = async () => {
      const token = localStorage.getItem("accessToken");
      if (token && token.length > 0) {
        setIsLogin(true); // 로그인 상태로 변경
      } else {
        setIsLogin(false); // 로그아웃 상태로 변경
      }
    };

    // 비동기 함수 실행
    fetchProfile();
  }, [isLogin]);
  return (
    <>
      {!isLogin ? (
        <div className={styles.loginContainer}>
          <div className={styles.loginForm}>
            <div className={styles.logoImg}>
              <Image src="./logo.svg" alt="logo" fill={true} />
            </div>
            <LoginForm />
            <div className={styles.simpleLogin}>
              <p>간편 로그인하기</p>
              <div className={styles.loginIcon}>
                <a
                  href="https://www.google.com/"
                  className={styles.googleLogin}
                >
                  <Image
                    src="./google.svg"
                    alt="google"
                    width={42}
                    height={42}
                  />
                </a>
                <a
                  className={styles.kakaoLogin}
                  href="https://www.kakaocorp.com/page"
                >
                  <Image src="./kakao.svg" alt="kakao" width={42} height={42} />
                </a>
              </div>
            </div>
            <p className={styles.fromFooter}>
              판다마켓이 처음이신가요? <a href="/signup">회원가입</a>
            </p>
          </div>
        </div>
      ) : (
        router.push("/folder")
      )}
    </>
  );
}
