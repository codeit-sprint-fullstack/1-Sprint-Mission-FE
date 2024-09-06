// pages/board.js

import BestProduct from "@/components/BoardComponents/BestProduct";
import BoardList from "@/components/BoardComponents/BoardList";
import { fetchArticles, fetchBestArticles } from "@/utils/articleApi"; // API 함수 불러오기
import styles from "@/styles/board.module.css";

export async function getServerSideProps(context) {
  const {
    sort = "createdAt",
    keyword = "",
    page = 1,
    size = 5,
  } = context.query;

  // 페이지에 따른 오프셋 계산
  const offset = (page - 1) * size;

  try {
    // API 호출을 utils/api.js에서 처리
    const articles = await fetchArticles({ sort, keyword, offset, size });
    const bestArticles = await fetchBestArticles();

    return {
      props: {
        articles,
        bestArticles,
      },
    };
  } catch (error) {
    console.error("Error fetching articles:", error);

    return {
      props: {
        articles: [],
        bestArticles: [],
      },
    };
  }
}

export default function Board({ articles, bestArticles }) {
  return (
    <div className={styles.bestContainer}>
      <BestProduct articles={bestArticles} />
      <BoardList articles={articles} />
    </div>
  );
}
