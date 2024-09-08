import Link from 'next/link';
import articleImage from '@/public/article_image.png';
import bestBadge from '@/public/best_badge.png';

import Image from 'next/image';
import styles from '@/styles/BestArticleList.module.css';
import CreateDate from '@/utils/CreateDate.js';

export default function BestArticleList({ articles = [] }) {
  return (
    <>
      <div className={styles.mainText}>베스트 게시글</div>
      <div className={styles.articleList}>
        {articles.map((article) => (
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

              <div className={styles.footer}>
                <span className={styles.userName}>{article.user.name}</span>
                <span className={styles.date}>
                  <CreateDate createDate={article} />
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
