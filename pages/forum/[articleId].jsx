import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { QueryClient, useQuery, dehydrate } from "@tanstack/react-query";
import { getArticleById } from "@/lib/api";
import ArticleDetail from "@/components/article/ArticleDetail";
import CommentList from "@/components/comment/CommentList";
import Message from "@/components/ui/Message";
import Loader from "@/components/ui/Loader";
import returnIcon from "@/public/assets/icons/ic_arrow_return.svg";
import styles from "@/styles/pages/forum/articleId.module.scss";
import { articleKey } from "@/variables/queryKeys";
import CommentForm from "@/components/form/CommentForm";

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();

  const { articleId } = context.params;
  await queryClient.prefetchQuery({
    queryKey: articleKey.detail(articleId),
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
    queryKey: articleKey.detail(articleId),
    queryFn: () => getArticleById(articleId),
    enabled: !!articleId,
  });

  if (isPending) return <Loader />;
  if (isError) {
    const errMsg = error?.message;
    return <Message type="error" msg={errMsg} />;
  }

  return (
    <>
      <Head>
        <title>자유 게시판</title>
      </Head>

      <section className={styles["article-section"]}>
        <ArticleDetail article={article} />

        <CommentForm articleId={article.id} />

        <CommentList articleId={article.id} />

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
