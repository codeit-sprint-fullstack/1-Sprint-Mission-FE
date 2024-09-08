import dotIcon from '@/public/ic_dot.png';
import profileIcon from '@/public/ic_profile.png';
import noComment from '@/public/no_comment.png';
import Image from 'next/image';
import styles from '@/styles/Comment.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function CreateDate({ createDate }) {
  const createdDate = new Date(createDate.createdAt);
  const nowDate = new Date();
  let diff = Math.abs(nowDate.getTime() - createdDate.getTime());
  diff = Math.ceil(diff / (1000 * 60 * 60 * 24));

  const result = `${diff}일 전`;

  return result;
}

export default function Comments({ comments, articleId }) {
  const [comment, setComment] = useState('');
  const [submit, setSubmit] = useState(false);

  const handleComment = (event) => {
    setComment(event.target.value);
  };

  async function postComment() {
    try {
      const res = await axios.post(
        `https://sprint-be-h8kw.onrender.com/comments`,
        {
          content: comment,
          articleId: articleId,
          userId: '3160c83b-8dcc-4ca2-9d51-717c5246d414',
        }
      );
      console.log(res.data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  useEffect(() => {
    if (comment) {
      setSubmit(true);
    } else {
      setSubmit(false);
    }
  }, [comment]);

  function handleSubmit(e) {
    postComment();
    setComment('');
  }

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
      <button
        disabled={!submit}
        className={submit ? styles.submitBtn : styles.btn}
        type='button'
        onClick={handleSubmit}
      >
        등록
      </button>

      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id}>
            <div className={styles.comments}>
              <div className={styles.commentText}>
                <span>{comment.content}</span>
                <Image src={dotIcon} alt='수정삭제 버튼' />
              </div>
              <div className={styles.profile}>
                <Image
                  src={profileIcon}
                  alt='프로필 사진'
                  width={32}
                  height={32}
                />
                <div className={styles.name}>
                  <span className={styles.userName}>{comment.user.name}</span>
                  <span className={styles.createdDate}>
                    <CreateDate createDate={comment} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Image
          src={noComment}
          alt='댓글이 없습니다'
          className={styles.noComment}
          priority
        />
      )}
    </div>
  );
}
