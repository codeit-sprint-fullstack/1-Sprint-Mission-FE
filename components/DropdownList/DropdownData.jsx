import styles from "@/styles/dropdown.module.css";

function DropdownData({ handleUpdate, handleDelete }) {
  const onUpdate = () => handleUpdate();
  const onDelete = () => handleDelete();

  return (
    <div className={styles.dropbox_list}>
      <button className={styles.first_drop} onClick={onUpdate}>
        수정
      </button>
      <button className={styles.last_drop} onClick={onDelete}>
        삭제
      </button>
    </div>
  );
}

export default DropdownData;
