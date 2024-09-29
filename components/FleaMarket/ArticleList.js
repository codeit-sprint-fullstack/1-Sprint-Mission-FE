import Link from 'next/link';
import Image from 'next/image';
import articleImage from '@/public/article_image.png';
import styles from '@/styles/ArticleList.module.css';
import { ArticleListUserInfo } from './ArticleListUserInfo';

export default function ArticleList({ articles }) {
  if (articles?.length === 0) {
    return (
      <div className={styles.articleList}>
        <div className={styles.noArticleList}>둘러볼 게시글이 없습니다</div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.articleList}>
        {articles?.map((article) => (
          <div key={article.id} className={styles.list}>
            <Link href={`/fleamarket/${article.id}`} className={styles.link}>
              <div className={styles.main}>
                <span className={styles.title}>
                  {article.title}
                  <span className={styles.commentCount}>
                    [{article.comment.length}]
                  </span>
                </span>
                <Image src={articleImage} alt='기본이미지' />
              </div>

              <ArticleListUserInfo article={article} />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
