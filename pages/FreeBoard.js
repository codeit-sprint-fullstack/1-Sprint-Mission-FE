import React from "react";
import styles from "./FreeBoard.module.css";

// 컴포넌트
import PageNav from "../components/PageNav.js";
import LinkBtn from "components/common/LinkBtn";
import BestCardList from "components/BestCardList";
import SortBtn from "components/common/SortBtn";
import SearchBarLarge from "components/common/SearchBarLarge";
// import UserPost from "components/common/UserPost"
import UserPostList from "components/renderData/UserPostList";



function FreeBoard() {

  const tempBest = ['', '', '']
  const tempPost = ['', '', '', '', '', '', '']

  return (
    <div className={styles.bgSet}>
      <nav className={styles.navSet}>
        <PageNav />
      </nav>
      <main className={styles.mainContainer}>
        <section className={styles.bestSection}>
          <header className={styles.headerText}>베스트 게시글</header>
          <BestCardList dataList={tempBest}/>
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
          <UserPostList dataList={tempPost}/>
        </section>
      </main>
    </div>
  );
}

export default FreeBoard;
