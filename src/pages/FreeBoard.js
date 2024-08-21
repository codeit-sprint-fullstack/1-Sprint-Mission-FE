import React from "react";
import styles from "./FreeBoard.module.css";

// 컴포넌트
import PageNav from "../components/PageNav.js";
import BestCard from "components/common/BestCard";
import LinkBtn from "components/common/LinkBtn";
import SortBtn from "components/common/SortBtn";
import SearchBarLarge from "components/common/SearchBarLarge";
import UserPost from "components/common/UserPost"

function FreeBoard() {
  return (
    <div className={styles.bgSet}>
      <nav className={styles.navSet}>
        <PageNav />
      </nav>
      <main className={styles.mainContainer}>
        <section className={styles.bestSection}>
          <header className={styles.headerText}>베스트 게시글</header>
          <BestCard />
        </section>
        <section className={styles.commonSection}>
          <header className={styles.commonHeader}>
            <span className={styles.headerText}>게시글 쓰기</span>
            <LinkBtn link={"/write"} text={"글쓰기"} />
          </header>
          <section className={styles.seachSection}>
            <SearchBarLarge />
            <SortBtn />
          </section>
          <ul>
            <UserPost />
            <UserPost />
            <UserPost />
          </ul>
          
        </section>
      </main>
    </div>
  );
}

export default FreeBoard;
