import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import backBtn from '@/public/btn_back.png';
import Comments from '@/components/Comment/Comments.js';
import ArticleDetail from '@/components/FleaMarket/ArticleDetail';
import styles from '@/styles/Article.module.css';
import { useGetArticle } from '@/hooks/useFleaMarket';

export default function ArticlePage() {
  const router = useRouter();
  const id = router.query.id;

  const category = 'fleamarket';

  const { isLoading, data: article } = useGetArticle(id);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        // toast.error('로그인을 해야 합니다.');
        router.push('/login'); //비동기
      }
    };

    fetchData();
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
