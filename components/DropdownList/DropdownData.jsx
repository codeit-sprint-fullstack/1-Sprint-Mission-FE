import styles from "@/styles/dropdown.module.css";

function DropdownData({ onUpdate, onDelete }) {
  const handleUpdate = () => onUpdate();
  const handleDelete = () => onDelete();

  return (
    <div className={styles.dropbox_list}>
      <button className={styles.first_drop} onClick={handleUpdate}>
        수정하기
      </button>
      <button className={styles.last_drop} onClick={handleDelete}>
        삭제하기
      </button>
    </div>
  );
}

export default DropdownData;
