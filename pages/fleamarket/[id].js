import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import backBtn from '@/public/btn_back.png';
import Comments from '@/components/Comment/Comments.js';
import ArticleDetail from '@/components/FleaMarket/ArticleDetail';
import styles from '@/styles/Article.module.css';
import { useGetArticle } from '@/hooks/useFleaMarket';
import { useUserAuth } from '@/context/UserContextProvider';
import toast from 'react-hot-toast';

export default function ArticlePage() {
  const router = useRouter();
  const id = router.query.id;
  const { user } = useUserAuth();

  const category = 'fleamarket';
  let userId = user?.id;

  const { isLoading, data } = useGetArticle({ id, userId });

  // useEffect(() => {
  //   if (!user) {
  //     router.push('/login');
  //   }
  // }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.article}>
        <ArticleDetail
          article={data?.article}
          isLiked={data?.isLiked}
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
