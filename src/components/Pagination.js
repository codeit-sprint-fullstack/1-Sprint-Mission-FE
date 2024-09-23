import styles from './Pagination.module.css';

const Pagination = ({ page, totalPages, onPageChange }) => {
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className={styles.pagination}>
      <div
        className={styles.paginationItem}
        onClick={() => handlePageChange(page - 1)}
      >
        <img src="/image/left.svg" alt="이전" />
      </div>
      {[...Array(totalPages)].map((_, i) => (
        <div
          key={i}
          className={`${styles.paginationItem} ${page === i + 1 ? styles.active : ''}`}
          onClick={() => handlePageChange(i + 1)}
        >
          {i + 1}
        </div>
      ))}
      <div
        className={styles.paginationItem}
        onClick={() => handlePageChange(page + 1)}
      >
        <img src="/image/right.svg" alt="다음" />
      </div>
    </div>
  );
};

export default Pagination;

