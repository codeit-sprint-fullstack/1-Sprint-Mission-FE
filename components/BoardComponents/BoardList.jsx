import styles from "./BoardList.module.css";
import SearchBar from "@/components/BoardComponents/SearchBar.jsx";
import BoardListItems from "@/components/BoardComponents/BoardListItems.jsx";
import Link from "next/link";
import { useState } from "react";
import { ROUTES } from "@/utils/rotues";

export default function BoardList({ articles, onSearch, onSortChange }) {
  const [keyword, setKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("recent");

  const handleSortChange = (value) => {
    setSortOrder(value);
    onSortChange(value);
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleKeywordSearch = () => {
    onSearch(keyword);
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
