import React, { useEffect, useState } from "react"; // useState 추가
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./CreateAccount.module.css";
import Modal from "../components/Modal"; // 모달 컴포넌트 임포트
import {
  validateEmail,
  validatePassword,
  validatename,
} from "../lib/vaildate_function.mjs";
import { registerUser } from "../api/api"; // API 호출 함수 임포트
import { useForm } from "react-hook-form"; // React Hook Form 임포트

export default function CreateAccount() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onBlur" }); // "onBlur"로 설정해 블러 시점에서 유효성 검사 수행
  const [modalMessage, setModalMessage] = useState(""); // 모달 메시지 상태
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태

  // accessToken 확인
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // 회원가입 페이지에서는 로그인 상태일 경우만 리디렉션
      router.push("/folder");
    }
  }, [router]);

  const onSubmit = async (data) => {
    try {
      const response = await registerUser({
        email: data.email,
        nickname: data.name,
        password: data.password,
        passwordConfirmation: data.confirmPassword,
      });

      // accessToken을 로컬 스토리지에 저장
      localStorage.setItem("accessToken", response.accessToken);

      setModalMessage("회원가입이 성공적으로 완료되었습니다!");
      setShowModal(true);
      console.log("회원가입 요청:", response);

      // 회원가입 성공 시 중고마켓 페이지로 이동
      router.push("/items"); // 중고마켓 페이지로 이동
    } catch (error) {
      if (error.response) {
        console.error("회원가입 요청 실패:", error.response.data); // 오류 응답 데이터 출력
      } else {
        console.error("회원가입 요청 실패:", error.message);
      }
      setModalMessage("회원가입에 실패했습니다. 다시 시도해 주세요.");
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
          )}

          {errors.email?.type === "validate" && (
            <p className={styles.error}>유효한 이메일을 입력해 주세요.</p>
          )}

          <label className={styles.label}>닉네임</label>
          <input
            className={styles.input}
            type="text"
            placeholder="닉네임을 입력해주세요"
            {...register("name", {
              required: "닉네임은 한글로만 작성해 주세요.",
              validate: validatename,
            })} // react-hook-form으로 닉네임 등록
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}

          {errors.name?.type === "validate" && (
            <p className={styles.error}>닉네임은 한글로만 작성해 주세요.</p>
          )}

          <label className={styles.label}>비밀번호</label>
          <div className={styles.ps_confirm}>
            <input
              className={styles.input}
              type="password"
              placeholder="비밀번호를 입력해주세요"
              {...register("password", {
                required:
                  "비밀번호는 숫자, 소문자, 특수문자 포함 및 8자 이상으로 입력해주세요.",
                validate: validatePassword,
              })} // react-hook-form으로 비밀번호 등록
            />
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}

            {errors.password?.type === "validate" && (
              <p className={styles.error}>
                비밀번호는 숫자, 소문자, 특수문자 포함 및 8자 이상이어야 합니다.
              </p>
            )}
          </div>

          <label className={styles.label}>비밀번호 확인</label>
          <div className={styles.ps_confirm}>
            <input
              className={styles.input}
              type="password"
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              {...register("confirmPassword", {
                required: "비밀번호를 다시 한 번 입력해주세요.",
                validate: (value) => {
                  if (value !== watch("password")) {
                    return "비밀번호가 일치하지 않습니다.";
                  }
                  return true;
                },
              })} // react-hook-form으로 비밀번호 확인 등록
            />
            {errors.confirmPassword && (
              <p className={styles.error}>{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            className={styles.button}
            type="submit"
            disabled={!!Object.keys(errors).length} // 에러가 있을 경우 버튼 비활성화
          >
            회원가입
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
          이미 회원이신가요?
          <Link href="/login" className={styles.loginLink}>
            로그인
          </Link>
        </div>
      </div>

      {showModal && <Modal message={modalMessage} onClose={handleCloseModal} />}
    </main>
  );
}
