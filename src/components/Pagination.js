"use client";

import React from "react";
import styles from "./Pagination.module.css"; // CSS 모듈 import

const Pagination = ({ currentPage, totalPages, onPageChange, hasNext }) => {
  // 페이지 범위 계산
  const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
  const endPage = Math.min(startPage + 4, totalPages);

  return (
    <div className={styles.pagination}>
      <div className={styles.pageButtons}>
        <button
          className={styles.leftPageButton}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <button
            key={startPage + index}
            onClick={() => onPageChange(startPage + index)}
            className={startPage + index === currentPage ? styles.active : ""}
          >
            {startPage + index}
          </button>
        ))}
        <button
          className={styles.rightPageButton}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNext || currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
