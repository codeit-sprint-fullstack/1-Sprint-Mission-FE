import styles from "@/styles/header.module.css";
import mainLog from "../public/images/mainlogo.png";
import mb_Log from "../public/images/mb_logo.png";
import ic_profile from "@/public/images/ic_profile.png";
import Link from "next/link";
import Image from "next/image";
import useWindowResize from "@/hooks/useWindowResize";
import { useRouter } from "next/router";
import { useContext } from "react";
import useAuth from "@/contexts/authContext";

function Header() {
  const { user } = useAuth();
  const userProfileImage = user?.image ? user.image : ic_profile;
  console.log(user);
  const view = useWindowResize();
  const router = useRouter();
  const path = router.pathname;

  const getLinkStyle = (href) => {
    //전달받은 파라미터가 현재 경로의 하위 파일아리면 스타일 적용
    return {
      color: path.startsWith(`${href}`) ? "#3692FF" : "inherit",
    };
  };

  return (
    <header>
      <div className={styles.header_box}>
        <Link href="/">
          <Image
            priority={true}
            src={view === "isMobile" ? mb_Log : mainLog}
            className={styles.logo_img}
            alt="메인판다로고"
          />
        </Link>
        <div className={styles.nav_bar}>
          <div className={styles.nav_content}>
            <Link href="/Articles" style={getLinkStyle("/Articles") || {}}>
              자유게시판
            </Link>
          </div>
          <div className={styles.nav_content}>
            <Link href="/Items" style={getLinkStyle("/Items") || {}}>
              중고마켓
            </Link>
          </div>
        </div>
        {user ? (
          <div className={styles.profile_box}>
            <Image
              className={styles.header_profile_image}
              src={userProfileImage}
              alt="유저이미지"
            />
            <span>{user?.nickname}</span>
          </div>
        ) : (
          <Link href={"Login"}>
            <button className={styles.login_btn}>로그인</button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
