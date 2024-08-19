import React from "react";
import { Link, useLocation } from "react-router-dom"; 
import styles from "./PageNav.module.css";

// 리소스
import logoText from "../images/logo_text.svg";
import pandaImg from "../images/panda_logo.svg";

//컴포넌트
import HeaderLoginBtn from "./common/HeaderLoginBtn";
import HeaderBoardList from "./common/HeaderBoardList";
import TextBtn from "./common/TextBtn";
import LinkBtn from "./common/LinkBtn";

function PageNavRender() {
  const location = useLocation(); 

  const BoardList = () => {
    return (
      <ul className={styles.boardList}>
        <li>
          <Link to="/free" className={location.pathname === "/free" ? styles.boardActive : ""}>
            자유게시판
          </Link>
        </li>
        <li>
          <Link to="/items" className={location.pathname === "/items" ? styles.boardActive : ""}>
            중고마켓
          </Link>
        </li>
      </ul>
    );
  };

  return (
    <nav className={styles.outlineContain}>
      <section className={styles.pageNavBox}>
        <Link to="/">
          <img src={pandaImg} alt="logo_img" />
          <img src={logoText} alt="logo_text" />
        </Link>
        <BoardList />
        <LinkBtn link={"/login"} disabled={false} text={"로그인"} />
      </section>
    </nav>


  );
}

export default PageNavRender;
