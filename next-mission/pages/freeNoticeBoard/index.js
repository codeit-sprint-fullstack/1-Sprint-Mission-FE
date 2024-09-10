import Article from "@/components/freeNoticeBoard/Article";
import BestArticle from "@/components/freeNoticeBoard/BestArticle";
import Head from "next/head";
import axios from "@/lib/axios.js";
import { useEffect, useState } from "react";

export async function getServerSideProps() {
  const res = await axios.get(`/noticeBoards?page=1&pageSize=6`);
  const total = res.data.total ?? 0;
  const data = res.data.list ?? [];

  return {
    props: {
      total,
      data,
    },
  };
}

export default function freeNoticeBoard({ data, total }) {
  const [list, setList] = useState(data)


  return (
    <>
      <Head>
        <title>자유게시판 - 판다마켓</title>
      </Head>
      <BestArticle list={list} />
      <Article list={list} total={total} />
    </>
  );
}
