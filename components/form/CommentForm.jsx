import { COMMENT } from "@/variables/formValidation";
import styles from "./CommentForm.module.scss";
import TextArea from "./TextArea";
import Button from "../ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { articleKey } from "@/variables/queryKeys";
import { createArticleComment } from "@/lib/api";
import { useFormContext } from "react-hook-form";

export default function CommentForm({ articleId }) {
  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = useFormContext();

  const queryClient = useQueryClient();

  const createCommentMutation = useMutation({
    mutationFn: (data) => createArticleComment(articleId, data),
    onSuccess: () => {
      console.log("onSuccess in createCommentMutation");
      queryClient.invalidateQueries({
        queryKey: articleKey.comments(articleId),
      });
    },
  });

  const handleNewCommentSubmit = (data) => {
    const newComment = { content: data.content };
    createCommentMutation.mutate(newComment);
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
