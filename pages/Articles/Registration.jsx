import styles from "@/styles/registration.module.css";
import useFormValidation from "@/hooks/useFormValidation";
import AlertModal from "@/components/Modals/AlertModal";
import * as api from "@/pages/api/articles";
import { useState } from "react";

function Registration() {
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const createArticle = () => {
    try {
      const data = api.createArticles(values);
    } catch (error) {
      console.log(error);
      setAlertMessage("게시글 생성에 실패했습니다." + error.name);
      openAlert();
    }
  };

  const openAlert = () => setOpenAlertModal(true);
  const closeAlert = () => setOpenAlertModal(false);

  const { values, errors, disabled, handleChange, handleSubmit } =
    useFormValidation(
      {
        title: "",
        description: "",
        userId: "550e8400-e29b-41d4-a716-446655440000",
      },
      createArticle
    );

  return (
    <>
      <AlertModal
        isOpen={openAlertModal}
        onClose={closeAlert}
        message={alertMessage}
      />
      <main>
        <form className={styles.add_product_form}>
          <div className={styles.form_submit_box}>
            <h2>게시글 쓰기</h2>
            <button
              onClick={handleSubmit}
              className={`
            ${styles.submit_btn}
            ${disabled && styles.disabled_btn}
            `}
              disabled={disabled}
            >
              등록
            </button>
          </div>
          <div className={styles.input_box}>
            <label>*제목</label>
            <input
              name="title"
              value={values.title || ""}
              onChange={handleChange}
              className={`${styles.input} ${errors.title && styles.err_border}`}
              placeholder="제목을 입력해주세요"
            />
            {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
          </div>
          <div className={styles.input_box}>
            <label>*내용</label>
            <textarea
              name="description"
              value={values.description || ""}
              onChange={handleChange}
              className={`${styles.input} ${styles.description} ${
                errors.description && styles.err_border
              }`}
              placeholder="내용을 입력해주세요"
            />
            {errors.description && (
              <p style={{ color: "red" }}>{errors.description}</p>
            )}
          </div>
        </form>
      </main>
    </>
  );
}

export default Registration;
