import { useRouter } from "next/router";
import BoardDetailInfo from "@/components/BoardDetailComponents/BoardDetailInfo.jsx";
import BoardChat from "@/components/BoardDetailComponents/BoardChat.jsx";
import styles from "./[id].module.css";
import Link from "next/link";
import { fetchArticle } from "@/utils/articleApi";
import { fetchComments } from "@/utils/articleChatApi";
import { ROUTES } from "@/utils/rotues";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const comments = await fetchComments(id);

    return {
      props: {
        initialComments: comments.list || [],
        articleId: id,
        error: null,
      },
    };
  } catch (error) {
    console.error("Error fetching comments:", error);
    return {
      notFound: true,
      error: "댓글을 불러오는 중 문제가 발생했습니다.",
    };
  }
}

export default function BoardDetail({ initialComments, articleId, error }) {
  const [article, setArticle] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    const fetchArticleData = async () => {
      try {
        const fetchedArticle = await fetchArticle(articleId);
        setArticle(fetchedArticle);
      } catch (fetchError) {
        console.error("Error fetching article:", fetchError);
        toast.error("게시글을 불러오는 중 문제가 발생했습니다.");
      }
    };

    if (articleId) {
      fetchArticleData();
    }
  }, [articleId, error]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!article) {
    return <p>Article not found</p>;
  }

  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} />
      <BoardDetailInfo article={article} />
      <BoardChat initialComments={initialComments} articleId={articleId} />
      <Link href={ROUTES.BOARD} passHref>
        <button className={styles.backBtn}>목록으로 돌아가기</button>
      </Link>
    </div>
  );
}
