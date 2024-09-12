import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '@/styles/Article.module.css';
import backBtn from '@/public/btn_back.png';
import Comments from '@/components/ArticleDetail/Comments.js';
import ArticleDetailInfo from '@/components/ArticleDetail/ArticleDetailInfo';

export default function Article() {
  const [article, setArticle] = useState(null);
  const [articleId, setArticleId] = useState('');

  const router = useRouter();
  const { id } = router.query;

  async function getArticle(targetId) {
    try {
      const res = await axios.get(
        `https://sprint-be-k938.onrender.com/articles/${targetId}`
      );
      const nextArticle = res.data;
      setArticle(nextArticle);
      setArticleId(nextArticle.id);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  async function deleteArticle(targetId) {
    try {
      const res = await axios.delete(
        `https://sprint-be-k938.onrender.com/articles/${targetId}`
      );
      router.push('/freeboard');
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  useEffect(() => {
    if (!id) return;
    getArticle(id);
  }, [id]);

  if (!id) return null;
  if (!article) return <div>Loading...</div>;

  return (
    <>
      <div className={styles.article}>
        <ArticleDetailInfo
          article={article}
          id={id}
          deleteArticle={deleteArticle}
        />
        <Comments articleId={articleId} />
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
