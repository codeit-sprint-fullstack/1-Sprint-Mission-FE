import Image from "next/image";
import styles from "@/styles/Pagination.module.css";

export default function Pagination({ currentPage, totalPage, setCurrentPage }) {
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPage.length));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const getPageNumber = () => {
    if (currentPage <= 3) {
      return totalPage.slice(0, 5);
    } else if (currentPage >= totalPage.length - 2) {
      return totalPage.slice(totalPage.length - 5);
    } else {
      return totalPage.slice(currentPage - 3, currentPage + 2);
    }
  };

  return (
    <div className={styles.paginationBtnContainer}>
      <Image
        src="/btn_left.png"
        width={40}
        height={40}
        alt="prev_btn"
        onClick={handlePrevPage}
        className={styles.paginationPrevBtn}
      />
      {getPageNumber().map((page) => (
        <span
          key={page}
          className={`${styles.paginationBtn} ${
            page === currentPage ? styles.activeBtn : ""
          }`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </span>
      ))}
      <Image
        src="/btn_right.png"
        width={40}
        height={40}
        alt="next_btn"
        onClick={handleNextPage}
        className={styles.paginationNextBtn}
      />
    </div>
  );
}
