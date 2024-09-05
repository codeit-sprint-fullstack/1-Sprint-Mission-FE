import BestProduct from "@/components/BoardComponents/BestProduct";
import BoardList from "@/components/BoardComponents/BoardList";
import styles from "@/styles/board.module.css";

export async function getServerSideProps(context) {
  const {
    sort = "createdAt",
    keyword = "",
    page = 1,
    size = 5,
  } = context.query;

  // 쿼리 파라미터를 바탕으로 정렬 기준 및 검색어 처리
  const offset = (page - 1) * size;

  try {
    // 검색어 및 정렬 기준이 적용된 게시글
    const board = await fetch(
      `https://thrift-shop.onrender.com/articles?sort=${sort}&search=${keyword}&offset=${offset}&size=${size}`
    );

    // 최신순으로 3개의 베스트 게시글 가져오기
    const bestBoard = await fetch(
      `https://thrift-shop.onrender.com/articles?sort=createdAt&offset=0&size=3`
    );

    const articles = await board.json();
    const bestArticles = await bestBoard.json();

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
