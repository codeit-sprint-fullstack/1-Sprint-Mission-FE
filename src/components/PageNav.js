import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./PageNav.module.css";

// 리소스
import pandaImg from "../images/panda_img.svg";
import logoText from "../images/logo_text.svg";

//컴포넌트
import TextBtn from "./common/TextBtn";

function PageNavRender() {
  const location = useLocation();

  const BoardList = () => {
    return (
      <ul className={styles.boardList}>
        <li>
          <Link
            to="/free"
            className={location.pathname === "/free" ? styles.boardActive : ""}
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
        <Link to="/">
          <div className={styles.logoBox}>
            <img className={styles.logoImg} src={pandaImg} alt="logo_img" />
            <img className={styles.logoText} src={logoText} alt="logo_text" />
          </div>
        </Link>
        <BoardList />
        <TextBtn text={"로그인"} />
      </section>
    </nav>
  );
}

export default PageNavRender;
