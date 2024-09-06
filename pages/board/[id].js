import { useRouter } from "next/router";
import BoardDetailInfo from "@/components/BoardDetailComponents/BoardDetailInfo";
import BoardChat from "@/components/BoardDetailComponents/BoardChat";
import styles from "./[id].module.css";
import Link from "next/link";
import { fetchArticle } from "@/utils/articleApi";
import { createComments, fetchComments } from "@/utils/chatApi";

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const article = await fetchArticle(id);
    const comments = await fetchComments(id);

    return {
      props: {
        article,
        comments,
      },
    };
  } catch (error) {
    console.error("Error fetching article:", error);
    return {
      notFound: true,
    };
  }
}

export default function BoardDetail({ article, comments }) {
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
      <BoardChat comments={comments} articleId={article.id} />
      <Link href="/board" passHref>
        <button className={styles.backBtn}>목록으로 돌아가기</button>
      </Link>
    </div>
  );
}
