import styles from '@shared/components/article/ArticleTemplate.module.css';
import Image from 'next/image';
import classNames from 'classnames';
import moment from 'moment';

export default function ArticleTemplate({ isBest, article }) {
  return (
    <div
      className={classNames(styles['container'], { [styles['best']]: isBest })}
    >
      {isBest ? (
        <div className={styles['badge-container']}>
          <Image fill src="/badge.svg" alt="badge" />
        </div>
      ) : null}
      <div className={styles['article-main']}>
        <div className={styles['article-content']}>{article.title}</div>
        {article.image ? (
          <div className={styles['article-product-image']}>
            <Image src={article.image} fill alt="item-image" />
          </div>
        ) : null}
      </div>
      {isBest ? (
        <div className={styles['article-info']}>
          <div className={styles['article-meta']}>
            <div className={styles['article-user']}>{article.user.name}</div>
            <div className={styles['favorite-count']}>
              <div className={styles['favorite-image']}>
                <Image src="/favorite.svg" alt="favorite-count" fill />
              </div>
              {article.count}+
            </div>
          </div>
          <div className={styles['article-updated']}>
            {moment(article.createdAt).format('YYYY. MM. DD')}
          </div>
        </div>
      ) : (
        <div className={styles['article-info']}>
          <div className={styles['article-meta']}>
            <div className={styles['article-user-image']}>
              <Image src={article.user.image} fill alt="item-image" />
            </div>
            <div className={styles['article-user']}>{article.user.name}</div>
            <div className={styles['article-updated']}>
              {moment(article.createdAt).format('YYYY. MM. DD')}
            </div>
          </div>
          <div className={styles['favorite-count']}>
            <div className={styles['favorite-image']}>
              <Image src="/favorite.svg" alt="favorite-count" fill />
            </div>
            {article.count}+
          </div>
        </div>
      )}
    </div>
  );
}
