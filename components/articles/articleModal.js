import styles from "./articleModal.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { patchArticle } from "../../pages/api/articles";
import { useRouter } from "next/router";

const Modal = ({ isOpen, closeModal, id }) => {
  const [btnState, setbtnState] = useState("commentBtnfalse");
  const [title, setTitle] = useState("");
  const [content, setcontent] = useState("");

  const router = useRouter();

  const titleHandle = (e) => {
    setTitle(e.target.value);
    if (title.length > 0 && content.length > 0) {
      setbtnState("addbtn");
    } else {
      setbtnState("addbtnfalse");
    }
  };

  const contentHandle = (e) => {
    setcontent(e.target.value);
    if (title.length > 0 && content.length > 0) {
      setbtnState("addbtn");
    } else {
      setbtnState("addbtnfalse");
    }
  };

  const patchClick = async (e) => {
    e.preventDefault();
    const data = {
      title: title,
      content,
    };
    try {
      await patchArticle(id, data);
      closeModal();
    } catch (e) {
      console.log(e);
    }
    // router.reload();
  };
  if (!isOpen) {
    return null; // 모달이 열려있지 않으면 아무것도 렌더링하지 않음
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <div className={styles.sss}>
          <Image
            onClick={closeModal}
            src="/deleteImg.svg"
            width={24}
            height={24}
          ></Image>
        </div>
        <div>
          <form onSubmit={patchClick} className={styles.Modalform}>
            <p>게시글 제목</p>
            <textarea
              className={styles.InputTitle}
              type="text"
              placeholder="수정할 제목을 입력해주세요"
              onChange={titleHandle}
            ></textarea>
            <p>게시글 내용</p>
            <textarea
              className={styles.InputContent}
              type="text"
              placeholder="수정할 내용을 입력해주세요"
              onChange={contentHandle}
            ></textarea>
            {btnState === "addbtn" ? (
              <button className={styles.addbtn}>수정</button>
            ) : (
              <button
                onClick={(e) => e.preventDefault()}
                className={styles.addbtnfalse}
              >
                수정
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;

// 사용법
// import Modal from "./component/modal.js";
// const [isModalOpen, setIsModalOpen] = useState(false);
//   const openModal = () => {
//     setIsModalOpen(true);
//   };
//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//<Modal isOpen={isModalOpen} closeModal={closeModal}>
// <>
// <div id="modal-title">
//  <p>기업에 투자하기</p> // <- 여기에 내용 작성해서 CSS 설정하세요
//  <div>투자 기업 정보</div> //  <- 여기에 내용 작성해서 CSS 설정하세요
// </div>
// </>
//</Modal>
