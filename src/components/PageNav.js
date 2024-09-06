import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./PageNav.module.css";

// 리소스
import pandaImg from "/images/panda_img.svg";
import logoText from "/images/logo_text.svg";

//컴포넌트
import BtnSquareFunction from "./common/BtnSquareFunction";

function PageNav({
  boardListData = [
    { name: "자유게시판", path: "freeboard" },
    { name: "중고마켓", path: "items" },
  ],
  loginState = false,
  userData = {},
}) {
  const location = useRouter();

  const BoardListRender = ({ boardListData }) => {
    return (
      <ul className={styles.boardList}>
        {boardListData.map((data, idx) => (
          <li key={idx}>
            <Link
              to={data.path}
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
    <nav className={styles.outlineContain}>
      <section className={styles.pageNavSection}>
        <div className={styles.logoBox}>
          <Link to="/">
            <img className={styles.logoImg} src={pandaImg} alt="logo_img" />
            <img className={styles.logoText} src={logoText} alt="logo_text" />
          </Link>
        </div>
        <BoardListRender boardListData={boardListData} />
        {loginState ? (
          <div className={styles.profileBox}>
            <img src={userData.profileImg} alt="profile" />
            <span className={styles.profileName}>{userData.nickname}</span>
          </div>
        ) : (
          <BtnSquareFunction linkTo={"/login"} innerText={"로그인"} />
        )}
      </section>
    </nav>
  );
}

export default PageNav;
