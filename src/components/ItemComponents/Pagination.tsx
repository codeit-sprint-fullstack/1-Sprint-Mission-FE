import React from "react";
import styles from "./Pagination.module.css";

// Props 타입 정의
interface PaginationProps {
  totalCount: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  totalCount,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const pagesPerGroup = 5;
  const currentGroup = Math.floor((currentPage - 1) / pagesPerGroup);
  const currentGroupPages = Array.from(
    {
      length: Math.min(
        pagesPerGroup,
        totalPages - currentGroup * pagesPerGroup
      ),
    },
    (_, i) => currentGroup * pagesPerGroup + i + 1
  );

  const handlePageChange = (
    page: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const handleNextPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className={styles.btnContainer}>
      <button
        className={styles.shiftBtn}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {currentGroupPages.map((page) => (
        <button
          key={page}
          className={`${styles.shiftBtn} ${
            currentPage === page ? styles.active : ""
          }`}
          onClick={(e) => handlePageChange(page, e)}
        >
          {page}
        </button>
      ))}

      <button
        className={styles.shiftBtn}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
}

export default React.memo(Pagination);
