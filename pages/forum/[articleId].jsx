import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { QueryClient, useQuery, dehydrate } from "@tanstack/react-query";
import { formatDate, formatLikes } from "@/lib/utils";
import { getArticleById } from "@/lib/api";
import KebabMenu from "@/components/ui/KebabMenu";
import ProfileImg from "@/components/ui/ProfileImg";
import inactiveHeart from "@/public/assets/icons/ic_heart_inactive.svg";
import CommentList from "@/components/CommentList";
import returnIcon from "../../public/assets/icons/ic_arrow_return.svg";
import Msg from "@/components/ui/Msg";
import Loader from "@/components/ui/Loader";
import styles from "@/styles/pages/forum/articleId.module.scss";

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();

  const { articleId } = context.params;
  await queryClient.prefetchQuery({
    queryKey: ["article", { articleId }],
    queryFn: () => getArticleById(articleId),
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function ArticleDetailPage() {
  const router = useRouter();
  const { articleId } = router.query;

  const {
    isPending,
    isError,
    error,
    data: article,
  } = useQuery({
    queryKey: ["article", { articleId }],
    queryFn: () => getArticleById(articleId),
  });

  if (isPending) return <Loader />;
  if (isError) {
    const errMsg = error?.message;
    return <Msg type="error" msg={errMsg} />;
  }

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
          <div className={styles.middle}>
            <div className={styles.user}>
              <ProfileImg width="40px" src={article.image} />
              <span className={styles.name}>
                {article.writer?.nickname || "총명한 판다"}
              </span>
              <span>{formatDate(article.createdAt)}</span>
            </div>

            <div className={styles["vertical-line"]}></div>

            <button className={styles.likes}>
              <Image
                src={inactiveHeart}
                alt="heart icon"
                width={32}
                height={32}
              />
              <span>{formatLikes(article.likeCount)}</span>
            </button>
          </div>
          <p className={styles.bottom}>{article.content}</p>
        </article>

        <CommentList />

        <Link href="/forum">
          <button className={styles["return-btn"]}>
            <span>목록으로 돌아가기</span>
            <Image src={returnIcon} alt="returnIcon" width={24} height={24} />
          </button>
        </Link>
      </section>
    </>
  );
}
