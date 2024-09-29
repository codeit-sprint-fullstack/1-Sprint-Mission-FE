import Image from 'next/image';
import profileIcon from '@/public/ic_profile.png';
import heartIcon from '@/public/ic_heart.png';
import DateFormat from '@/utils/DateFormat.js';
import styles from '@/styles/ArticleList.module.css';

export function ArticleListUserInfo({ article }) {
  return (
    <>
      <div className={styles.userInfo}>
        <div>
          <Image src={profileIcon} alt='프로필 이미지' width={32} height={32} />
          <span className={styles.userName}>{article.user.name}</span>
          <span className={styles.date}>
            <DateFormat createDate={article} />
          </span>
        </div>
        <div className={styles.favorite}>
          <Image src={heartIcon} alt='하트 아이콘' width={24} height={24} />
          <span className={styles.favoriteCount}>
            {Math.min(article.favorite, 0)}
          </span>
        </div>
      </div>
    </>
  );
}
