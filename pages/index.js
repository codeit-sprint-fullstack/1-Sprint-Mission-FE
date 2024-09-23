import styles from "@/styles/Home.module.css";
import Head from "next/head";
import BestArticle from "../components/bestArticle";
import ArticleList from "../components/aticleList";

export default function Home() {
  return (
    <>
      <Head>
        <title>자유게시판</title>
      </Head>
      <BestArticle />
      <ArticleList />
    </>
  );
}
