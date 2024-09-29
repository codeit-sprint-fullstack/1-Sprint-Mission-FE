import { QueryClient, dehydrate } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Head from "next/head";
import Link from "next/link";
import { articleKey } from "@/variables/queryKeys";
import { useGetInfiniteList } from "@/service/queries";
import { getArticleList } from "@/service/api/article";
import BestArticles from "@/components/article/BestArticles";
import ArticleList from "@/components/article/ArticleList";
import SearchBar from "@/components/form/SearchBar";
import Button from "@/components/ui/Button";
import DropDown from "@/components/ui/DropDown";
import Loader from "@/components/ui/Loader";
import styles from "@/styles/pages/forum/main.module.scss";
import Message from "@/components/ui/Message";
import { ENTITY } from "@/variables/entities";

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: articleKey.list({ pageSize: 3, orderBy: "like" }),
      queryFn: () => getArticleList({ pageSize: 3, orderBy: "like" }),
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: articleKey.list({ orderBy: "recent", keyword: "" }),
      queryFn: () => getArticleList({ orderBy: "recent" }),
      initialPageParam: 1,
    }),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function ForumPage() {
  const [keyword, setKeyword] = useState("");
  const [orderBy, setOrderBy] = useState("recent");
  const { ref, inView } = useInView();
  const entity = ENTITY.ARTICLE;

  const {
    data: articleData,
    isFetchingNextPage,
    isError,
    isFetching,
    hasNextPage,
    error,
    fetchNextPage,
  } = useGetInfiniteList(entity, { orderBy, keyword });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage, isFetching]);

  if (isError) {
    const errMsg = error?.message;
    return <Message type="error" msg={errMsg} />;
  }

  const pages = articleData?.pages || [];

  return (
    <>
      <Head>
        <title>자유 게시판</title>
      </Head>

      <section className={styles["best-section"]}>
        <h2>베스트 게시글</h2>
        <BestArticles entity={entity} />
      </section>
      <section className={styles["article-section"]}>
        <div className={styles["article-section-topbar"]}>
          <h2>
            전체 게시글 <span>{`(${pages[0]?.totalCount})`}</span>
          </h2>
          <Link href="/forum/registration" passHref>
            <Button variant="primary">글쓰기</Button>
          </Link>
        </div>
        <div className={styles["article-section-secondbar"]}>
          <SearchBar setKeyword={setKeyword} />
          <DropDown setOrderBy={setOrderBy} orderBy={orderBy} />
        </div>

        <ArticleList data={pages} />

        <div ref={ref}>
          {isFetchingNextPage ? (
            <Loader msg="더 불러오는중" />
          ) : hasNextPage ? (
            <Loader msg="새 게시물 불러오는 중" />
          ) : (
            <Message msg="더 불러올 게시물이 없습니다" />
          )}
        </div>
      </section>
    </>
  );
}
