import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FreeBoardPageHeader from "../../components/FreeBoardPageHeader";
import PostDetail from "../../components/PostDetail";
import FreeBoardCommentItem from "../../components/FreeBoardCommentItem";
import Footer from "../../components/Footer";
import styles from "../PostDetailPage.module.css";
import { fetchArticleById, fetchComments, createComment } from "../../api/api"; // 게시글 및 댓글 전체 조회 api 호출
import NoComments from "../../components/NoComments"; // NoComments 컴포넌트 import
import Spinner from "../../components/Spinner"; // Spinner 컴포넌트 import

export default function PostDetailPage() {
  const router = useRouter();
  const { id } = router.query; // URL에서 id를 추출
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]); // 댓글 데이터 추가
  const [filteredComments, setFilteredComments] = useState([]); // 필터링된 댓글
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 게시글을 불러오는 함수
  const fetchPost = async () => {
    try {
      if (!id) return;
      const postData = await fetchArticleById(id);
      setPost(postData);
    } catch (err) {
      console.error("게시글 불러오기 오류:", err);
      setError("게시글을 불러오는 데 실패했습니다.");
    }
  };

  // 댓글을 불러오는 함수
  const fetchCommentsData = async () => {
    try {
      if (!id) return;
      const allComments = await fetchComments(id);
      setComments(allComments);
      filterComments(allComments);
    } catch (err) {
      console.error("댓글 불러오기 오류:", err);
      setError("댓글을 불러오는 데 실패했습니다.");
    }
  };

  // 댓글 필터링 함수
  const filterComments = (allComments) => {
    const postComments = allComments.filter(
      (comment) => comment.postId === parseInt(id)
    );
    setFilteredComments(postComments);
  };

  // 댓글 등록 핸들러
  const handleCommentSubmit = async (commentData) => {
    try {
      await createComment(commentData);
      const allComments = await fetchComments(id);
      setComments(allComments);
      filterComments(allComments);
    } catch (error) {
      console.error("댓글 등록 실패:", error);
      setError("댓글 등록에 실패했습니다.");
    }
  };

  // 댓글 수정 및 삭제 후 상태 업데이트 함수
  const handleCommentUpdate = async () => {
    await updateComments();
  };

  // 댓글 목록 갱신 함수
  const updateComments = async () => {
    try {
      const allComments = await fetchComments(id);
      setComments(allComments);
      filterComments(allComments);
    } catch (error) {
      console.error("댓글 목록 갱신 실패:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchPost();
      await fetchCommentsData();
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) return <Spinner />; // 스피너 컴포넌트 사용
  if (error) return <div>{error}</div>;

  return (
    <div>
      <FreeBoardPageHeader />
      <main className={styles.main}>
        {post && (
          <PostDetail
            post={post}
            onCommentSubmit={handleCommentSubmit} // 댓글 등록 핸들러를 prop으로 전달
          />
        )}
        <div className={styles.commentsList}>
          {filteredComments.length === 0 ? (
            <NoComments />
          ) : (
            filteredComments.map((comment) => (
              <FreeBoardCommentItem
                key={comment.id}
                comment={comment}
                onCommentUpdate={handleCommentUpdate}
              />
            ))
          )}
        </div>
        <button className={styles.BackBtn} onClick={() => router.back()}>
          목록으로 돌아가기 ↩
        </button>
      </main>
      <Footer />
    </div>
  );
}
