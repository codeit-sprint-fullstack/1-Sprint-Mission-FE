import {
  QueryClient,
  dehydrate,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Head from "next/head";
import Link from "next/link";
import { getArticleList } from "@/lib/api";
import { PAGE_SIZE } from "@/variables/var";
import BestArticles from "@/components/article/BestArticles";
import ArticleList from "@/components/article/ArticleList";
import SearchBar from "@/components/form/SearchBar";
import Button from "@/components/ui/Button";
import DropDown from "@/components/ui/DropDown";
import Msg from "@/components/ui/Msg";
import Loader from "@/components/ui/Loader";

import styles from "@/styles/pages/forum/main.module.scss";

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  try {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ["bestArticles"],
        queryFn: () => getArticleList({ pageSize: 3, orderBy: "like" }),
      }),
      queryClient.prefetchInfiniteQuery({
        queryKey: ["articles", { orderBy: "recent", keyword: "" }],
        queryFn: () => getArticleList({ orderBy: "recent" }),
        initialPageParam: 1,
      }),
    ]);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (err) {
    console.error(err.message);
    if (err.response) {
      console.log(err.response.status);
      console.log(err.response.data);
    } else {
      console.error("Error", err);
    }
  }
}

export default function ForumPage() {
  const [keyword, setKeyword] = useState("");
  const [orderBy, setOrderBy] = useState("recent");
  const { ref, inView } = useInView();

  const {
    data: articleData,
    isFetchingNextPage,
    isPending,
    isError,
    isFetching,
    hasNextPage,
    error,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["articles", { orderBy, keyword }],
    queryFn: ({ pageParam = 1 }) =>
      getArticleList({
        keyword,
        orderBy,
        page: pageParam,
        pageSize: PAGE_SIZE.DEFAULT,
      }),

    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || !Array.isArray(lastPage.list)) {
        return undefined;
      }
      if (!lastPage || !lastPage.list) {
        return undefined;
      }
      if (lastPage.list.length < PAGE_SIZE.DEFAULT) {
        return undefined;
      }
      return allPages.length + 1;
    },
    keepPreviousData: true,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage, isFetching]);

  if (isPending) return <Loader />;
  if (isError) {
    const errMsg = error?.message;
    return <Msg type="error" msg={errMsg} />;
  }

  const pages = articleData?.pages || [];

  return (
    <>
      <Head>
        <title>자유 게시판</title>
      </Head>

      <section className={styles["best-section"]}>
        <h2>베스트 게시글</h2>
        <BestArticles />
      </section>
      <section className={styles["article-section"]}>
        <div className={styles["article-section-topbar"]}>
          <h2>
            전체 게시글 <span>{`(${pages[0].totalCount})`}</span>
          </h2>
          <Link href="/forum/create-article" passHref>
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
            <Msg msg="더 불러올 게시물이 없습니다" />
          )}
        </div>
      </section>
    </>
  );
}
