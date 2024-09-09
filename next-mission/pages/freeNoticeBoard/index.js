import Article from "@/components/freeNoticeBoard/Article";
import BestArticle from "@/components/freeNoticeBoard/BestArticle";
import Head from "next/head";
import axios from "@/lib/axios.js";

export async function getServerSideProps() {
  const res = await axios.get("/noticeBoards")
  const total = res.data.total ?? 0
  const list = res.data.total ?? []
  
  return {
    props: {
      total,
      list
    }
  }
}

export default function freeNoticeBoard({ total, list}) {
  return (
    <>
      <Head>
        <title>자유게시판 - 판다마켓</title>
      </Head>
      <BestArticle list={list}/>
      <Article total={total} list={list}/>
    </>
  );
}
