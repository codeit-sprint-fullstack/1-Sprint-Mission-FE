import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import backBtn from '@/public/btn_back.png';
import Comments from '@/components/ArticleDetail/Comments.js';
import ArticleDetail from '@/components/FleaMarket/ArticleDetail';
import styles from '@/styles/Article.module.css';
import { useGetArticle } from '@/hooks/useFleaMarket';

export default function ArticlePage() {
  const router = useRouter();
  const id = router.query.id;

  const category = 'fleamarket';

  const { isLoading, data: article } = useGetArticle(id);

  return (
    <>
      <div className={styles.article}>
        <ArticleDetail
          article={article}
          category={category}
          id={id}
          handleDeleteArticle={() => handleDeleteArticle(id)}
        />
        <Comments articleId={id} category={category} />

        <Link href={'/fleamarket'}>
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
