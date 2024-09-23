import { COMMENT } from "@/variables/formValidation";
import styles from "./CommentForm.module.scss";
import TextArea from "./comm/TextArea";
import Button from "../ui/Button";
import { FormProvider, useForm } from "react-hook-form";
import { useCreateComment } from "@/service/mutations";

export default function CommentForm({ idPath, isArticle }) {
  const formMethods = useForm();

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = formMethods;

  const { mutate } = useCreateComment(idPath);
  const heading = isArticle ? "댓글달기" : "문의하기";
  const handleNewCommentSubmit = (data) => {
    const newComment = { content: data["create-comment-content"] };
    mutate(newComment);
  };

  const handleResetAfterSubmit = (data) => {
    handleNewCommentSubmit(data);
    reset();
  };
  return (
    <FormProvider {...formMethods}>
      <form
        className={styles.CommentForm}
        onSubmit={handleSubmit(handleResetAfterSubmit)}
      >
        <h3 className={styles["CommentForm-heading"]}>{heading}</h3>
        <TextArea
          placeholder="댓글을 입력해주세요"
          validations={COMMENT.CONTENT}
          name="create-comment-content"
        />
        <Button
          variant="primary"
          type="submit"
          disabled={!isValid}
          className="small"
        >
          등록
        </Button>
      </form>
    </FormProvider>
  );
}
