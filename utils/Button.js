import styles from '@/styles/Button.module.css';

export default function Button({ disabled, onClick, label }) {
  return (
    <>
      <button
        disabled={disabled}
        className={!disabled ? styles.submitBtn : styles.btn}
        onClick={onClick}
        type='button'
      >
        {label}
      </button>
    </>
  );
}
