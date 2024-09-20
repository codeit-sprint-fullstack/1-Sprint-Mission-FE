import styles from '@app/articles/page.module.css';
import BestAritcles from '@shared/components/article/BestArticles';
import GeneralArticles from '@shared/components/article/GeneralArticles';
import ActionButton from '@shared/components/Buttons/ActionButton';
import { getArticleList } from '@utils/api/api';

export default async function Articles() {
  const bestArticles = await getArticleList({ orderBy: 'favorite', limit: 3 });
  const generalArticles = await getArticleList({ orderBy: 'recent', limit: 5 });

  return (
    <div className={styles['header']}>
      <div className={styles['header-title']}>베스트 게시글</div>
      <div className={styles['header-content']}>
        <BestAritcles article={bestArticles} />
      </div>
      <div className={styles['main-content']}>
        <div className={styles['main-title']}>
          게시글
          <ActionButton
            content={'글쓰기'}
            style={'write-button'}
            path={'/articles/create'}
          />
        </div>
        <GeneralArticles article={generalArticles} />
      </div>
    </div>
  );
}
