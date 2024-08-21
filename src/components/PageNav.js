import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./PageNav.module.css";

// 리소스
import pandaImg from "../images/panda_img.svg";
import logoText from "../images/logo_text.svg";

//컴포넌트
import LinkBtn from "./common/LinkBtn";

function PageNavRender() {
  const location = useLocation();

  const BoardList = () => {
    return (
      <ul className={styles.boardList}>
        <li>
          <Link
            to="/freeboard"
            className={location.pathname === "/freeboard" ? styles.boardActive : ""}
          >
            자유게시판
          </Link>
        </li>
        <li>
          <Link
            to="/items"
            className={location.pathname === "/items" ? styles.boardActive : ""}
          >
            중고마켓
          </Link>
        </li>
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
        <BoardList />
        <LinkBtn link={"/login"} text={"로그인"} />
      </section>
    </nav>
  );
}

export default PageNavRender;
