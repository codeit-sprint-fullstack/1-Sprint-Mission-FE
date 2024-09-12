import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchArticleById, fetchComments } from '../../src/api/api';
import styles from '../../styles/post-detail.module.css';
import CommentItem from '../../src/components/next/CommentItem';
import CommentForm from '../../src/components/next/CommentForm'; // CommentForm 가져오기

const PostDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 10000)); // 랜덤 좋아요 상태 생성
  const [comments, setComments] = useState([]); // 댓글을 빈 배열로 초기화

  useEffect(() => {
    if (id) {
      // 게시글 불러오기
      fetchArticleById(id)
        .then((data) => {
          setPost(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching article:', error);
          setLoading(false);
        });

      // 댓글 불러오기
      fetchComments(id)
        .then((data) => {
          console.log("Fetched comments: ", data);  // API에서 가져온 댓글 데이터 확인
          setComments(Array.isArray(data) ? data : []);  // 데이터가 배열인지 확인 후 상태 설정
          console.log("Processed comments: ", comments);  // 처리된 댓글 상태 확인
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

      <CommentForm articleId={id} addNewComment={addNewComment} />

      <div className={styles.commentSection}>
        {comments.length === 0 ? (
          <>
            <img src="/image/reply.svg" alt="Reply Icon" className={styles.replyIcon} />
            <p className={styles.noCommentsText}>
              아직 댓글이 없어요, <br /> 지금 댓글을 달아보세요!
            </p>
          </>
        ) : (
          comments.map((comment, index) => (
            <CommentItem
              key={comment.id}
              author={`[${comments.length - index}]번 사용자`}
              content={comment.content}
              createdAt={comment.createdAt}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PostDetail;
