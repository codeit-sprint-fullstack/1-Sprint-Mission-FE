import Image from "next/image";
import styles from "@/components/Header.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getProfile } from "../pages/api/user";
export default function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState({});
  const router = useRouter();

  useEffect(() => {
    // 비동기 함수 정의
    const fetchProfile = async () => {
      const token = localStorage.getItem("accessToken");
      if (token && token.length > 0) {
        setIsLogin(true); // 로그인 상태로 변경
        try {
          const profile = await getProfile(); // 비동기 함수 호출
          setUserData(profile); // 프로필 데이터를 상태로 저장
        } catch (error) {
          console.error("프로필 정보를 가져오는 중 오류 발생:", error);
        }
      } else {
        setIsLogin(false); // 로그아웃 상태로 변경
      }
    };

    // 비동기 함수 호출
    fetchProfile();
  }, [isLogin]);
  return (
    <div className={styles.Header}>
      <div className={styles.HeaderImgContainer}>
        <Image
          src="/logo-img.svg"
          alt="logo"
          fill={true}
          className={styles.HeaderImg}
          onClick={() => (window.location.href = "/")}
        />
      </div>
      <div className={styles.HeaderMenu}>
        <Link
          href="/"
          className={
            router.pathname === "/product" ? styles.Active : styles.NotActive
          }
        >
          <p>자유 게시판</p>
        </Link>
        <Link
          href="/market"
          className={
            router.pathname === "/market" ? styles.Active : styles.NotActive
          }
        >
          <p>중고마켓</p>
        </Link>
      </div>
      {!isLogin ? (
        <button
          className={styles.HeaderBtn}
          onClick={() => router.push("/login")}
        >
          로그인
        </button>
      ) : (
        <div className={styles.loginSuccess}>
          <Image src="/MyImg.svg" alt="profile" width={40} height={40}></Image>
          <p>{userData.nickname}</p>
        </div>
      )}
    </div>
  );
}
