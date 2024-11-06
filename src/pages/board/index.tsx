import { useRouter } from "next/router";
import BestProduct from "@/components/BoardComponents/BestProduct";
import BoardList from "@/components/BoardComponents/BoardList";
import { useArticles } from "@/hooks/useArticles";
import styles from "@/styles/board.module.css";
import { useEffect } from "react";
import { throttle } from "@/utils/throttle";
import { toast, ToastContainer } from "react-toastify";
import { fetchBestArticles, fetchArticles } from "@/utils/articleApi";
import "react-toastify/dist/ReactToastify.css";
import { GetServerSideProps } from "next";

interface Article {
  id: number;
  title: string;
  content: string;
  images: string[];
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: {
    nickname: string;
  };
}

interface BoardProps {
  initialArticles: Article[];
  bestArticles: { list: Article[] };
  totalArticles: number;
  pageSize: number;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    orderBy = "recent",
    keyword = "",
    page = 1,
    pageSize = 5,
  } = context.query;

  try {
    const articles = await fetchArticles({
      orderBy: orderBy as string,
      keyword: keyword as string,
      page: Number(page),
      pageSize: Number(pageSize),
    });
    const bestArticles = await fetchBestArticles(3);

    return {
      props: {
        initialArticles: articles.list || [],
        totalArticles: articles.totalCount || 0,
        bestArticles,
        pageSize: Number(pageSize),
      },
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return {
      props: {
        initialArticles: [],
        totalArticles: 0,
        bestArticles: [],
        pageSize: Number(pageSize),
      },
    };
  }
};

export default function Board({
  initialArticles,
  bestArticles,
  totalArticles,
  pageSize,
}: BoardProps) {
  const router = useRouter();

  const {
    articles,
    loadMoreArticles,
    hasMore,
    loading,
    setKeyword,
    setSortOrder,
  } = useArticles(initialArticles, totalArticles, pageSize, router);

  const handleKeywordSearch = (newKeyword: string) => {
    setKeyword(newKeyword);
  };

  const handleSortChange = (newSortOrder: string) => {
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
