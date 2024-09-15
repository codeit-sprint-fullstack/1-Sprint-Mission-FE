import { useFormContext } from "react-hook-form";
import styles from "./ArticleForm.module.scss";
import Input from "./Input";
import TextArea from "./TextArea";
import Button from "../ui/Button";
import { useEffect } from "react";
import { ARTICLE } from "@/variables/formValidation";

export default function ArticleForm({
  onSubmit,
  isEditMode = false,
  initialData = {},
}) {
  const classNames = isEditMode
    ? `${styles.ArticleForm} ${edit}`
    : `${styles.ArticleForm}`;

  const heading = isEditMode ? "게시글 수정하기" : "게시글 쓰기";
  const { setValue, handleSubmit } = useFormContext();

  //수정하기면 폼 데이터 prefill
  useEffect(() => {
    if (isEditMode && initialData) {
      setValue("title", initialData.title);
      setValue("content", initialData.content);
    }
  }, [setValue, isEditMode, initialData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classNames}>
      <div className={styles["top-bar"]}>
        <h2>{heading}</h2>
        <Button type="submit" variant="primary">
          등록
        </Button>
      </div>
      <Input
        label="*제목"
        name="title"
        placeHolder="제목을 입력해 주세요"
        validations={ARTICLE.TITLE}
      />
      <TextArea
        label="*내용"
        name="content"
        placeHolder="내용을 입력해 주세요"
        validations={ARTICLE.CONTENT}
      />
    </form>
  );
}
