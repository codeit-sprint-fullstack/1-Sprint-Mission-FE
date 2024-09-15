import Link from 'next/link';
import articleImage from '@/public/article_image.png';
import bestBadge from '@/public/best_badge.png';
import Image from 'next/image';
import styles from '@/styles/BestArticleList.module.css';
import DateFormat from '@/utils/DateFormat.js';
import { useEffect, useState } from 'react';

export default function BestArticleList({ articles }) {
  const [bestArticles, setBestArticles] = useState(articles);

  useEffect(() => {
    const screenWidth = window.innerWidth;
    let maxArticles;

    if (screenWidth <= 743) {
      maxArticles = 1;
    } else if (screenWidth <= 1199) {
      maxArticles = 2;
    } else {
      maxArticles = 3;
    }

    setBestArticles(articles.slice(0, maxArticles));
  }, [articles]);

  if (bestArticles.length === 0) {
    return (
      <>
        <div className={styles.mainText}>베스트 게시글</div>
        <div className={styles.articleList}>
          <div className={styles.noArticleList}>둘러볼 게시글이 없습니다</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.mainText}>베스트 게시글</div>
      <div className={styles.articleList}>
        {bestArticles.map((article) => (
          <div key={article.id} className={styles.list}>
            <Link href={`/article/${article.id}`} className={styles.link}>
              <Image src={bestBadge} alt='베스트 뱃지' />
              <div className={styles.main}>
                <div className={styles.title}>{article.title}</div>
                <Image
                  src={articleImage}
                  alt='기본이미지'
                  className={styles.image}
                />
              </div>

              <div className={styles.userInfo}>
                <span className={styles.userName}>{article.user.name}</span>
                <span className={styles.date}>
                  <DateFormat createDate={article} />
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
