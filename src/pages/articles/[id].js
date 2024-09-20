import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchArticleById, fetchComments } from '../../api/api';
import styles from '../../styles/postdetail.module.css';
import CommentItem from '../../components/CommentItem';
import CommentForm from '../../components/CommentForm';
import BackButton from '../../components/BackButton';
import PostKebabMenu from '../../components/PostKebabMenu';
import EmptyComments from '../../components/EmptyComments'; // EmptyComments 컴포넌트 추가

const PostDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 10000)); // 랜덤 좋아요 생성
  const [comments, setComments] = useState([]); // 댓글 초기화

  // 댓글 목록을 다시 불러오는 함수
  const loadComments = async () => {
    try {
      const data = await fetchComments(id);
      setComments(Array.isArray(data) ? data : []); // 댓글 목록 상태 업데이트
    } catch (error) {
      console.error('댓글 목록 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchArticleById(id)
        .then((data) => {
          setPost(data);
          setLoading(false);
          console.log("게시글 수정하기 성공:", data);
        })
        .catch((error) => {
          console.error('Error fetching article:', error);
          setLoading(false);
        });

      loadComments(); // 초기 댓글 목록 불러오기
    }
  }, [id]);

  const addNewComment = (newComment) => {
    setComments([newComment, ...comments]); // 새로운 댓글을 추가
  };

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>게시글을 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <div className={styles.postDetailContainer}>
      <div className={styles.titleContainer}>
        <h1 className={styles.postTitle}>{post.title}</h1>
        <PostKebabMenu postId={id} />
      </div>

      <div className={styles.postInfo}>
        <img src="/image/mini_profile.svg" alt="Mini Profile" className={styles.profileIcon} />
        <span className={styles.author}>{post.author || '푸바오'}</span>
        <span className={styles.date}>
          {new Date(post.createdAt).toISOString().slice(0, 10).replace(/-/g, '.')}
        </span>
        <img src="/image/line.svg" alt="Line" className={styles.lineIcon} />
        <img src="/image/heart.svg" alt="Likes" className={styles.heartIcon} />
        <span className={styles.likes}>{likes}</span>
      </div>

      <div className={styles.contentContainer}>
        <p className={styles.postContent}>{post.content}</p>
      </div>

      <CommentForm articleId={id} addNewComment={addNewComment} />

      <div className={styles.commentsContainer}>
        {comments.length === 0 ? (
          <EmptyComments />
        ) : (
          <>
            {comments.map((comment, index) => (
              <CommentItem
                key={comment.id}
                id={comment.id}  // 댓글의 id를 전달
                author={`${comments.length - index}번 바오`}
                content={comment.content}
                createdAt={comment.createdAt}
                refreshComments={loadComments}  // 댓글 수정 후 목록 갱신
              />
            ))}
            <div className={styles.buttonContainer}>
              <BackButton />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostDetail;

