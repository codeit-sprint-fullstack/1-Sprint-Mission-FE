import styles from "./BoardList.module.css";
import SearchBar from "@/components/BoardComponents/SearchBar";
import BoardListItems from "@/components/BoardComponents/BoardListItems";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { ROUTES } from "@/utils/rotues";

export default function BoardList({ articles }) {
  const router = useRouter();
  const [keyword, setKeyword] = useState(router.query.keyword || "");
  const [sortOrder, setSortOrder] = useState(router.query.sort || "createdAt");

  const handleSortChange = (value) => {
    setSortOrder(value);
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, sort: value, page: 1 },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleKeywordSearch = () => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, keyword, page: 1 },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleKeywordSearch();
    }
  };

  return (
    <>
      <div className={styles.createContainer}>
        <h3>게시글</h3>
        <Link href={ROUTES.CREATE_BOARD}>
          <button className={styles.createBtn}>글쓰기</button>
        </Link>
      </div>
      <SearchBar
        keyword={keyword}
        onKeywordChange={handleKeywordChange}
        onKeyDown={handleKeyDown}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
      />
      <BoardListItems articles={articles} />
    </>
  );
}
