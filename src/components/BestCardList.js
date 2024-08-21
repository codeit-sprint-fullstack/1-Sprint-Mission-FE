import React from "react";
import styles from "./BestCardList.module.css";

//컴포넌트
import BestCard from "./common/BestCard";

function BestCardList({ dataList }) {
  return (
    <div className={styles.listContainer}>
      {dataList.map((dataObject) => (
        <BestCard dataObject={dataObject} />
      ))}
    </div>
  );
}

export default BestCardList;
