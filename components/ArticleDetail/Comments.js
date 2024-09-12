import styles from '@/styles/Comment.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@/utils/Button';
import CommentList from './CommentList';

export default function Comments({ articleId }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [edit, setEdit] = useState(null);
  const [canSubmit, setCanSubmit] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [skip, setSkip] = useState(1);
  const [lastPostInResults, setLastPostInResults] = useState(0);
  const [limit, setLimit] = useState(5);

  const handleComment = (event) => {
    setComment(event.target.value);
  };

  async function getComments(articleId) {
    try {
      const res = await axios.get(
        `https://sprint-be-k938.onrender.com/comments/${articleId}`,
        {
          params: {
            limit: limit,
            cursor: lastPostInResults,
          },
        }
      );

      const nextArticle = res.data.comments;
      const totalCount = res.data.totalCount;

      setLastPostInResults(
        nextArticle.length > 0 ? nextArticle[nextArticle.length - 1].id : null
      );

      const mergedItems = [...comments, ...nextArticle];
      const uniqueComments = Array.from(
        new Map(mergedItems.map((item) => [item.id, item])).values()
      );

      const sliceNumber = 5 * skip;
      setComments(uniqueComments.slice(0, sliceNumber));

      if (totalCount - uniqueComments.length < 5) {
        setLimit(Math.max(totalCount - uniqueComments.length, 0));
      }
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  async function postComment() {
    try {
      const res = await axios.post(
        `https://sprint-be-k938.onrender.com/comments`,
        {
          content: comment,
          articleId: articleId,
          userId: '9cda174e-2e9e-4523-97cd-362e85a39ebf',
        }
      );
      setComments([res.data, ...comments]);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  async function deleteComment(commentId) {
    try {
      const res = await axios.delete(
        `https://sprint-be-k938.onrender.com/comments/${commentId}`
      );
      getComments(articleId);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  const handleCommentDeleteId = (id) => {
    deleteComment(id);
  };

  useEffect(() => {
    if (comment) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [comment]);

  useEffect(() => {
    getComments(articleId);
  }, [articleId, edit, scroll]);

  function handleSubmit(e) {
    postComment();
    setComment('');
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastPostInResults]);

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight - 1500 && !scroll) {
      setScroll(true);
      setSkip((prev) => prev + 1);
    } else {
      setScroll(false);
    }
  };

  return (
    <div className={styles.submit}>
      <div className={styles.comment}>댓글달기</div>
      <textarea
        placeholder='댓글을 입력해 주세요.'
        type='text'
        value={comment}
        onChange={handleComment}
        className={styles.inputComment}
      />
      <Button disabled={!canSubmit} onClick={handleSubmit} label={'등록'} />

      <CommentList
        comments={comments}
        onCommentDeleteId={handleCommentDeleteId}
        setComments={setEdit}
      />
    </div>
  );
}
