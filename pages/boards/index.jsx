import {
  QueryClient,
  dehydrate,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getArticleList } from "@/lib/api";
import BestArticles from "@/components/BestArticles/BestArticles";
import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/pages/Board.module.scss";
import Button from "@/components/ui/Button";
import ArticleList from "@/components/ArticleList/ArticleList";
import SearchBar from "@/components/SearchBar/SearchBar";
import DropDown from "@/components/ui/DropDown";
import { PAGE_SIZE } from "@/var";

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

export default function Boards() {
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

  if (isPending) return <p>로딩중</p>;
  if (isError) return <p>에러</p>;

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
          <Link href="/boards/create-article" passHref>
            <Button type="primary">글쓰기</Button>
          </Link>
        </div>
        <div className={styles["article-section-secondbar"]}>
          <SearchBar setKeyword={setKeyword} />
          <DropDown setOrderBy={setOrderBy} orderBy={orderBy} />
        </div>
        <ArticleList data={pages} />

        <div ref={ref}>
          {isFetchingNextPage
            ? "더 불러오는중"
            : hasNextPage
            ? "새 게시물 불러오기"
            : "더 불러올 게시물이 없습니다"}
        </div>
      </section>
    </>
  );
}
