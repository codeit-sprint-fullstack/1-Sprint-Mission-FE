import styles from "./CreateForm.module.css";
import { useValidateForm } from "@/hooks/useValidation";
import { createArticle } from "@/utils/articleApi";
import { useRouter } from "next/router";
import { ROUTES } from "@/utils/rotues";

export default function CreateForm() {
  const { values, errors, handleChange, handleSubmit } = useValidateForm(); // useValidateForm 사용
  const router = useRouter();

  // 폼 제출 함수
  const onSubmit = async () => {
    try {
      const newArticle = await createArticle({
        title: values.title,
        content: values.content,
      });

      if (newArticle && newArticle.id) {
        router.push(ROUTES.ARTICLE(newArticle.id));
      }
    } catch (error) {
      console.error("Error creating article:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>게시글 쓰기</h2>
        <button
          type="button"
          className={styles.addBtn}
          disabled={Object.keys(errors).some((key) => errors[key])} // 유효성 검사 결과에 따라 버튼 비활성화
          onClick={handleSubmit(onSubmit)} // 유효성 검사 후 제출
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
