import Link from 'next/link';
import articleImage from '@/public/article_image.png';
import Image from 'next/image';
import styles from '@/styles/BestProductList.module.css';
import DateFormat from '@/utils/DateFormat.js';
import useBestArticleByDevice from '@/hooks/useBestArticleByDevice';
import heartIcon from '@/public/ic_heart.png';

export default function BestProductList({ articles }) {
  const articlesList = articles?.data;
  const { bestArticles } = useBestArticleByDevice({ articlesList });

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
      <div className={styles.mainText}>베스트 상품</div>
      <div className={styles.articleList}>
        {bestArticles?.map((article) => (
          <div key={article.id} className={styles.list}>
            <Link href={`/fleamarket/${article.id}`} className={styles.link}>
              <Image
                src={
                  article.images && article.images.length > 0
                    ? `https://sprint-be-ztdn.onrender.com/${article.images[0]}`
                    : articleImage
                }
                alt='기본이미지'
                className={styles.productImage}
                width={282}
                height={282}
              />
              <div className={styles.productInfo}>
                <div className={styles.title}>{article.title}</div>
                <div className={styles.price}>
                  {article?.price
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                  원
                </div>
                <div className={styles.favorite}>
                  <Image
                    src={heartIcon}
                    alt='하트 아이콘'
                    width={16}
                    height={16}
                    className={styles.heartIcon}
                  />
                  <div className={styles.favoriteCount}>
                    {article.favoriteCount}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
