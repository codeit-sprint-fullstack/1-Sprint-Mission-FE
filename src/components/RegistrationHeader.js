import styles from './RegistrationHeader.module.css';

function RegistrationHeader({ isSubmitting, handleSubmit, submittingError }) {
  // const handleSubmit = () => {
  //   navigate('/pro');
  // };

  return (
    <div className={styles.registrationFormHeader}>
      <p>상품 등록하기</p>
      <button
        disabled={isSubmitting}
        className={isSubmitting ? styles.button : styles.activeButton}
        type='button'
        onClick={handleSubmit}
      >
        등록
      </button>
      {submittingError && <div>{submittingError.message}</div>}
    </div>
  );
}

export default RegistrationHeader;
