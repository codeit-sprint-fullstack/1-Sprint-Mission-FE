import React from "react";
import { useState } from "react";
import styles from "./Homepage.module.css";

//렌더링 컴포넌트
import PageNav from "../components/PageNav.js"
import SellingProductHeader from "../components/SellingProductHeader.js";

// 커스텀 훅

function Hompage() {
  return (
    <div className={styles.bgSet}>
      <nav className={styles.navSet}>
        <PageNav />
      </nav>
      <main className={styles.mainContainer}>
        <SellingProductHeader text={"판매 중인 상품"}/>
      </main>
      
    </div>
  );
}

export default Hompage;
