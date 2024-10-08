import styles from "@/styles/signup.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { postsignup } from "./api/user";
import SignupForm from "../components/SignupForm.js";
import { Modal } from "../components/modal";

export default function Signup() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Modal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
      >
        <p>회원가입 실패 했어요!! 아직 에러코드 못내렸어요 콘솔창확인!</p>
        <button onClick={() => setIsModalOpen(!isModalOpen)}>확인</button>
      </Modal>
      <div className={styles.signupContainer}>
        <div className={styles.signupForm}>
          <div className={styles.logoImg}>
            <Image src="./logo.svg" alt="logo" fill={true} />
          </div>
          <SignupForm
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />

          <div className={styles.simpleLogin}>
            <p>간편 로그인하기</p>
            <div className={styles.loginIcon}>
              <a className={styles.googleLogin}>
                <Image src="./google.svg" alt="google" width={42} height={42} />
              </a>
              <a className={styles.kakaoLogin}>
                <Image src="./kakao.svg" alt="kakao" width={42} height={42} />
              </a>
            </div>
          </div>
          <p className={styles.formfooter}>
            이미 회원이신가요? <a href="/">로그인</a>
          </p>
        </div>
      </div>
    </>
  );
}
