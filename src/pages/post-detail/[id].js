import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import FreeBoardPageHeader from "../../components/FreeBoardPageHeader";
import PostDetail from "../../components/PostDetail"; // 기존의 PostDetail 컴포넌트
import FreeBoardCommentItem from "../../components/FreeBoardCommentItem";
import Footer from "../../components/Footer";
import styles from "../PostDetailPage.module.css"; // CSS 모듈 파일
import { fetchArticleById } from "../../api/api"; // 게시글 상세 조회 api 호출

export default function PostDetailPage() {
  const router = useRouter();
  const { id } = router.query; // URL에서 id를 추출
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!id) return;
        const data = await fetchArticleById(id); // 게시글 상세 조회 api 사용
        setPost(data);
        setLoading(false);
      } catch (err) {
        console.error("게시글을 불러오는 중 오류 발생:", err);
        setError("게시글을 불러오는 데 실패했습니다.");
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <FreeBoardPageHeader />
      <main className={styles.main}>
        {post && <PostDetail post={post} />} {/* 게시글 정보 전달 */}
        <FreeBoardCommentItem postId={post.id} />
        {/* 댓글 컴포넌트에 postId 전달 */}
        <button className={styles.BackBtn} onClick={() => router.back()}>
          목록으로 돌아가기 ↩
        </button>
      </main>
      <Footer />
    </div>
  );
}
