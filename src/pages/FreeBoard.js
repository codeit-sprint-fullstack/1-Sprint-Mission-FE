import React from "react";
import styles from "./FreeBoard.module.css";

// 컴포넌트
import PageNav from "../components/PageNav.js";
import BestBoardCard from "components/common/BestBoardCard"

function FreeBoard() {
  return (
    <div className={styles.bgSet}>
      <nav className={styles.navSet}>
        <PageNav />
      </nav>
      <main className={styles.mainContainer}>
        메인
        <BestBoardCard />
      </main>
    </div>
  );
}

export default FreeBoard;
