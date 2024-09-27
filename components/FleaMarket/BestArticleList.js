import Link from 'next/link';
import articleImage from '@/public/article_image.png';
import bestBadge from '@/public/best_badge.png';
import Image from 'next/image';
import styles from '@/styles/BestArticleList.module.css';
import DateFormat from '@/utils/DateFormat.js';
import useDevice from '@/hooks/useDevice';
import heartIcon from '@/public/ic_heart.png';

export default function BestArticleList({ articles }) {
  const articlesList = articles?.data;
  const { bestArticles } = useDevice({ articlesList });

  if (bestArticles?.length === 0) {
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
        {bestArticles?.map((article) => (
          <div key={article.id} className={styles.list}>
            <Link href={`/fleamarket/${article.id}`} className={styles.link}>
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
                <div className={styles.userInfo}>
                  <span className={styles.userName}>{article.user.name}</span>
                  <Image
                    src={heartIcon}
                    alt='하트 아이콘'
                    width={16}
                    height={16}
                    className={styles.heartIcon}
                  />
                  <span className={styles.favoriteCount}>
                    {article.favorite}
                  </span>
                </div>
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
