import React from "react";
import { useState } from "react";
import styles from "./Homepage.module.css";

//렌더링 컴포넌트
import PageNav from "../components/PageNav.js"
import SellingProductHeader from "../components/SellingProductHeader.js";

// 커스텀 훅
import useProductData from "../hooks/useProductData.js";
import useWindowWidhtSize from "../hooks/useWindowWidhtSize.js";

function Hompage() {
  return (
    <div className={styles.homepage}>
      <PageNav />
      <SellingProductHeader text={"판매 중인 상품"}/>
    </div>
  );
}

export default Hompage;
