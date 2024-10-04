import styles from '@/styles/Fleamarket.module.css';

export default function Pagination({
  totalPages,
  currentPage,
  setCurrentPage,
}) {
  const pageLimit = 5;
  const startPage = Math.floor((currentPage - 1) / pageLimit) * pageLimit + 1;
  const endPage = Math.min(startPage + pageLimit - 1, totalPages);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - pageLimit, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + pageLimit, totalPages));
  };

  return (
    <>
      <div className={styles.paginationLayout}>
        <button
          disabled={currentPage <= pageLimit}
          onClick={handlePrev}
          className={styles.paginationArrowBtn}
        >
          &lt;
        </button>
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <button
            key={startPage + index}
            onClick={() => setCurrentPage(startPage + index)}
            className={
              startPage + index === currentPage
                ? styles.selectBtn
                : styles.noSelectBtn
            }
          >
            {startPage + index}
          </button>
        ))}
        <button
          disabled={currentPage + pageLimit > totalPages}
          onClick={handleNext}
          className={styles.paginationArrowBtn}
        >
          &gt;
        </button>
      </div>
    </>
  );
}
