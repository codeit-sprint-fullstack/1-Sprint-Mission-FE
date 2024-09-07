import { useEffect, useState } from "react";
import styles from "../styles/BestPostsList.module.css";
import { fetchArticles } from "../api/api"; // 게시글 데이터를 가져오는 API 호출 함수
import BestPostItem from "./BestPostItem";

export default function BestPostsList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchBestPosts = async () => {
      try {
        const response = await fetchArticles({
          order: "likeCount", // 좋아요 수를 기준으로 정렬
          offset: 0,
          limit: 3,
        });
        console.log("응답 데이터:", response);

        const sortedPosts = response.sort((a, b) => b.likes - a.likes);
        setPosts(sortedPosts);
      } catch (error) {
        console.error("베스트 게시글을 불러오는데 실패했습니다.", error);
      }
    };

    fetchBestPosts();
  }, []);

  const topPosts = posts.slice(0, 3);

  return (
    <section className={styles.bestPosts}>
      <h2 className={styles.bestH1}>베스트 게시글</h2>
      <div className={styles.bestPostList}>
        {topPosts.map((post) => (
          <BestPostItem key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
