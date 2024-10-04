import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./GNB.module.css";
import normalLogo from "@/public/images/headerLogo.svg";
import smallLogo from "@/public/images/headerSmallLogo.svg";
import SmallButton from "@/components/common/SmallButton";
import { useAuth } from "@/hooks/useAuth";
import { useModal } from "@/contexts/ModalContext";

const NAV_ITEMS = [
  { href: "/community", text: "자유게시판" },
  { href: "/items", text: "중고마켓" },
];

const MemoizedSmallButton = React.memo(SmallButton);

export default function Header() {
  const { showModal } = useModal();
  const router = useRouter();
  const { pathname } = router;
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logoProps = useMemo(
    () => ({
      src: isSmallScreen ? smallLogo : normalLogo,
      alt: isSmallScreen ? "Small Logo" : "Logo",
      width: isSmallScreen ? 80 : 153,
      height: isSmallScreen ? 41 : 51,
      priority: true,
    }),
    [isSmallScreen]
  );

  const handleLogout = () => {
    showModal({
      content: "로그아웃 하시겠습니까?",
      confirmText: "로그아웃",
      cancelText: "취소",
      onConfirm: () => {
        logout();
        router.push("/");
      },
    });
  };
  
      {loading ? (
        <div>Loading...</div>
      ) : user ? (
        <div className={styles.userInfoHug}>
          <img
            src="/images/ic_profile.svg"
            alt="delete_icon"
            className={styles.profileImage}
          />
          <div onClick={handleLogout} className={styles.userInfo}>
            {user.nickname}
          </div>
        </div>
      ) : (
        <MemoizedSmallButton href="/login">로그인</MemoizedSmallButton>
      )}

    </header>
  );
}
