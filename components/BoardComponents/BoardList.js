import styles from "./BoardList.module.css";
import SearchBar from "@/components/BoardComponents/SearchBar";
import BoardListItems from "@/components/BoardComponents/BoardListItems";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function BoardList({ articles }) {
  const router = useRouter();
  const [keyword, setKeyword] = useState(router.query.keyword || "");
  const [sortOrder, setSortOrder] = useState(router.query.sort || "createdAt");

  // 정렬 기준 변경 시 URL을 업데이트
  const handleSortChange = (value) => {
    setSortOrder(value);
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, sort: value, page: 1 }, // 정렬 기준과 페이지 1로 URL 변경
      },
      undefined,
      { shallow: true }
    ); // shallow로 페이지 새로고침 방지
  };

  // 검색어 변경 처리
  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  // 검색어 검색 처리
  const handleKeywordSearch = () => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, keyword, page: 1 }, // 검색어와 페이지 1로 URL 변경
      },
      undefined,
      { shallow: true }
    ); // shallow로 페이지 새로고침 방지
  };

  // 엔터 키로 검색 처리
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleKeywordSearch(); // 검색 실행
    }
  };

  return (
    <>
      <div className={styles.createContainer}>
        <h3>게시글</h3>
        <Link href="/createBoard">
          <button className={styles.createBtn}>글쓰기</button>
        </Link>
      </div>
      {/* 검색 바 컴포넌트 */}
      <SearchBar
        keyword={keyword}
        onKeywordChange={handleKeywordChange}
        onKeyDown={handleKeyDown}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
      />
      {/* 게시글 리스트 컴포넌트 */}
      <BoardListItems articles={articles} />
    </>
  );
}
