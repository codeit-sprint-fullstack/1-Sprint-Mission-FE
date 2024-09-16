import { forwardRef } from "react";
import Button from "./Button";
import styles from "./Modal.module.scss";
import { createPortal } from "react-dom";

function Modal({ msg, onClose }, ref) {
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
    document.getElementById("portal-root")
  );
}

export default forwardRef(Modal);
