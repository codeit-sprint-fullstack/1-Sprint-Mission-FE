import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchArticleById, fetchComments } from '../../src/api/api';
import styles from '../../styles/post-detail.module.css';
import CommentForm from '../../src/components/next/CommentForm';
import CommentItem from '../../src/components/next/CommentItem'; // 댓글 컴포넌트 추가

const PostDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 10000));
  const [comments, setComments] = useState([]); // 댓글 상태 추가

  // 게시글 데이터 가져오기
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

      // 댓글 데이터 가져오기
      fetchComments(id)
        .then((data) => {
          setComments(data); // 댓글 데이터 설정
        })
        .catch((error) => {
          console.error('Error fetching comments:', error);
        });
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>게시글을 불러오는 중 오류가 발생했습니다.</div>;
  }

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

      <div className={styles.commentFormContainer}>
        <CommentForm articleId={id} />
      </div>

      {/* 댓글이 없으면 메시지와 아이콘 표시 */}
      {comments.length === 0 ? (
        <>
          <img src="/image/reply.svg" alt="Reply Icon" className={styles.replyIcon} />
          <p className={styles.noCommentsText}>
            아직 댓글이 없어요, <br /> 지금 댓글을 달아보세요!
          </p>
        </>
      ) : (
        // 댓글이 있으면 댓글 리스트 표시
        <div className={styles.commentsContainer}>
          {comments.map((comment, index) => (
            <CommentItem
              key={index}
              author={comment.author}
              content={comment.content}
              date={comment.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostDetail;

