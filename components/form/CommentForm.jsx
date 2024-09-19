import { COMMENT } from "@/variables/formValidation";
import styles from "./CommentForm.module.scss";
import TextArea from "./TextArea";
import Button from "../ui/Button";
import { useFormContext } from "react-hook-form";
import { useCreateComment } from "@/service/mutations";

export default function CommentForm({ idPath }) {
  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = useFormContext();

  const { mutate } = useCreateComment(idPath);

  const handleNewCommentSubmit = (data) => {
    const newComment = { content: data.content };
    mutate(newComment);
  };

  const handleResetAfterSubmit = (data) => {
    handleNewCommentSubmit(data);
    reset();
  };
  return (
    <form
      className={styles.CommentForm}
      onSubmit={handleSubmit(handleResetAfterSubmit)}
    >
      <h3 className={styles["CommentForm-heading"]}>댓글달기</h3>
      <TextArea
        placeholder="댓글을 입력해주세요"
        validations={COMMENT.CONTENT}
        name="content"
      />
      <Button variant="primary" type="submit" disabled={!isValid}>
        등록
      </Button>
    </form>
  );
}
