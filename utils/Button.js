import styles from '@/styles/Button.module.css';

export function CommentButton({ disabled, onClick, label }) {
  return (
    <>
      <div className={styles.buttonLayout}>
        <button
          disabled={disabled}
          className={!disabled ? styles.commentSubmitBtn : styles.commentBtn}
          onClick={onClick}
          type='button'
        >
          {label}
        </button>
      </div>
    </>
  );
}

export function ArticleButton({ disabled, onClick, label }) {
  return (
    <>
      <div className={styles.buttonLayout}>
        <button
          disabled={disabled}
          className={!disabled ? styles.articleSubmitBtn : styles.articleBtn}
          onClick={onClick}
          type='button'
        >
          {label}
        </button>
      </div>
    </>
  );
}
