import { useState } from 'react';
import Image from 'next/image';
import EditComment from '@/components/ArticleDetail/EditComment.js';
import DropDown from '@/utils/DropDown.js';
import dotIcon from '@/public/ic_dot.png';
import profileIcon from '@/public/ic_profile.png';
import noComment from '@/public/no_comment.png';
import noAsk from '@/public/no_ask.png';
import styles from '@/styles/Comment.module.css';

function DateFormat({ createDate }) {
  const createdDate = new Date(createDate.createdAt);
  const nowDate = new Date();

  const timeDiff = nowDate - createdDate;

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor(timeDiff / (1000 * 60));

  if (days > 0) return `${days}일 전`;
  if (hours > 0) return `${hours}시간 전`;
  if (minutes > 0) return `${minutes}분 전`;
  return `방금 전`;
}

export default function CommentList({
  articleId,
  comments,
  onCommentDeleteId,
  category,
}) {
  const [commentId, setCommentId] = useState('');
  const [openOptions, setOpenOptions] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleDropDown = (e) => {
    setOpenOptions((prev) => !prev);
    setCommentId(e);
  };

  function handleDelete() {
    onCommentDeleteId(commentId);
    setOpenOptions(false);
  }

  function handleEdit(e) {
    setEditId(e);
  }

  if (comments.length === 0) {
    return (
      <Image
        src={category === 'freeboard' ? noComment : noAsk}
        alt='댓글이 없습니다'
        className={styles.noComment}
        priority
      />
    );
  }

  return (
    <>
      <div className={styles.commentListLayout}>
        {comments.map((comment) => (
          <div key={comment.id}>
            <div>
              {editId === comment.id ? (
                <EditComment
                  commentId={comment.id}
                  articleId={articleId}
                  content={comment.content}
                  category={category}
                  setEditId={setEditId}
                  setOpenOptions={setOpenOptions}
                />
              ) : (
                <>
                  <div className={styles.comments}>
                    <div className={styles.commentMain}>
                      <span className={styles.commentText}>
                        <pre>{comment.content}</pre>
                      </span>
                      <div>
                        <Image
                          onClick={() => handleDropDown(comment.id)}
                          src={dotIcon}
                          className={styles.dotImage}
                          alt='수정삭제 버튼'
                          width={24}
                          height={24}
                        />
                        {commentId === comment.id && openOptions && (
                          <DropDown
                            firstAction={{
                              onClickHandler: () => handleEdit(comment.id),
                              label: '수정하기',
                            }}
                            secondAction={{
                              onClickHandler: handleDelete,
                              label: '삭제하기',
                            }}
                          />
                        )}
                      </div>
                    </div>
                    <div className={styles.profile}>
                      <Image
                        src={profileIcon}
                        alt='프로필 사진'
                        width={32}
                        height={32}
                      />
                      <div className={styles.name}>
                        <span className={styles.userName}>
                          {comment.user.name}
                        </span>
                        <span className={styles.createdDate}>
                          <DateFormat createDate={comment} />
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
