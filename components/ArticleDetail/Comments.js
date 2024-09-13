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

  const [lastPostInResults, setLastPostInResults] = useState(0);
  const [limit, setLimit] = useState(6);

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

      const nextComment = res.data.comments;
      const totalCount = res.data.totalCount;

      setLastPostInResults(
        nextComment.length > 0 ? nextComment[nextComment.length - 1].id : null
      );

      const mergedItems = [...comments, ...nextComment.slice(0, 5)];
      const uniqueComments = Array.from(
        new Map(mergedItems.map((item) => [item.id, item])).values()
      );

      setComments(uniqueComments);
      console.log('nextComment :', nextComment);

      // if (totalCount - uniqueComments.length < 5) {
      //   setLimit(Math.max(totalCount - uniqueComments.length - 1, 0));
      // }
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  console.log('comments :', comments);
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

  console.log('lastPostInResults :', lastPostInResults);
  console.log('limit :', limit);

  async function deleteComment(commentId) {
    try {
      const res = await axios.delete(
        `https://sprint-be-k938.onrender.com/comments/${commentId}`
      );
    } catch (error) {
      console.error('Error posting data:', error);
    } finally {
      await getComments(articleId);
      setLastPostInResults(null);
      setLimit(6);
      setComments([]);
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
  }, [articleId, edit, scroll, limit, lastPostInResults]);

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

    if (scrollPosition >= documentHeight - 2000 && !scroll) {
      setScroll(true);
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
