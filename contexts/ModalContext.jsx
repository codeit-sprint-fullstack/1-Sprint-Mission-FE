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
          showCancel={modal.showCancel}
          showImage={modal.showImage}
          imageSrc={modal.imageSrc}
          mode={modal.mode}
        />
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Provider 밖에선 사용 안됨");
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
  showCancel = false,
  showImage = true,
  imageSrc = "/images/ic_delete.svg",
  mode = "error",
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  const modeClass = styles[mode] || "";

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={`${styles.modalContent} ${modeClass} ${customClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalContentHug}>
          {showImage && (
            <img
              src={imageSrc}
              alt="modal_icon"
              className={styles.modalImage}
            />
          )}
          <p className={styles.modalBody}>{content}</p>
        </div>

        <div className={styles.modalActions}>
          {showCancel && (
            <button onClick={onClose} className={styles.cancelButton}>
              {cancelText}
            </button>
          )}
          <button onClick={handleConfirm} className={styles.confirmButton}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalProvider;
