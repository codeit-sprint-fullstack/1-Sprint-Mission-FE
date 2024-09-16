import { forwardRef } from "react";
import Button from "./Button";
import styles from "./Modal.module.scss";
import { createPortal } from "react-dom";

const Modal = forwardRef(({ msg, onClose }, ref) => {
  return createPortal(
    <dialog ref={ref} className={styles.Modal}>
      <p className={styles["Modal-msg"]}>{msg}</p>
      <Button
        variant="primary"
        className={styles["Modal-btn"]}
        onClick={onClose}
      >
        <span>확인</span>
      </Button>
    </dialog>,
    document.body
  );
});

Modal.displayName = "Modal";

export default Modal;
