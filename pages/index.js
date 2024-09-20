import styles from "@/styles/Home.module.css";
import Head from "next/head";
import BestArticleList from "@/components/BestArticleList";
import ArticleList from "@/components/ArticleList";

export default function Home() {
  return (
    <>
      <Head>
        <title>자유게시판</title>
      </Head>
      <BestArticleList />
      <ArticleList />
    </>
  );
}
