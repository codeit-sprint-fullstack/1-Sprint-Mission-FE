import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchArticleById, fetchComments } from '../../src/api/api';
import styles from '../../styles/post-detail.module.css';
import CommentItem from '../../src/components/next/CommentItem';
import CommentForm from '../../src/components/next/CommentForm';
import BackButton from '../../src/components/next/BackButton';
import PostKebabMenu from '../../src/components/next/PostKebabMenu'; // PostKebabMenu 추가

const PostDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 10000)); // 랜덤 좋아요 생성
  const [comments, setComments] = useState([]); // 댓글 초기화

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
        .then((data) => {
          setComments(Array.isArray(data) ? data : []);
        })
        .catch(console.error);
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
        <PostKebabMenu postId={id} /> {/* PostKebabMenu로 변경 */}
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
          <>
            <img src="/image/reply.svg" alt="Reply Icon" className={styles.replyIcon} />
            <p className={styles.noCommentsText}>
              아직 댓글이 없어요, <br /> 지금 댓글을 달아보세요!
            </p>
            <div className={styles.buttonContainer}>
              <BackButton />
            </div>
          </>
        ) : (
          <>
            {comments.map((comment, index) => (
              <CommentItem
                key={comment.id}
                id={comment.id}  // 댓글의 id를 전달
                author={`${comments.length - index}번 바오`}
                content={comment.content}
                createdAt={comment.createdAt}
                refreshComments={() => {}} // 댓글 갱신 함수
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

