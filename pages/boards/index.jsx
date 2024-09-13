import {
  QueryClient,
  dehydrate,
  useInfiniteQuery,
} from "@tanstack/react-query";
import BestArticles from "@/components/BestArticles/BestArticles";
import Head from "next/head";
import Button from "@/components/ui/Button";
import ArticleList from "@/components/ArticleList/ArticleList";
import { getArticleList } from "@/lib/api";
import styles from "@/styles/pages/Board.module.scss";
import Link from "next/link";
import { useState } from "react";
import SearchBar from "@/components/SearchBar/SearchBar";
import DropDown from "@/components/ui/DropDown";

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  try {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ["bestArticles"],
        queryFn: () => getArticleList({ pageSize: 3, orderBy: "best" }),
      }),
      queryClient.prefetchQuery({
        queryKey: ["articles", { orderBy: "recent" }],
        queryFn: () => {
          getArticleList({ orderBy: "recent" });
          return {
            pages: [data],
          };
        },
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
    }
  }
}

export default function Boards() {
  const [keyword, setKeyword] = useState("");
  const [orderBy, setOrderBy] = useState("recent");

  const {
    data: articleData,
    isFetching,
    isError,
  } = useInfiniteQuery({
    queryKey: ["articles", { orderBy, keyword }],
    queryFn: ({ pageParams = 0 }) =>
      getArticleList({ keyword, orderBy, pageParams }),
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor || undefined;
    },
    keepPreviousData: true,
  });
  if (isFetching) return <p>로딩중</p>;
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
          <h2>게시글</h2>
          <Link href="/boards/create-article" passHref>
            <Button type="primary">글쓰기</Button>
          </Link>
        </div>
        <div className={styles["article-section-secondbar"]}>
          <SearchBar setKeyword={setKeyword} />
          <DropDown setOrderBy={setOrderBy} orderBy={orderBy} />
        </div>
        <ArticleList data={pages} />
      </section>
    </>
  );
}
