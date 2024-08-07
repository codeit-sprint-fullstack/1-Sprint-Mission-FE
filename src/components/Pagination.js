import { useEffect, useState } from 'react';
import styles from './Pagination.module.css';

export default function Pagination({
  totalItems,
  itemCountPerPage,
  pageCount,
  onPageChange,
}) {
  const [page, setPage] = useState(1);
  const [disabledPrev, setDisabledPrev] = useState(true);

  const currentSet = Math.ceil(page / pageCount);
  const totalingNum = Math.ceil(totalItems / itemCountPerPage);

  let remainingPages = totalingNum - currentSet * 5;
  let pageButtonCount = remainingPages > 0 ? 5 : pageCount + remainingPages;

  const startPage =
    (currentSet - 1) * pageCount + 1 > 1 ? (currentSet - 1) * pageCount + 1 : 1;
  const endPage =
    currentSet * pageCount > totalingNum ? totalingNum : currentSet * pageCount;

  useEffect(() => {
    if (startPage > 1) {
      setDisabledPrev(false);
    } else {
      setDisabledPrev(true);
    }
  }, [startPage]);

  return (
    <>
      <div className={styles.pagination}>
        <button disabled={disabledPrev} onClick={() => setPage(startPage - 1)}>
          &lt;
        </button>
        {Array(pageButtonCount)
          .fill(startPage)
          .map((_, i) => {
            const buttonValue = startPage + i;
            return (
              <button key={i} onClick={() => onPageChange(buttonValue)}>
                {startPage + i}
              </button>
            );
          })}
        <button onClick={() => setPage(endPage + 1)}>&gt;</button>
      </div>
    </>
  );
}
