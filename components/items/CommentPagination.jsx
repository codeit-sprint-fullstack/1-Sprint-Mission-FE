import React from "react";
import styles from "./CommentSection.module.css";

const CommentPagination = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className={styles.pagination}>
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        aria-label="이전 페이지"
      >
        이전
      </button>
      <span>
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        aria-label="다음 페이지"
      >
        다음
      </button>
    </div>
  );
};

export default CommentPagination;
