import styles from "./CommentContent.module.scss";
import { useState } from "react";
import { useUpdateComment } from "@/service/mutations";
import UpdateCommentForm from "../form/UpdateCommentForm";
import UserInfo from "../user/UserInfo";
import KebabMenuComment from "../ui/KebabMenuComment.jsx";

export default function CommentContent({ comment, idPath, whichComment }) {
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
        <KebabMenuComment
          whichComment={whichComment}
          idPath={idPath}
          commentId={comment.id}
          setIsEditMode={setIsEditMode}
        />
      </div>

      <UserInfo variant="comment" user={comment} />
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

      <UserInfo variant="comment" user={comment} />
    </li>
  );
}
