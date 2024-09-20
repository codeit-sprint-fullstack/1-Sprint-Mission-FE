import styles from '@app/articles/[articleId]/page.module.css';
import moment from 'moment';
import Image from 'next/image';
import { getArticleList, getArticle } from '@utils/api/api';
import ActionDropdown from '@shared/components/dropdowns/ActionDropdown';
import { ArticleComment } from '@shared/components/article/comment/ArticleComment';
import ImageActionButton from '@shared/components/Buttons/ImageActionButton';

export async function generateStaticParams() {
  const response = await getArticleList();
  const ArticlesId = response.map((article) => ({
    articleId: article.id.toString(),
  }));
  return ArticlesId;
}

export async function generateMetadata({ params }) {
  const response = await getArticle(params.articleId);
  return {
    title: response.title,
    description: response.description,
  };
}

export default async function ArticleDetail({ params }) {
  const response = await getArticle(params.articleId);
  const article = response;

  return (
    <>
      <div className={styles['container']}>
        <div className={styles['article-title']}>
          {article.title}
          <ActionDropdown id={params.articleId} option={'article'} />
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
        <ArticleComment
          commentData={article.comment}
          articleId={params.articleId}
        />
        <ImageActionButton content={'목록으로 돌아가기'} type={'return'} />
      </div>
    </>
  );
}
