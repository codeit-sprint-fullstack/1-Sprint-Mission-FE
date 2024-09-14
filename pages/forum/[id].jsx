import KebabMenu from "@/components/ui/KebabMenu";
import Head from "next/head";
import ProfileImg from "@/components/ui/ProfileImg";
import { getArticleById } from "@/lib/api";
import { QueryClient, useQuery, dehydrate } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { formatDate, formatLikes } from "@/lib/utils";
import inactiveHeart from "@/public/assets/icons/ic_heart_inactive.svg";
import Image from "next/image";
import CommentList from "@/components/CommentList";
import styles from "@/styles/pages/Forum.module.scss";

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();

  const { id } = context.params;
  await queryClient.prefetchQuery({
    queryKey: ["article", { id }],
    queryFn: () => getArticleById(id),
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function ArticleDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const {
    isPending,
    isError,
    data: article,
  } = useQuery({
    queryKey: ["article", { id }],
    queryFn: () => getArticleById(id),
  });

  if (isPending) return <div>로딩중</div>;
  if (isError) return <div>로딩중</div>;

  return (
    <>
      <Head>
        <title>자유 게시판</title>
      </Head>

      <section className={styles["article-section"]}>
        <article>
          <div className={styles.top}>
            <h3>{article.title}</h3>
            <KebabMenu />
          </div>
          <div className={styles.bottom}>
            <div className={styles.user}>
              <ProfileImg width="40px" src={article.image} />
              <span>{article.writer?.name || "총명한 판다"}</span>
              <span>{formatDate(article.createdAt)}</span>
            </div>
            <div className={styles["vertical-line"]}></div>
            <div className={styles.likes}>
              <Image
                src={inactiveHeart}
                alt="heart icon"
                width={32}
                height={32}
              />
              {formatLikes(article.likeCount)}
            </div>
          </div>
        </article>

        <CommentList />
      </section>
    </>
  );
}
