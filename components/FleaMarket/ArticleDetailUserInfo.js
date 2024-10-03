import styles from '@/styles/ArticleDetail.module.css';
import Image from 'next/image';
import line from '@/public/heartLine.png';
import profileIcon from '@/public/ic_profile.png';
import heartIcon from '@/public/ic_heart.png';
import heartFullIcon from '@/public/ic_heart_full.png';
import DateFormat from '@/utils/DateFormat.js';
import { postFavoriteApi, deleteFavoriteApi } from '@/utils/api/favorite';
import { useState } from 'react';

export function ArticleDetailUserInfo({ article, category }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(
    Math.min(article?.favorite || 0)
  );
  const articleId = article?.id || '';

  const handleFavorite = async (articleId, category) => {
    setIsFavorite((prev) => !prev);
    if (!isFavorite) {
      setFavoriteCount((prev) => prev + 1);
      await postFavoriteApi(articleId, category);
    } else {
      setFavoriteCount((prev) => Math.max(prev - 1, 0));
      await deleteFavoriteApi(articleId, category);
    }
  };

  return (
    <>
      <div className={styles.profile}>
        <div className={styles.userInfo}>
          <Image src={profileIcon} alt='프로필 사진' width={40} height={40} />
          <div className={styles.articleInfo}>
            <p className={styles.userName}>{article.user.name}</p>
            <span className={styles.date}>
              <DateFormat createDate={article} className={styles.profileIcon} />
            </span>
          </div>
        </div>

        <div className={styles.heartCount}>
          <Image src={line} alt='선' className={styles.line} />
          <div className={styles.heart}>
            <Image
              src={isFavorite ? heartFullIcon : heartIcon}
              width={26.8}
              height={23.3}
              alt='하트 아이콘'
              className={styles.heartIcon}
              onClick={() => handleFavorite(articleId, category)}
            />
            <span className={styles.heartCount}>{favoriteCount}</span>
          </div>
        </div>
      </div>
    </>
  );
}
