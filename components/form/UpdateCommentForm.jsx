import { useForm, FormProvider } from "react-hook-form";
import Button from "../ui/Button";
import { COMMENT } from "@/variables/formValidation";
import TextArea from "./comm/TextArea";
import { useEffect } from "react";
import styles from "./UpdateCommentForm.module.scss";

export default function UpdateCommentForm({
  onSubmit,
  setIsEditMode,
  initialData,
}) {
  const formMethods = useForm();

  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = formMethods;

  const handleCancelClick = () => {
    setIsEditMode(false);
  };

  useEffect(() => {
    if (initialData) {
      reset({
        content: initialData.content || "",
      });
    }
  }, [reset, initialData]);

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.UpdateCommentForm}
      >
        <TextArea name="content" validations={COMMENT.CONTENT} />
        <div className={styles.btns}>
          <Button
            variant="cancel"
            onClick={handleCancelClick}
            className="small"
          >
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
    </FormProvider>
  );
}
