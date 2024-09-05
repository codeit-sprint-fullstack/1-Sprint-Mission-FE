import Article from "@/components/freeNoticeBoard/Article";
import BestArticle from "@/components/freeNoticeBoard/BestArticle";
import Head from "next/head";

export default function freeNoticeBoard() {
  return (
    <>
      <Head>
        <title>자유게시판 - 판다마켓</title>
      </Head>
      <BestArticle />
      <Article />
    </>
  );
}
