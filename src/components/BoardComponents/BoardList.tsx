import styles from "./BoardList.module.css";
import SearchBar from "@/components/BoardComponents/SearchBar";
import BoardListItems from "@/components/BoardComponents/BoardListItems";
import Link from "next/link";
import { useState, ChangeEvent, KeyboardEvent } from "react";
import { ROUTES } from "@/utils/rotues";

interface Article {
  id: number;
  title: string;
  content: string;
  images: string[];
  writer: {
    nickname: string;
  };
  createdAt: string;
  likeCount: number;
}

interface BoardListProps {
  articles: Article[];
  onSearch: (keyword: string) => void;
  onSortChange: (sortOrder: string) => void;
}

export default function BoardList({
  articles,
  onSearch,
  onSortChange,
}: BoardListProps) {
  const [keyword, setKeyword] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("recent");

  const handleSortChange = (value: string) => {
    setSortOrder(value);
    onSortChange(value);
  };

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleKeywordSearch = () => {
    onSearch(keyword);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
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
