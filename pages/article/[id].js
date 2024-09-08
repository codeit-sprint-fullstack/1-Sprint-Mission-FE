import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '@/styles/Article.module.css';
import backBtn from '@/public/btn_back.png';
import Comment from '@/components/ArticleDetail/Comment.js';
import ArticleDetailInfo from '@/components/ArticleDetail/ArticleDetailInfo';

export default function Article() {
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [articleId, setArticleId] = useState('');

  const router = useRouter();
  const { id } = router.query;

  async function getArticle(targetId) {
    try {
      const res = await axios.get(
        `https://sprint-be-h8kw.onrender.com/articles/${targetId}`
      );
      const nextArticle = res.data;
      setArticle(nextArticle);
      setArticleId(nextArticle.id);
      if (nextArticle.comment.length > 0) {
        setComments(nextArticle.comment);
      }
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  async function deleteArticle(targetId) {
    try {
      const res = await axios.delete(
        `https://sprint-be-h8kw.onrender.com/articles/${targetId}`
      );
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
        <Comment comments={comments} articleId={articleId} />
        <Link href='/freeboard'>
          <Image
            src={backBtn}
            alt='목록으로 돌아긱 버튼'
            className={styles.backBtn}
            priority
          />
        </Link>
      </div>
    </>
  );
}
