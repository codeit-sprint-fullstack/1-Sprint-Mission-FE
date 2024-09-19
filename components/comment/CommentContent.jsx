import styles from "./CommentContent.module.scss";
import { calculateTimeAgo } from "@/utils/formatFn";
import KebabMenu from "../ui/KebabMenu";
import ProfileImg from "../ui/ProfileImg";
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import Button from "../ui/Button";
import { useUpdateComment } from "@/service/mutations";
import { COMMENT } from "@/variables/formValidation";
import TextArea from "../form/TextArea";

export function UpdateCommentForm({ onSubmit, setIsEditMode, initialData }) {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = useFormContext();

  const handleCancelClick = () => {
    setIsEditMode(false);
  };

  useEffect(() => {
    if (initialData) {
      reset({
        "article-comment": initialData.content || "",
      });
    }
  }, [reset, initialData]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.UpdateCommentForm}
    >
      <TextArea name="article-comment" validations={COMMENT.CONTENT} />
      <div className={styles.btns}>
        <Button variant="cancel" onClick={handleCancelClick} className="small">
          취소
        </Button>
        <Button
          variant="primary"
          disabled={!isValid}
          type="submit"
          className="small"
        >
          수정 완료
        </Button>
      </div>
    </form>
  );
}

export default function CommentContent({ comment }) {
  const [isEditMode, setIsEditMode] = useState(false);

  const classNames = isEditMode
    ? `${styles.CommentContent} ${styles.edit}`
    : styles.CommentContent;

  const { mutate } = useUpdateComment(comment.id);

  const handleUpdateSubmit = (data) => {
    const updateComment = { content: data["article-comment"] };
    mutate(updateComment, {
      onSuccess: () => {
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
