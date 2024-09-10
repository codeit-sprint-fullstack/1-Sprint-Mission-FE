import Button from '@/components/Button';
import styles from './CreatePostButton.module.css';

export default function CreatePostButton({ isFormValid }) {
  return (
    <div className={styles.container}>
      <h3>게시글 쓰기</h3>
      <Button name="등록" className={styles.button} disabled={!isFormValid} />
    </div>
  );
}
