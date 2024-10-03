import SearchForm from '@/components/FreeBoard/SearchForm.js';
import postBtn from '@/public/post_btn.png';
import arrowDown from '@/public/ic_arrow_down.png';
import mobileDropDown from '@/public/btn_mobile_sort.png';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/FreeBoard.module.css';
import DropDown from '@/utils/DropDown.js';
import { useState } from 'react';

export default function ArticleListHeader({ keyword, setOrderBy }) {
  const [isShowDropDown, setIsShowDropDown] = useState(false);
  const [orderByText, setOrderByText] = useState('최신순');

  const handleDropDown = () => {
    setIsShowDropDown((prev) => !prev);
  };

  const handleOrderByClick = (orderBy) => {
    setOrderBy(orderBy);
    setOrderByText(orderBy === 'recent' ? '최신순' : '좋아요순');
  };

  return (
    <>
      <div className={styles.listHeader}>
        {keyword ? (
          <span className={styles.title}>검색 결과</span>
        ) : (
          <span className={styles.title}>게시글</span>
        )}
        <Link href='/freeboard/post'>
          <Image src={postBtn} alt='글쓰기 버튼' />
        </Link>
      </div>
      <div className={styles.menu}>
        <SearchForm keyword={keyword} />
        <div className={styles.dropDownBoxLayout} onClick={handleDropDown}>
          <div className={styles.webDropDOnwBox}>
            <div className={styles.dropDownBoxText}>{orderByText}</div>
            <Image
              src={arrowDown}
              alt='아래 화살표'
              className={styles.dropDownArrow}
            />
          </div>
          <Image
            src={mobileDropDown}
            alt='모바일 드롭다운 버튼'
            className={styles.dropDownMobile}
          />
          {isShowDropDown && (
            <div className={styles.dropDownLayout}>
              <DropDown
                firstAction={{
                  onClickHandler: () => handleOrderByClick('recent'),
                  label: '최신순',
                }}
                secondAction={{
                  onClickHandler: () => handleOrderByClick('favorite'),
                  label: '좋아요순',
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
