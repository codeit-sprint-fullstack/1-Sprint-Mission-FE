import Link from 'next/link';
import Image from 'next/image';
import articleImage from '@/public/article_image.png';
import profileIcon from '@/public/ic_profile.png';
import heartIcon from '@/public/ic_heart.png';
import DateFormat from '@/utils/DateFormat.js';
import styles from '@/styles/ArticleList.module.css';

export default function ArticleList({ articles }) {
  if (articles.length === 0) {
    return (
      <div className={styles.articleList}>
        <div className={styles.noArticleList}>둘러볼 게시글이 없습니다</div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.articleList}>
        {articles.map((article) => (
          <div key={article.id} className={styles.list}>
            <Link href={`/article/${article.id}`} className={styles.link}>
              <div className={styles.main}>
                <span className={styles.title}>
                  {article.title}
                  <span className={styles.commentCount}>
                    [{article.comment.length}]
                  </span>
                </span>
                <Image src={articleImage} alt='기본이미지' />
              </div>

              <div className={styles.userInfo}>
                <div>
                  <Image src={profileIcon} alt='프로필 이미지' />
                  <span className={styles.userName}>{article.user.name}</span>
                  <span className={styles.date}>
                    <DateFormat createDate={article} />
                  </span>
                </div>
                <div className={styles.favorite}>
                  <Image src={heartIcon} alt='하트 아이콘' />
                  <span className={styles.favoriteCount}>
                    {article.favorite}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
