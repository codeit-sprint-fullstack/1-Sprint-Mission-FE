import styles from '@app/articles/[id]/page.module.css';
import moment from 'moment';
import Image from 'next/image';
import { getArticleList, getArticle } from '@utils/api/api';
import ActionDropdown from '@shared/components/dropdowns/ActionDropdown';
import { ArticleComment } from '@shared/components/article/ArticleComment';
import ImageActionButton from '@shared/components/Buttons/ImageActionButton';

export async function generateStaticParams() {
  const response = await getArticleList();
  const ArticlesId = response.map((article) => ({
    id: article.id.toString(),
  }));
  return ArticlesId;
}

export default async function ArticleDetail({ params }) {
  const response = await getArticle(params.id);
  const article = response;

  return (
    <>
      <div className={styles['container']}>
        <div className={styles['article-title']}>
          {article.title}
          <ActionDropdown />
        </div>
        <div className={styles['article-info']}>
          <div className={styles['article-meta']}>
            <div className={styles['article-user-image']}>
              {article.user ? (
                <Image src={article.user.image} fill alt="user-image" />
              ) : null}
            </div>
            {article.user ? (
              <div className={styles['article-user']}>{article.user.name}</div>
            ) : null}
            <div className={styles['article-updated']}>
              {moment(article.createdAt).format('YYYY. MM. DD')}
            </div>
          </div>
          <div className={styles['line']} />
          <div className={styles['favorite-count']}>
            <div className={styles['favorite-image']}>
              <Image src="/favorite.svg" alt="favorite-count" fill />
            </div>
            {article.count}
          </div>
        </div>
        <div className={styles['article-content']}>{article.content}</div>
        <ArticleComment />
        <ImageActionButton content={'목록으로 돌아가기'} type={'return'} />
      </div>
    </>
  );
}
