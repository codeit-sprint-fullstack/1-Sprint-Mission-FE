import Article from "@/components/Article";
import BestArticle from "@/components/BestArticle";
import styles from "@/styles/Board.module.css";
import axios from "@/lib/axios";
import { useEffect } from "react";

export async function getStaticProps() {
  const res = await axios.get("/articles");
  const articles = res.data;

  return {
    props: {
      articles,
    },
  };
}

export default function Board({ articles }) {
  // 클라이언트 측에서 데이터 확인
  useEffect(() => {
    console.log(articles);
  }, [articles]);

  return (
    <div className={styles.board}>
      <BestArticle articles={articles} />
      <Article articles={articles} />
    </div>
  );
}
