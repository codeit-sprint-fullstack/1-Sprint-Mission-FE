import { useRouter } from "next/router";
import BestProduct from "@/components/BoardComponents/BestProduct.jsx";
import BoardList from "@/components/BoardComponents/BoardList.jsx";
import { useArticles } from "@/hooks/useArticles";
import styles from "@/styles/board.module.css";
import { useEffect } from "react";
import { throttle } from "@/utils/throttle";
import { toast, ToastContainer } from "react-toastify";
import { fetchBestArticles, fetchArticles } from "@/utils/articleApi";
import "react-toastify/dist/ReactToastify.css";

export async function getServerSideProps(context) {
  const {
    orderBy = "recent",
    keyword = "",
    page = 1,
    pageSize = 5,
  } = context.query;
  try {
    const articles = await fetchArticles({ orderBy, keyword, page, pageSize });
    const bestArticles = await fetchBestArticles(3);

    return {
      props: {
        initialArticles: articles.list || [],
        totalArticles: articles.totalCount || 0,
        bestArticles,
        pageSize,
      },
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return {
      props: {
        initialArticles: [],
        totalArticles: 0,
        bestArticles: [],
        pageSize,
      },
    };
  }
}

export default function Board({
  initialArticles,
  bestArticles,
  totalArticles,
  pageSize,
}) {
  const router = useRouter();

  const {
    articles,
    loadMoreArticles,
    hasMore,
    loading,
    setKeyword,
    setSortOrder,
  } = useArticles(initialArticles, totalArticles, pageSize, router);

  const handleKeywordSearch = (newKeyword) => {
    setKeyword(newKeyword);
  };

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
  };

  useEffect(() => {
    let load = true;
    const handleScroll = throttle(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        hasMore
      ) {
        loadMoreArticles();
      } else if (!hasMore && load) {
        load = false;
        toast.info("모든 게시물을 불러왔습니다.");
      }
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreArticles, hasMore]);

  return (
    <div className={styles.boardContainer}>
      <ToastContainer position="top-right" autoClose={2000} />
      <BestProduct articles={bestArticles} />
      <BoardList
        articles={articles}
        onSearch={handleKeywordSearch}
        onSortChange={handleSortChange}
      />
      {loading && <div>Loading more...</div>}
    </div>
  );
}
