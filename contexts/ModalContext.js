import React, { createContext, useState, useContext } from "react";
import styles from "./Modal.module.css";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null);

  const showModal = (modalConfig) => {
    setModal(modalConfig);
  };

  const hideModal = () => {
    setModal(null);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {modal && (
        <ModalComponent
          isOpen={!!modal}
          onClose={hideModal}
          title={modal.title}
          content={modal.content}
          onConfirm={modal.onConfirm}
          confirmText={modal.confirmText}
          cancelText={modal.cancelText}
          customClass={modal.customClass}
        />
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("콘텍스트 밖에서 사용못함");
  }
  return context;
};

const ModalComponent = ({
  isOpen,
  onClose,
  content,
  onConfirm,
  confirmText = "확인",
  cancelText = "취소",
  customClass = "",
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={`${styles.modalContent} ${customClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalContentHug}>
          <img
            src="/images/ic_delete.svg"
            alt="delete_icon"
            className={styles.modalImage}
          />
          <p className={styles.modalBody}>{content}</p>
        </div>

        <div className={styles.modalActions}>
          <button onClick={onClose} className={styles.cancelButton}>
            {cancelText}
          </button>
          <button onClick={handleConfirm} className={styles.confirmButton}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalProvider;
