import { COMMENT } from "@/variables/formValidation";
import styles from "./CommentForm.module.scss";
import TextArea from "./comm/TextArea";
import Button from "../ui/Button";
import { FormProvider, useForm } from "react-hook-form";
import { useCreateComment } from "@/service/mutations";

export default function CommentForm({ idPath, whichComment }) {
  const formMethods = useForm();
  const isArticle = whichComment === "article";

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = formMethods;

  const { mutate } = useCreateComment({ idPath, whichComment });

  const heading = isArticle ? "댓글달기" : "문의하기";

  const placeholder = isArticle
    ? "댓글을 입력해주세요"
    : "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.";

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
          placeholder={placeholder}
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
