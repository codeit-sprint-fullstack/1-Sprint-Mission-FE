import SearchForm from '@/components/FleaMarket/SearchForm.js';
import postBtn from '@/public/post_btn.png';
import arrowDown from '@/public/ic_arrow_down.png';
import mobileDropDown from '@/public/btn_mobile_sort.png';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/Fleamarket.module.css';
import DropDown from '@/utils/DropDown.js';
import { useState } from 'react';

export default function ProductListHeader({ keyword, setOrderBy }) {
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
      <div className={styles.headerLayout}>
        <div className={styles.listHeader}>
          {keyword ? (
            <span className={styles.title}>검색 결과</span>
          ) : (
            <span className={styles.title}>판매 중인 상품</span>
          )}
        </div>
        <div className={styles.headerMenu}>
          <SearchForm keyword={keyword} />

          <Link href='/fleamarket/post'>
            <button className={styles.postButton}>상품 등록하기 </button>
          </Link>

          <div className={styles.dropDownBoxLayout} onClick={handleDropDown}>
            <div className={styles.webDropDownBox}>
              <div className={styles.dropDownBoxText}>{orderByText}</div>
              <Image
                src={arrowDown}
                alt='아래 화살표'
                className={styles.dropDownArrow}
              />
              <Image
                src={mobileDropDown}
                alt='모바일 드롭다운 버튼'
                className={styles.dropDownMobile}
              />
            </div>

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
                  onClose={() => setIsShowDropDown(false)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
