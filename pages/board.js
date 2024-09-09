import { useState, useEffect, useCallback } from "react";
import BestProduct from "@/components/BoardComponents/BestProduct";
import BoardList from "@/components/BoardComponents/BoardList";
import { fetchArticles, fetchBestArticles } from "@/utils/articleApi";
import styles from "@/styles/board.module.css";

export async function getServerSideProps(context) {
  const {
    sort = "createdAt",
    keyword = "",
    page = 1,
    size = 4,
  } = context.query;

  const offset = (page - 1) * size;

  try {
    const articles = await fetchArticles({ sort, keyword, offset, size });
    const bestArticles = await fetchBestArticles();
    return {
      props: {
        initialArticles: articles.data || [],
        totalArticles: articles.total || 0,
        bestArticles,
        initialOffset: offset,
      },
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return {
      props: {
        initialArticles: [],
        totalArticles: 0,
        bestArticles: [],
        initialOffset: 0,
      },
    };
  }
}

export default function Board({
  initialArticles,
  bestArticles,
  totalArticles,
  initialOffset,
}) {
  const [articles, setArticles] = useState(
    Array.isArray(initialArticles) ? initialArticles : []
  );
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(initialOffset);

  const loadMoreArticles = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const newPage = page + 1;
      const newOffset = offset + 4;

      const response = await fetchArticles({
        sort: "createdAt",
        keyword: "",
        offset: newOffset,
        size: 4,
      });

      const newArticles = response.data || [];

      // 모든 게시글을 다 불러왔는지 확인
      if (articles.length >= totalArticles) {
        setHasMore(false);
      } else {
        setArticles((prevArticles) => [...prevArticles, ...newArticles]);
        setPage(newPage);
        setOffset(newOffset); // offset 갱신
      }
    } catch (error) {
      console.error("Error fetching more articles:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore, offset, articles.length, totalArticles]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        hasMore &&
        !loading
      ) {
        loadMoreArticles();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreArticles, hasMore, loading]);

  return (
    <div className={styles.bestContainer}>
      <BestProduct articles={bestArticles} />
      <BoardList articles={articles} />
      {loading && <div>로딩중...</div>}
      {!hasMore && <div>더 이상 게시글이 없습니다.</div>}
    </div>
  );
}
