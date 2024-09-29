import { useState } from 'react';
import Image from 'next/image';
import EditComment from './EditComment.js';
import DropDown from '@/utils/DropDown.js';
import dotIcon from '@/public/ic_dot.png';
import noComment from '@/public/no_comment.png';
import noAsk from '@/public/no_ask.png';
import { UserInfo } from './UserInfo.js';
import styles from '@/styles/Comment.module.css';
import toast from 'react-hot-toast';

export default function CommentList({
  articleId,
  comments,
  onCommentDeleteId,
  category,
}) {
  const [commentId, setCommentId] = useState('');
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleDropDown = (e) => {
    setIsOpenDropDown((prev) => !prev);
    setCommentId(e);
  };

  function handleDelete() {
    onCommentDeleteId(commentId);
    toast.success('삭제가 완료됐습니다!');
    setIsOpenDropDown(false);
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
                  setEditId={setEditId}
                  setIsOpenDropDown={setIsOpenDropDown}
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
                        {commentId === comment.id && isOpenDropDown && (
                          <DropDown
                            firstAction={{
                              onClickHandler: () => handleEdit(comment.id),
                              label: '수정하기',
                            }}
                            secondAction={{
                              onClickHandler: handleDelete,
                              label: '삭제하기',
                            }}
                            onClose={() => setIsOpenDropDown(false)}
                          />
                        )}
                      </div>
                    </div>
                    <UserInfo comment={comment} />
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
