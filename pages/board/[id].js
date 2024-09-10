import { useRouter } from "next/router";
import BoardDetailInfo from "@/components/BoardDetailComponents/BoardDetailInfo";
import BoardChat from "@/components/BoardDetailComponents/BoardChat";
import styles from "./[id].module.css";
import Link from "next/link";
import { fetchArticle } from "@/utils/articleApi";
import { fetchComments } from "@/utils/chatApi"; // createComments 불필요 시 제거

export async function getServerSideProps(context) {
  const { id } = context.params;
  const { page = 1, size = 4 } = context.query;

  try {
    const article = await fetchArticle(id);
    const comments = await fetchComments(id, page, size); // 수정된 부분

    return {
      props: {
        article,
        initialComments: comments.data || [],
        totalComments: comments.total || 0,
        initialPage: page,
        pageSize: size,
      },
    };
  } catch (error) {
    console.error("Error fetching article:", error);
    return {
      notFound: true,
    };
  }
}

export default function BoardDetail({
  article,
  initialComments,
  totalComments,
  pageSize,
}) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!article) {
    return <p>Article not found</p>;
  }

  return (
    <div className={styles.container}>
      <BoardDetailInfo article={article} />
      <BoardChat
        initialComments={initialComments}
        articleId={article.id}
        totalComments={totalComments}
        pageSize={pageSize}
      />
      <Link href="/board" passHref>
        <button className={styles.backBtn}>목록으로 돌아가기</button>
      </Link>
    </div>
  );
}
