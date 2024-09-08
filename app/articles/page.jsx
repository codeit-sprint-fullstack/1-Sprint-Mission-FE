import styles from '@app/articles/page.module.css';
import ArticlesList from '@shared/components/article/ArticlesList';
import BestAritcle from '@shared/components/article/BestArticle';
import ActionButton from '@shared/components/Buttons/ActionButton';
import { getArticleList } from '@utils/api/api';

export default async function Articles() {
  const bestArticles = await getArticleList({ orderBy: 'favorite', limit: 3 });
  const articleList = await getArticleList({ orderBy: 'recent', limit: 5 });

  return (
    <div className={styles['header']}>
      <div className={styles['header-title']}>베스트 게시글</div>
      <div className={styles['header-content']}>
        <BestAritcle article={bestArticles} />
      </div>
      <div className={styles['main-content']}>
        <div className={styles['main-title']}>
          게시글
          <ActionButton
            content={'글쓰기'}
            type={'write'}
            path={'/articles/create'}
          />
        </div>
        <ArticlesList article={articleList} />
      </div>
    </div>
  );
}
