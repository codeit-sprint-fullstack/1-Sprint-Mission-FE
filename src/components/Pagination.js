import { useState } from 'react';
import styles from './Pagination.module.css';

export default function Pagination({
  totalItems,
  itemCountPerPage,
  pageCount,
  onPageChange,
}) {
  const [page, setPage] = useState(1);
  const [use, setUse] = useState(false);

  const currentSet = Math.ceil(page / pageCount); //

  const totalingNum = Math.ceil(totalItems / itemCountPerPage);

  let remainingPages = totalingNum - currentSet * 5;

  let pageButtonCount = remainingPages > 0 ? 5 : pageCount + remainingPages;

  const startPage =
    (currentSet - 1) * pageCount + 1 > 1 ? (currentSet - 1) * pageCount + 1 : 1;

  const endPage =
    currentSet * pageCount > totalingNum ? totalingNum : currentSet * pageCount;

  console.log(
    `스타트페이지: ${startPage}, 이엔드페이지: ${endPage}, 셋트페이지: ${page}`
  );

  return (
    <>
      <div className={styles.pagination}>
        <button disabled={use} onClick={() => setPage(startPage - 1)}>
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
