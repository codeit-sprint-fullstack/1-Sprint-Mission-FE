import Head from "next/head";
import { useRouter } from "next/router";
import { QueryClient, useQuery, dehydrate } from "@tanstack/react-query";
import { getArticleById } from "@/service/api/article";
import ArticleDetail from "@/components/article/ArticleDetail";
import CommentList from "@/components/comment/CommentList";
import Message from "@/components/ui/Message";
import { articleKey } from "@/variables/queryKeys";
import CommentForm from "@/components/form/CommentForm";
import ReturnToListBtn from "@/components/ui/ReturnToListBtn";
import styles from "@/styles/pages/forum/main.module.scss";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";

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
  const { user } = useAuth(true);
  const { articleId } = router.query;

  const {
    isError,
    error,
    data: article,
  } = useQuery({
    queryKey: articleKey.detail(articleId),
    queryFn: () => getArticleById(articleId),
    enabled: !!articleId,
  });

  if (isError) {
    const errMsg = error?.message;
    return <Message type="error" msg={errMsg} />;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>자유 게시판</title>
      </Head>

      <section className={styles.ArticleDetailPage}>
        <ArticleDetail article={article} />

        <CommentForm idPath={article.id} entity="article" />

        <CommentList idPath={article.id} entity="article" />
        <ReturnToListBtn />
      </section>
    </>
  );
}
