import styles from "./BoardList.module.css";
import SearchBar from "@/components/BoardComponents/SearchBar.jsx";
import BoardListItems from "@/components/BoardComponents/BoardListItems.jsx";
import Link from "next/link";
import { useState } from "react";
import { ROUTES } from "@/utils/rotues";
import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "@/utils/articleApi";

export default function BoardList({ initialArticles }) {
  const [keyword, setKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("recent");

  const {
    data: articles,
    refetch,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["articles", { sortOrder }],
    queryFn: () =>
      fetchArticles({
        orderBy: sortOrder,
        keyword,
        page: 1,
        pageSize: 5,
      }),
    initialData: initialArticles,
    keepPreviousData: true,
  });

  const handleSortChange = (value) => {
    setSortOrder(value);
    refetch();
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleKeywordSearch = () => {
    refetch();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleKeywordSearch();
    }
  };

  if (isFetching) return <p>Loading...</p>;
  if (error) return <p>Failed to load articles: {error.message}</p>;

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
      <BoardListItems articles={articles?.list || []} />
    </>
  );
}
