import styles from "./EditBoard.module.css";
import { useValidateForm } from "@/hooks/useValidation";

export default function EditBoard({ formData, setFormData, setFormValid }) {
  const initialBoardState = {
    title: formData.title || "",
    content: formData.content || "",
  };

  const boardValidations = {
    title: { required: true, minLength: 3 },
    content: { required: true, minLength: 10 },
  };

  const { values, errors, handleChange } = useValidateForm(
    initialBoardState,
    boardValidations
  );

  const validateAndSetFormValid = () => {
    const isFormValid =
      values.title && values.content && !errors.title && !errors.content;
    setFormValid(isFormValid);
  };

  const handleInputChange = (e) => {
    handleChange(e);
    validateAndSetFormValid();
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form className={styles.createForm}>
      <div className={styles.inputContainer}>
        <label className={styles.formLabel}>*제목</label>
        <input
          className={styles.formInput}
          name="title"
          placeholder="제목을 입력해주세요"
          value={values.title}
          onChange={handleInputChange}
        />
        {errors.title && <p className={styles.error}>{errors.title}</p>}
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.formLabel}>*내용</label>
        <textarea
          className={styles.formInput}
          name="content"
          placeholder="내용을 입력해주세요"
          value={values.content}
          onChange={handleInputChange}
        />
        {errors.content && <p className={styles.error}>{errors.content}</p>}
      </div>
    </form>
  );
}
