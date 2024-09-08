import SearchForm from '@/components/FreeBoard/SearchForm.js';
import postBtn from '@/public/post_btn.png';
import arrowDown from '@/public/ic_arrow_down.png';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/FreeBoard.module.css';
export default function ArticleListHeard() {
  return (
    <>
      <div className={styles.listHeader}>
        <span className={styles.title}>게시글</span>
        <Link href='/freeboard/post'>
          <Image src={postBtn} alt='글쓰기 버튼' />
        </Link>
      </div>
      <div className={styles.menu}>
        <SearchForm />
        <div className={styles.dropDown}>
          <div className={styles.dropDownText}>최신순</div>
          <Image
            src={arrowDown}
            alt='아래 화살표'
            className={styles.dropDownArrow}
          />
        </div>
      </div>
    </>
  );
}
