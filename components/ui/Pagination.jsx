import styles from "./Pagination.module.scss";
import assets from "@/variables/images";
import { PAGE_SIZE } from "@/variables/queryKeys";
import Image from "next/image";

export default function Pagination({
  setCurrentPage,
  currentPage,
  totalCount,
}) {
  let pageNumbers = [];
  let startPage;
  let endPage;

  const totalPages = Math.ceil(totalCount / PAGE_SIZE.DEFAULT);

  if (currentPage < 3) {
    startPage = 1;

    endPage = Math.min(totalPages, 5);
  } else if (currentPage >= totalPages - 2) {
    startPage = totalPages - 4;
    endPage = totalPages;
  } else {
    startPage = currentPage - 2;
    endPage = Math.min(currentPage + 2, totalPages);
  }

  startPage = Math.max(1, startPage);
  endPage = Math.min(totalPages, endPage);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNum) => {
    if (pageNum !== currentPage) {
      setCurrentPage(pageNum);
    }
  };

  const prevBtnClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextBtnClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <ul className={styles.Pagination}>
      <li>
        <button
          type="button"
          onClick={prevBtnClick}
          disabled={currentPage <= 1}
          className={`${styles.btn} ${styles["btn-prev"]}`}
        >
          <Image
            src={assets.icons.arrowLeft}
            alt="previous button"
            width={16}
            height={16}
          />
        </button>
      </li>
      {pageNumbers.map((pageNum) => {
        const isActive = pageNum === currentPage;
        const classNames = isActive && styles["btn-current"];
        return (
          <li key={pageNum}>
            <button
              type="button"
              onClick={() => handlePageClick(pageNum)}
              className={`${styles.btn} ${classNames}`}
            >
              {pageNum}
            </button>
          </li>
        );
      })}
      <li>
        <button
          className={`${styles.btn} ${styles["btn-next"]}`}
          onClick={nextBtnClick}
          disabled={currentPage >= totalPages}
        >
          <Image
            src={assets.icons.arrowRight}
            alt="next button"
            width={16}
            height={16}
          />
        </button>
      </li>
    </ul>
  );
}
