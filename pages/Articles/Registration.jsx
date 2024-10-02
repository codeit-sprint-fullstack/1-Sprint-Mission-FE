import { useState } from "react";
import { useRouter } from "next/router";
import useFormValidation from "@/hooks/useFormValidation";
import AlertModal from "@/components/Modals/AlertModal";
import * as api from "@/pages/api/articles";
import styles from "@/styles/registration.module.css";
import useAuth from "@/contexts/authContext";

export async function getServerSideProps(context) {
  //경로의 context 값이 있다면 지곤 게시글의 수정으로 서버에서 값을 전달한다.
  if (context.query) {
    const { id } = context.query;

    let article = {};
    try {
      const data = await api.getArticle(id);
      article = data;
    } catch (error) {
      console.log(error);
    }

    return {
      props: { article },
    };
  } else {
    return {
      props: {},
    };
  }
}

function Registration({ article }) {
  const router = useRouter();
  useAuth();
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const createArticle = async () => {
    try {
      const data = await api.createArticle(values);
      if (data) {
        router.push(`/Articles/${data.id}`);
      } else {
        setAlertMessage("게시글 생성에 실패했습니다.");
        handleOpenAlert();
      }
    } catch (error) {
      console.log(error);
      setAlertMessage("게시글 생성에 실패했습니다." + error.message);
      handleOpenAlert();
    }
  };

  const updateArticle = async () => {
    try {
      const data = await api.updateArticle(article.id, values);
      if (data) {
        router.push("/Articles");
      } else {
        setAlertMessage("게시글 수정에 실패했습니다.");
        handleOpenAlert();
      }
    } catch (error) {
      console.log(error);
      setAlertMessage("게시글 수정에 실패했습니다." + error.message);
      handleOpenAlert();
    }
  };

  const handleOpenAlert = () => setOpenAlertModal(true);
  const handleCloseAlert = () => setOpenAlertModal(false);

  const { values, errors, disabled, handleChange, handleSubmit } =
    useFormValidation(
      {
        title: article ? article.title : "",
        content: article ? article.content : "",
        //유저관리를 안하고 있음 기본 유저를 설정 추후 유저관리의 로그인계정으로 변경해야 함
      },
      //서버에서 전달받은 article이 있다면 callback 으로 update함수를, 없다면 create 함수를 전달한다.
      article ? updateArticle : createArticle
    );

  return (
    <>
      <AlertModal
        isOpen={openAlertModal}
        onClose={handleCloseAlert}
        message={alertMessage}
      />
      <main>
        <form className={styles.add_product_form}>
          <div className={styles.form_submit_box}>
            <h2>게시글 쓰기</h2>
            <button
              onClick={handleSubmit}
              // 유효성검사에서 실패한다면 disabled가 true가 된다. 맞는 스타일을 추가
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
              autoComplete="off"
            />
            {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
          </div>
          <div className={styles.input_box}>
            <label>*내용</label>
            <textarea
              name="content"
              value={values.content || ""}
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
