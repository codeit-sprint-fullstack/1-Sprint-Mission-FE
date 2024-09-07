import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import styles from "./PostItem.module.css";
import { fetchArticles } from "../api/api";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetchArticles();
        console.log("받아온 데이터:", response); // 데이터 구조를 콘솔에 출력하여 확인
        setPosts(Array.isArray(response) ? response : response.data || []);
        setLoading(false);
      } catch (error) {
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.postList}>
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map((post) => <PostItem key={post.id} post={post} />)
      ) : (
        <div>불러올 게시물이 없습니다.</div>
      )}
    </div>
  );
}
