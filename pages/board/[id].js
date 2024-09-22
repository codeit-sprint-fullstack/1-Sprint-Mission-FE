import { useRouter } from "next/router";
import BoardDetailInfo from "@/components/BoardDetailComponents/BoardDetailInfo";
import BoardChat from "@/components/BoardDetailComponents/BoardChat";
import styles from "./[id].module.css";
import Link from "next/link";
import { fetchArticle } from "@/utils/articleApi";
import { fetchComments } from "@/utils/articleChatApi";
import { ROUTES } from "@/utils/rotues";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

export async function getServerSideProps(context) {
  const { id } = context.params;
  const { page = 1, size = 4 } = context.query;

  try {
    const article = await fetchArticle(id);
    const comments = await fetchComments(id, page, size);

    return {
      props: {
        article,
        initialComments: comments.data || [],
        totalComments: comments.total || 0,
        initialPage: page,
        pageSize: size,
        error: null,
      },
    };
  } catch (error) {
    console.error("Error fetching article:", error);
    return {
      notFound: true,
      error: "게시글을 불러오는 중 문제가 발생했습니다.",
    };
  }
}

export default function BoardDetail({
  article,
  initialComments,
  totalComments,
  pageSize,
  error,
}) {
  const router = useRouter();
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

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
      <BoardChat
        initialComments={initialComments}
        articleId={article.id}
        totalComments={totalComments}
        pageSize={pageSize}
      />
      <Link href={ROUTES.BOARD} passHref>
        <button className={styles.backBtn}>목록으로 돌아가기</button>
      </Link>
    </div>
  );
}
