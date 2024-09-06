import { useRouter } from "next/router";
import BoardDetailInfo from "@/components/BoardDetailComponents/BoardDetailInfo";
import styles from "./[id].module.css";
import Link from "next/link";
export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const res = await fetch(`https://thrift-shop.onrender.com/articles/${id}`);
    const article = await res.json();

    if (!res.ok) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        article,
      },
    };
  } catch (error) {
    console.error("Error fetching article:", error);

    return {
      notFound: true,
    };
  }
}

export default function BoardDetail({ article }) {
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
      <Link href="/board" passHref>
        <button className={styles.backBtn}>목록으로 돌아가기</button>
      </Link>
    </div>
  );
}
