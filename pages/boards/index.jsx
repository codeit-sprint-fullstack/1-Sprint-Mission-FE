import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import BestArticles from "@/components/BestArticles/BestArticles";
import Head from "next/head";
import Button from "@/components/Button/Button";
import ArticleList from "@/components/ArticleList/ArticleList";
import { getArticleList } from "@/lib/api";
import styles from "@/styles/pages/Board.module.scss";
import Link from "next/link";
import { useState } from "react";
import SearchBar from "@/components/SearchBar/SearchBar";
import DropDown from "@/components/DropDown/DropDown";

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  try {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ["bestArticles"],
        queryFn: () => getArticleList({ limit: 3, sortBy: "best" }),
      }),
      queryClient.prefetchQuery({
        queryKey: ["articles", "recent"],
        queryFn: () => getArticleList({ sortBy: "recent" }),
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
  const [sortBy, setSortBy] = useState("recent");

  const {
    data: allArticles,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["articles", sortBy, keyword || "none"],
    queryFn: () => getArticleList({ keyword, sortBy }),
    enabled: !!sortBy,
  });

  if (isLoading) return <p>로딩중</p>;
  if (isError) return <p>에러</p>;

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
          <DropDown setSortBy={setSortBy} sortBy={sortBy} />
        </div>
        <ArticleList data={allArticles} />
      </section>
    </>
  );
}
