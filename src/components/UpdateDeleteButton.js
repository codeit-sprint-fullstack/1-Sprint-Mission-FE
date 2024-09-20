import React from "react";
import styles from "./UpdateDeleteButton.module.css"; // CSS 파일
import { Link } from "react-router-dom";

export default function UpdateDeleteButton({ onEdit, onDelete }) {
  return (
    <div className={styles.menu}>
      <button className={styles.menuButton} onClick={onEdit}>
        수정하기
      </button>
      <button className={styles.menuButton} onClick={onDelete}>
        삭제하기
      </button>
    </div>
  );
}
