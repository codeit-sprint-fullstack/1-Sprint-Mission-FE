import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '@/styles/Article.module.css';
import profileIcon from '@/public/ic_profile.png';
import heartIcon from '@/public/ic_heart.png';
import dotIcon from '@/public/ic_dot.png';
import Image from 'next/image';
import DateFormat from '@/utils/DateFormat.js';

import line from '@/public/heartLine.png';

export default function ArticleDetail({ article, deleteArticle }) {
  const [openOptions, setOpenOptions] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const handleDropDown = () => {
    setOpenOptions((prev) => !prev);
  };

  function handleDelete() {
    deleteArticle(id);
    router.push('/freeboard');
  }

  return (
    <>
      <div className={styles.title}>
        <div className={styles.titleText}>{article.title}</div>
        <div>
          <Image
            src={dotIcon}
            alt='수정삭제 버튼'
            onClick={handleDropDown}
            className={styles.dotImage}
          />
          {openOptions && (
            <div className={styles.dropDown}>
              <Link href={`/article/edit/${id}`} className={styles.link}>
                <div className={styles.dropDownText}>수정하기</div>
              </Link>
              <div className={styles.dropDownDelete} onClick={handleDelete}>
                삭제하기
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.profile}>
        <Image src={profileIcon} alt='프로필 사진' width={40} height={40} />
        <p className={styles.userName}>{article.user.name}</p>
        <span className={styles.date}>
          <DateFormat createDate={article} className={styles.profileIcon} />
        </span>
        <Image src={line} alt='선' className={styles.line} />
        <div className={styles.heart}>
          <Image
            src={heartIcon}
            alt='하트 아이콘'
            className={styles.heartIcon}
          />
          <span className={styles.heartCount}>188</span>
        </div>
      </div>
      <div className={styles.content}>{article.content}</div>
    </>
  );
}
