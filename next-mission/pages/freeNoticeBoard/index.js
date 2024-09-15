import Article from "@/components/freeNoticeBoard/Article";
import BestArticle from "@/components/freeNoticeBoard/BestArticle";
import Head from "next/head";
import instance from "@/lib/axios.js";
import { useEffect, useState } from "react";
import Spinner from "@/components/public/Spinner";
import styles from "@/styles/FreeNoticeBoard.module.css";

export async function getServerSideProps() {
  const res = await instance.get(`/noticeBoards?page=1&pageSize=7`);
  const data = res.data.list ?? [];
  const total = res.data.total ?? 0;

  return {
    props: {
      data,
      total,
    },
  };
}

export default function FreeNoticeBoard({ data, total }) {
  const [list, setList] = useState(data);
  const [page, setPage] = useState(1); // 현재 페이지
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지 여부
  const [keyWord, setKeyWord] = useState("");

  // 검색에 따른 게시물 변경 함수
  async function searchValue(value) {
    const res = await instance.get(`/noticeBoards?keyWord=${value}`);
    setList(res.data.list);
    setKeyWord(value);
  }

  // API를 통해 데이터를 가져오는 함수
  const fetchItems = async (pageNumber) => {
    try {
      const res = await instance.get(
        `/noticeBoards?page=${pageNumber}&pageSize=7&keyWord=${keyWord}`
      );
      const data = res.data.list;
      setList((prevList) => [...prevList, ...data]);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    if (list.length === total) {
      setHasMore(false); // 더 이상 데이터가 없으면 false로 설정
    }
  }, [list]);

  // 페이지가 변경될 때마다 데이터를 가져옴
  useEffect(() => {
    if (page !== 1) {
      fetchItems(page);
    }
  }, [page]);

  // 페이지를 증가시키는 함수
  const loadMoreItems = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <Head>
        <title>자유게시판 - 판다마켓</title>
      </Head>
      <BestArticle list={data} />
      <Article
        list={list}
        hasMore={hasMore} // 추가 데이터 여부
        loadMore={loadMoreItems} // 페이지를 로드하는 함수
        searchValue={searchValue}
      />
    </>
  );
}
