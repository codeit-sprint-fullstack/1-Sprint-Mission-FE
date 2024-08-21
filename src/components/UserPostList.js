
import React from "react";
import styles from "./UserPostList.module.css";

//컴포넌트
import UserPost from "./common/UserPost";

function UserPostList({ dataList }) {
  return (
    <ul className={styles.listContainer}>
      {dataList.map((dataObject) => (
        <UserPost dataObject={dataObject} />
      ))}
    </ul>
  );
}

export default UserPostList;
