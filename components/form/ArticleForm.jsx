import { FormProvider, useForm } from "react-hook-form";
import styles from "./ArticleForm.module.scss";
import Input from "./comm/Input";
import TextArea from "./comm/TextArea";
import Button from "../ui/Button";
import { useEffect } from "react";
import { ARTICLE } from "@/variables/formValidation";

export default function ArticleForm({
  onSubmit,
  isEditMode = false,
  initialData = {},
}) {
  const heading = isEditMode ? "게시글 수정하기" : "게시글 쓰기";

  const formMethods = useForm({
    defaultValues: {
      content: initialData?.content || "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = formMethods;

  //수정하기면 폼 데이터 prefill
  useEffect(() => {
    if (isEditMode && initialData) {
      reset({
        title: initialData.title || "",
        content: initialData.content || "",
      });
    }
  }, [reset, isEditMode, initialData]);

  //submit 후 form reset
  const handleResetAfterSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(handleResetAfterSubmit)}
        className={styles.ArticleForm}
      >
        <div className={styles["top-bar"]}>
          <h2>{heading}</h2>
          <Button type="submit" variant="primary" disabled={!isValid}>
            등록
          </Button>
        </div>
        <Input
          label="*제목"
          name="title"
          placeholder="제목을 입력해 주세요"
          validations={ARTICLE.TITLE}
        />
        <TextArea
          label="*내용"
          name="content"
          placeholder="내용을 입력해 주세요"
          validations={ARTICLE.CONTENT}
        />
      </form>
    </FormProvider>
  );
}
