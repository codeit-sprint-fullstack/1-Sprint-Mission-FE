import Link from "next/link";
import Image from "next/image";
import Modal from "../components/Modal"; // 모달 컴포넌트 임포트
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { loginUser } from "../api/api"; // api.js에서 임포트
import { validateEmail, validatePassword } from "../lib/vaildate_function.mjs"; // 유효성 검사 함수 임포트
import { useForm } from "react-hook-form"; // React Hook Form 임포트
import styles from "./Login.module.css";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }, // isValid 추가
  } = useForm({
    mode: "onChange", // 변경사항이 있을 때마다 유효성 검사
  }); // useForm 초기화
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태
  const [modalMessage, setModalMessage] = useState(""); // 모달 메시지

  const router = useRouter(); // useRouter 훅 초기화

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("로그인 성공:", data);
      // 로그인 성공 시 accessToken을 로컬 스토리지에 저장 및 중고 마켓 페이지로 이동
      localStorage.setItem("accessToken", data.accessToken);
      router.push("/items");
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
      // 이메일과 비밀번호 에러 메시지 설정
      if (error.response) {
        if (error.response.status === 401) {
          setModalMessage("비밀번호가 일치하지 않습니다.");
        } else {
          setModalMessage("로그인에 실패했습니다.");
        }
      } else {
        setModalMessage("로그인에 실패했습니다.");
      }
      setShowModal(true); // 모달 표시
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data); // 로그인 요청
  };

  // accessToken 확인
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      router.push("/folder"); // accessToken이 있다면 /folder로 이동
    }
  }, [router]);

  return (
    <main className={styles.main}>
      {/* 모달 표시 */}
      {showModal && (
        <Modal message={modalMessage} onClose={() => setShowModal(false)} />
      )}

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
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <label className={styles.label}>이메일</label>
          <input
            className={styles.input}
            type="email"
            placeholder="이메일을 입력해주세요"
            {...register("email", {
              required: "이메일을 입력해 주세요.",
              validate: validateEmail,
            })} // react-hook-form으로 이메일 등록
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}{" "}
          <label className={styles.label}>비밀번호</label>
          <div className={styles.ps_confirm}>
            <input
              className={styles.input}
              type="password"
              placeholder="비밀번호를 입력해주세요"
              {...register("password", {
                required: "비밀번호를 입력해 주세요.",
                validate: validatePassword,
              })} // react-hook-form으로 비밀번호 등록
            />
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}{" "}
          </div>
          <button type="submit" className={styles.button} disabled={!isValid}>
            {" "}
            {/* disabled 속성 추가 */}
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
          <Link href="/sign-up" className={styles.signupLink}>
            회원가입
          </Link>
        </div>
      </div>
    </main>
  );
}
