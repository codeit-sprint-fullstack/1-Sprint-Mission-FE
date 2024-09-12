import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchArticleById, fetchComments, createComment } from '../../src/api/api';
import styles from '../../styles/post-detail.module.css';
import CommentItem from '../../src/components/next/CommentItem';

const PostDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 10000)); // 랜덤 좋아요 상태 생성
  const [comments, setComments] = useState([]); // 댓글을 빈 배열로 초기화
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (id) {
      fetchArticleById(id)
        .then((data) => {
          setPost(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching article:', error);
          setLoading(false);
        });

      fetchComments(id)
        .then((data) => setComments(Array.isArray(data) ? data : [])) // 댓글 데이터가 배열인지 확인
        .catch(console.error);
    }
  }, [id]);

  const handleNewComment = async (e) => {
    e.preventDefault();
    if (!newComment) return;

    try {
      const addedComment = await createComment(id, { content: newComment });
      
      // 첫 댓글일 때도 정상적으로 배열에 추가
      setComments([addedComment, ...comments]);

      setNewComment(''); // 입력창 초기화
    } catch (error) {
      console.error('댓글 등록 실패:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>게시글을 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <div className={styles.postDetailContainer}>
      <div className={styles.titleContainer}>
        <h1 className={styles.postTitle}>{post.title}</h1>
        <img src="/image/kebab.svg" alt="Kebab Icon" className={styles.kebabIcon} />
      </div>

      <div className={styles.postInfo}>
        <img src="/image/mini_profile.svg" alt="Mini Profile" className={styles.profileIcon} />
        <span className={styles.author}>{post.author || '푸바오'}</span>
        <span className={styles.date}>
          {new Date(post.createdAt).toISOString().slice(0, 10).replace(/-/g, ':')}
        </span>
        <img src="/image/line.svg" alt="Line" className={styles.lineIcon} />
        <img src="/image/heart.svg" alt="Likes" className={styles.heartIcon} />
        <span className={styles.likes}>{likes}</span>
      </div>

      <div className={styles.contentContainer}>
        <p className={styles.postContent}>{post.content}</p>
      </div>

      <div className={styles.commentSection}>
        <form onSubmit={handleNewComment} className={styles.commentForm}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력해주세요."
            className={styles.commentInput}
          />
          <button type="submit" className={styles.submitButton} disabled={!newComment}>
            댓글 등록
          </button>
        </form>

        {comments.length === 0 ? (
          <>
            <img src="/image/reply.svg" alt="Reply Icon" className={styles.replyIcon} />
            <p className={styles.noCommentsText}>
              아직 댓글이 없어요, <br /> 지금 댓글을 달아보세요!
            </p>
          </>
        ) : (
          comments.map((comment) => (
            <CommentItem key={comment.id} author={comment.author} content={comment.content} date={comment.createdAt} />
          ))
        )}
      </div>
    </div>
  );
};

export default PostDetail;

