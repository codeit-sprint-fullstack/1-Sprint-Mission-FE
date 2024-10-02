import styles from "./CreateForm.module.css";
import { useValidateForm } from "@/hooks/useValidation";
import { createArticle } from "@/utils/articleApi";
import { useRouter } from "next/router";
import { ROUTES } from "@/utils/rotues";
import { useMutation } from "@tanstack/react-query";

export default function CreateForm() {
  const initialState = {
    title: "",
    content: "",
  };

  const validations = {
    title: {
      required: true,
      minLength: 3,
      maxLength: 10,
    },
    content: {
      required: true,
      minLength: 10,
    },
  };

  const { values, errors, handleChange, handleSubmit } = useValidateForm(
    initialState,
    validations
  );

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createArticle,
    onSuccess: (newArticle) => {
      if (newArticle && newArticle.id) {
        router.push(ROUTES.ARTICLE(newArticle.id));
      }
    },
    onError: (error) => {
      console.error("Error creating article:", error);
    },
  });

  const onSubmit = () => {
    mutation.mutate({
      title: values.title,
      content: values.content,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>게시글 쓰기</h2>
        <button
          type="button"
          className={styles.addBtn}
          disabled={Object.keys(errors).some((key) => errors[key])}
          onClick={handleSubmit(onSubmit)}
        >
          등록
        </button>
      </div>
      <form id="createForm" className={styles.createForm}>
        <div className={styles.inputContainer}>
          <label className={styles.formLabel} htmlFor="title">
            *제목
          </label>
          <input
            className={styles.formInput}
            name="title"
            placeholder="제목을 입력해주세요"
            value={values.title}
            onChange={handleChange}
            id="title"
          />
          {errors.title && <p className={styles.error}>{errors.title}</p>}
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.formLabel} htmlFor="content">
            *내용
          </label>
          <textarea
            className={styles.formInput}
            name="content"
            placeholder="내용을 입력해주세요"
            value={values.content}
            onChange={handleChange}
            id="content"
          />
          {errors.content && <p className={styles.error}>{errors.content}</p>}
        </div>
      </form>
    </div>
  );
}
