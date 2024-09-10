// 기본
import React from "react";
import styles from "./PageNav.module.css";

// 추가
import { useRouter } from "next/router";
import Link from "next/link";

// 리소스
const pandaImg = "/images/logo/logo_panda_img.svg";
const logoText = "/images/logo/logo_text.svg";
//컴포넌트
import BtnSquare from "./common/BtnSquare";

function PageNav({
  boardListData = [
    { name: "자유게시판", path: "/article" },
    { name: "중고마켓", path: "/items" },
  ],
  loginState = false,
  userData = {},
}) {
  const location = useRouter();
  console.log(location.pathname);

  const BoardListRender = ({ boardListData }) => {
    return (
      <ul className={styles.boardList}>
        {boardListData.map((data, idx) => (
          <li key={idx}>
            <Link
              href={data.path}
              className={
                location.pathname === data.path ? styles.boardActive : ""
              }
            >
              {data.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <nav className={styles.outlineContain}>
        <section className={styles.pageNavSection}>
          <div className={styles.logoBox}>
            <Link href="/">
              <img className={styles.logoImg} src={pandaImg} alt="logo_img" />
              <img className={styles.logoText} src={logoText} alt="logo_text" />
            </Link>
          </div>
          <>
            <BoardListRender boardListData={boardListData} />
          </>
          <>
            {loginState ? (
              <div className={styles.profileBox}>
                <img src={userData.profileImg} alt="profile" />
                <span className={styles.profileName}>{userData.nickname}</span>
              </div>
            ) : (
              <Link href="/login">
                <BtnSquare innerText={"로그인"} />
              </Link>
            )}
          </>
        </section>
      </nav>
      <div className={styles.space}></div>
    </>
  );
}

export default PageNav;
