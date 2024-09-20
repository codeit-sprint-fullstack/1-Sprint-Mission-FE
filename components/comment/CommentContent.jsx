import styles from "./CommentContent.module.scss";
import { calculateTimeAgo } from "@/utils/formatFn";
import KebabMenu from "../ui/KebabMenu";
import ProfileImg from "../ui/ProfileImg";
import { useState } from "react";
import { useUpdateComment } from "@/service/mutations";
import UpdateCommentForm from "../form/UpdateCommentForm";

export default function CommentContent({ comment }) {
  const [isEditMode, setIsEditMode] = useState(false);

  const classNames = isEditMode
    ? `${styles.CommentContent} ${styles.edit}`
    : styles.CommentContent;

  const { mutate } = useUpdateComment(comment.id);

  const handleUpdateSubmit = (data) => {
    const updateComment = { content: data.content };
    mutate(updateComment, {
      onSuccess: () => {
        console.log("successUpdateComment", updateComment);
        setIsEditMode(false);
      },
    });
  };

  return !isEditMode ? (
    <li className={classNames}>
      <div className={styles.top}>
        <h4>{comment.content}</h4>
        <KebabMenu
          entity="comment"
          idPath={comment.id}
          setIsEditMode={setIsEditMode}
        />
      </div>

      <div className={styles.bottom}>
        <ProfileImg width="32px" />
        <div className={styles["bottom-right"]}>
          <p>{comment.writer?.nickname || "똑똑한 판다"}</p>
          <time>{calculateTimeAgo(comment.createdAt)}</time>
        </div>
      </div>
    </li>
  ) : (
    <li className={classNames}>
      <div className={styles.top}>
        <UpdateCommentForm
          setIsEditMode={setIsEditMode}
          onSubmit={handleUpdateSubmit}
          initialData={comment}
        />
      </div>

      <div className={styles.bottom}>
        <ProfileImg width="32px" />
        <div className={styles["bottom-right"]}>
          <p>{comment.writer?.nickname || "똑똑한 판다"}</p>
          <time>{calculateTimeAgo(comment.createdAt)}</time>
        </div>
      </div>
    </li>
  );
}
