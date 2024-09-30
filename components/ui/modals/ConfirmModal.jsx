import { forwardRef } from "react";
import styles from "./Modal.module.scss";
import { createPortal } from "react-dom";

function ConfirmModal({ msg, onClose, onConfirm }, ref) {
  return createPortal(
    <dialog ref={ref} className={styles.ConfirmModal}>
      <p className={styles["modal-msg"]}>{msg}</p>
      <div className={styles["btns"]}>
        <button
          variant="primary"
          className={styles["btns-cancel"]}
          onClick={onClose}
          type="button"
        >
          <span>취소</span>
        </button>
        <button
          variant="primary"
          className={styles["btns-delete"]}
          onClick={onConfirm}
          type="button"
        >
          <span>네</span>
        </button>
      </div>
    </dialog>,
    document.getElementById("portal-root")
  );
}

export default forwardRef(ConfirmModal);
