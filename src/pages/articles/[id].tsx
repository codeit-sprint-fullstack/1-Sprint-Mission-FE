import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getArticleById } from '../../api/articleApi';
import { getArticleComments } from '../../api/commentApi';
import styles from '../../styles/postdetail.module.css';
import CommentItem from '../../components/CommentItem';
import CommentForm from '../../components/CommentForm';
import BackButton from '../../components/BackButton';
import PostKebabMenu from '../../components/PostKebabMenu';
import EmptyComments from '../../components/EmptyComments';
import { CommentResponse } from '../../types/commonTypes';

const PostDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 10000));
  const [comments, setComments] = useState<CommentResponse[]>([]);

  const loadComments = async () => {
    try {
      if (typeof id === 'string') {
        const data = await getArticleComments(parseInt(id, 10));
        setComments(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('댓글 목록 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    const fetchArticle = async () => {
      if (id && typeof id === 'string') {
        try {
          const article = await getArticleById(parseInt(id, 10));
          setPost(article);
          setLoading(false);
          console.log("게시글 불러오기 성공:", article);
        } catch (error) {
          console.error('게시글 불러오기 실패:', error);
          setLoading(false);
        }
      }
    };

    fetchArticle();
    loadComments();
  }, [id]);

  const addNewComment = (newComment: CommentResponse) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>게시글을 불러오는 중 오류가 발생했습니다.</div>;

  const articleId = typeof id === 'string' ? parseInt(id, 10) : 0;

  return (
    <div className={styles.postDetailContainer}>
      <div className={styles.titleContainer}>
        <h1 className={styles.postTitle}>{post.title}</h1>
        <PostKebabMenu postId={articleId} />
      </div>

      <div className={styles.postInfo}>
        <img src="/image/mini_profile.svg" alt="Mini Profile" className={styles.profileIcon} />
        <span className={styles.author}>{post.user.nickname || '푸바오'}</span>
        <span className={styles.date}>
          {new Date(post.createdAt).toISOString().slice(0, 10).replace(/-/g, '.')}
        </span>
        <img src="/image/line.svg" alt="Line" className={styles.lineIcon} />
        <img src="/image/heart.svg" alt="Likes" className={styles.heartIcon} />
        <span className={styles.likes}>{likes}</span>
      </div>

      {post.image && post.image.length > 0 && (
        <div className={styles.imageContainer}>
          <img
            src={post.image[0]}
            alt="게시글 이미지"
            className={styles.postImage}
          />
        </div>
      )}

      <div className={styles.contentContainer}>
        <p className={styles.postContent}>{post.content}</p>
      </div>

      <CommentForm articleId={articleId} addNewComment={addNewComment} />

      <div className={styles.commentsContainer}>
        {comments.length === 0 ? (
          <EmptyComments />
        ) : (
          <>
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                id={comment.id}
                articleId={articleId}
                author={comment.user?.nickname || '푸바오'}
                content={comment.content}
                createdAt={comment.createdAt}
                refreshComments={loadComments}
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
