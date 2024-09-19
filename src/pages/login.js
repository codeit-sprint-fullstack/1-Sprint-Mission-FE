import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { loginUser } from "../api/api"; // api.js에서 임포트
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(""); // 이메일 에러 상태
  const [passwordError, setPasswordError] = useState(""); // 비밀번호 에러 상태
  const router = useRouter(); // useRouter 훅 초기화

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("로그인 성공:", data);
      // 로그인 성공 시 중고 마켓 페이지로 이동
      router.push("/item");
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
      // 이메일과 비밀번호 에러 메시지 설정
      if (error.response) {
        if (error.response.status === 401) {
          setEmailError("이메일을 확인해 주세요.");
          setPasswordError("비밀번호를 확인해 주세요.");
        } else {
          setEmailError("로그인에 실패했습니다.");
          setPasswordError("로그인에 실패했습니다.");
        }
      } else {
        setEmailError("로그인에 실패했습니다.");
        setPasswordError("로그인에 실패했습니다.");
      }
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();

    // 에러 메시지 초기화
    setEmailError("");
    setPasswordError("");

    // 이메일 유효성 검사
    if (!email) {
      setEmailError("이메일을 입력해 주세요.");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("유효한 이메일을 입력해 주세요.");
    }

    // 비밀번호 유효성 검사
    if (!password) {
      setPasswordError("비밀번호를 입력해 주세요.");
    } else if (password.length < 8) {
      setPasswordError("비밀번호는 8자 이상이어야 합니다.");
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError("비밀번호에는 대문자가 하나 이상 포함되어야 합니다.");
    } else if (!/[0-9]/.test(password)) {
      setPasswordError("비밀번호에는 숫자가 하나 이상 포함되어야 합니다.");
    }

    // 유효성 검사 통과
    if (email && password && !emailError && !passwordError) {
      mutation.mutate({ email, password }); // 로그인 요청
    }
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Image
            src="/images/img_login_panda_logo.png"
            alt="Panda Logo"
            layout="fixed"
            width={396}
            height={132}
            className={styles.logo}
          />
        </div>
      </header>

      <div className={styles.form_box}>
        <form className={styles.form} onSubmit={handleLogin} noValidate>
          <label className={styles.label}>이메일</label>
          <input
            className={styles.input}
            type="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p className={styles.error}>{emailError}</p>}

          <label className={styles.label}>비밀번호</label>
          <div className={styles.ps_confirm}>
            <input
              className={styles.input}
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError && <p className={styles.error}>{passwordError}</p>}
          </div>
          <button type="submit" className={styles.button}>
            로그인
          </button>
        </form>

        <div className={styles.easy_login_box}>
          <div className={styles.easy_text}>간편 로그인하기</div>

          <div className={styles.sns}>
            <a href="https://www.google.com/" target="google">
              <Image
                src="/images/google.png"
                alt="구글"
                width={42}
                height={42}
              />
            </a>
            <a href="https://www.kakaocorp.com/page/" target="kakaotalk">
              <Image
                src="/images/kakaotalk.png"
                alt="카카오톡"
                width={42}
                height={42}
              />
            </a>
          </div>
        </div>

        <div className={styles.first_ingayo}>
          판다마켓이 처음이신가요?
          <Link href="/create-account" className={styles.signupLink}>
            회원가입
          </Link>
        </div>
      </div>
    </main>
  );
}
