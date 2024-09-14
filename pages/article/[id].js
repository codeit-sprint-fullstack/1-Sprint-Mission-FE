import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import backBtn from '@/public/btn_back.png';
import Comments from '@/components/ArticleDetail/Comments.js';
import ArticleDetailInfo from '@/components/ArticleDetail/ArticleDetailInfo';
import styles from '@/styles/Article.module.css';

import { fetchArticle } from '@/utils/api/articleApi.js';

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const article = await fetchArticle(id);
    return {
      props: { article },
    };
  } catch (error) {
    console.error('Error fetching article:', error);
    return {
      notFound: true,
    };
  }
}

export default function ArticlePage({ article }) {
  const router = useRouter();
  const { id } = router.query;

  if (!article) return <div>Loading...</div>;

  return (
    <>
      <div className={styles.article}>
        <ArticleDetailInfo
          article={article}
          id={id}
          handleDeleteArticle={() => handleDeleteArticle(id)}
        />
        <Comments articleId={id} />
        <Link href='/freeboard'>
          <Image
            src={backBtn}
            alt='목록으로 돌아가기 버튼'
            className={styles.backBtn}
            priority
          />
        </Link>
      </div>
    </>
  );
}
