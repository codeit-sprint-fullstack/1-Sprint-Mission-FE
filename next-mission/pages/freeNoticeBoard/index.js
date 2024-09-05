import Article from "@/components/freeNoticeBoard/Article";
import VastArticle from "@/components/freeNoticeBoard/VastArticle";
import Head from "next/head";

export default function freeNoticeBoard() {
  return (
    <>
      <Head>
        <title>자유게시판 - 판다마켓</title>
      </Head>
      <div>
        <VastArticle />
        <Article />
      </div>
    </>
  );
}
