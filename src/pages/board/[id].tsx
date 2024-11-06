import { useRouter } from "next/router";
import BoardDetailInfo from "@/components/BoardDetailComponents/BoardDetailInfo";
import BoardChat from "@/components/BoardDetailComponents/BoardChat";
import styles from "./[id].module.css";
import Link from "next/link";
import { fetchArticle } from "@/utils/articleApi";
import { fetchComments } from "@/utils/articleChatApi";
import { ROUTES } from "@/utils/rotues";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { Article } from "@/types/Types";

interface Comment {
  id: number;
  content: string;
  createdAt: string;
}

interface BoardDetailProps {
  initialComments: Comment[];
  articleId: number;
  error?: string | null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;

  try {
    const comments = await fetchComments(parseInt(id as string, 10));

    return {
      props: {
        initialComments: comments.list || [],
        articleId: parseInt(id as string, 10),
        error: null,
      },
    };
  } catch (error) {
    console.error("Error fetching comments:", error);
    return {
      notFound: true,
      props: {
        initialComments: [],
        articleId: parseInt(id as string, 10),
        error: "댓글을 불러오는 중 문제가 발생했습니다.",
      },
    };
  }
};

export default function BoardDetail({
  initialComments,
  articleId,
  error,
}: BoardDetailProps) {
  const [article, setArticle] = useState<Article | null>(null);
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
      <BoardDetailInfo article={article} />
      <BoardChat initialComments={initialComments} articleId={articleId} />
      <Link href={ROUTES.BOARD} passHref>
        <button className={styles.backBtn}>목록으로 돌아가기</button>
      </Link>
    </div>
  );
}
