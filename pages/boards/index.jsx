import { QueryClient, dehydrate } from "@tanstack/react-query";
import BestArticles from "@/components/BestArticles/BestArticles";
import Head from "next/head";
import Button from "@/components/Button/Button";
import ArticleList from "@/components/ArticleList/ArticleList";
import { getArticleList } from "@/lib/api";
import styles from "@/styles/pages/Board.module.scss";
import { useState, useEffect } from "react";

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["bestArticles"],
      queryFn: () => getArticleList({ limit: 3, sortBy: "best" }),
    });

    await queryClient.prefetchQuery({
      queryKey: ["articles"],
      queryFn: () => getArticleList({ limit: 10, sortBy: "recent" }),
    });

    const bestArticleData = queryClient.getQueryData(["bestArticles"]) || [];
    const articleData = queryClient.getQueryData(["articles"]) || [];

    const { list } = bestArticleData;

    return {
      props: {
        list,
        articleData,
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

export default function Boards({ list: bestArticleList, articleData }) {
  return (
    <>
      <Head>
        <title>자유 게시판</title>
      </Head>
      <section className={styles["best-section"]}>
        <h2>베스트 게시글</h2>
        <BestArticles list={bestArticleList} />
      </section>
      <section className={styles["article-section"]}>
        <div>
          <h2>게시글</h2>
          <Button type="primary">글쓰기</Button>
        </div>
        <ArticleList />
      </section>
    </>
  );
}
