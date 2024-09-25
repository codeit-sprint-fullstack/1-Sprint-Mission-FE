import moment from 'moment/moment';
import Image from 'next/image';
import styles from '@shared/components/comment/CommentTemplate.module.css';
import ActionDropdown from '@shared/components/dropdowns/ActionDropdown';

export default function CommentList({ comment }) {
  return (
    <>
      <div className={styles['container']}>
        <div className={styles['comment-main']}>
          <div className={styles['comment-content']}>{comment.content}</div>
          <ActionDropdown id={comment.id} option={'comment'} />
        </div>
        <div className={styles['comment-info']}>
          <div className={styles['comment-meta']}>
            <div className={styles['comment-user-image']}>
              {comment.user ? (
                <Image src={comment.user.image} fill alt="user-image" />
              ) : null}
            </div>
            {comment.user ? (
              <div className={styles['comment-user']}>{comment.user.name}</div>
            ) : null}
            <div className={styles['comment-updated']}>
              {moment(comment.createdAt).format('YYYY. MM. DD')}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
