import Link from 'next/link';
import articleImage from '@/public/article_image.png';
import profileIcon from '@/public/ic_profile.png';
import heartIcon from '@/public/ic_heart.png';
import Date from '@/utils/Date.js';
import Image from 'next/image';
import styles from '@/styles/ArticleList.module.css';

export default function ArticleList({ articles = [] }) {
  return (
    <>
      <div className={styles.articleList}>
        {articles.map((article) => (
          <div key={article.id} className={styles.list}>
            <Link href={`/article/${article.id}`} className={styles.link}>
              <div className={styles.main}>
                <div className={styles.title}>{article.title}</div>
                <Image src={articleImage} alt='기본이미지' />
              </div>

              <div className={styles.footer}>
                <div>
                  <Image src={profileIcon} alt='프로필 이미지' />
                  <span className={styles.userName}>{article.user.name}</span>
                  <span className={styles.date}>
                    <Date createDate={article} />
                  </span>
                </div>
                <Image src={heartIcon} alt='하트 아이콘' />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
