import styles from '@/styles/DropDown.module.css';

export default function DropDown({ firstAction, secondAction }) {
  return (
    <>
      <div className={styles.dropDown}>
        <div
          className={
            firstAction.label === '최신순'
              ? styles.dropDownRecent
              : styles.dropDownEdit
          }
          onClick={firstAction.onClickHandler}
        >
          {firstAction.label}
        </div>
        <div
          className={
            firstAction.label === '최신순'
              ? styles.dropDownFavorite
              : styles.dropDownDelete
          }
          onClick={secondAction.onClickHandler}
        >
          {secondAction.label}
        </div>
      </div>
    </>
  );
}
