'use client';
import styles from '@shared/components/Buttons/PaginationButton.module.css';
import { usePaginationStore } from '@shared/store/pagination/pagination';
import Image from 'next/image';
import { useState } from 'react';

export default function PaginationButton({ data, limit }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0);
  const totalDataCount = data.totalCount;
  const totalPages = Math.ceil(totalDataCount / limit);

  const startPageGroup = pageGroup * 5 + 1;
  const endPage = Math.min(startPageGroup + 5 - 1, totalPages);
  const pageNumbers = Array.from(
    { length: endPage - startPageGroup + 1 },
    (_, index) => index + startPageGroup
  );

  const { setPage } = usePaginationStore();

  const beforePageClick = () => {
    if (pageGroup > 0) {
      setPageGroup(pageGroup - 1);
    }
  };

  const nextPageClick = () => {
    setPageGroup(pageGroup + 1);
  };

  const currentPageClick = (num) => {
    setCurrentPage(num);
    setPage(num);
  };

  return (
    <div className={styles['container']}>
      <div className={styles['before-page']} onClick={beforePageClick}>
        <div className={styles['before']}>
          <Image src={'/before-page.svg'} fill alt="before-button" />
        </div>
      </div>
      {pageNumbers.map((num) => {
        return (
          <div
            className={
              num === currentPage ? styles['current-page'] : styles['num-page']
            }
            key={num}
            onClick={() => currentPageClick(num)}
          >
            {num}
          </div>
        );
      })}
      <div className={styles['next-page']} onClick={nextPageClick}>
        <div className={styles['next']}>
          <Image src={'/next-page.svg'} fill alt="next-button" />
        </div>
      </div>
    </div>
  );
}
