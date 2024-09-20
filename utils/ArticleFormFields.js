import styles from '@/styles/ArticleFormFields.module.css';
import Button from './Button.js';

export default function ArticleFormFields({ title, button, content }) {
  const titleChange = (event) => {
    const value = event.target.value;
    content.setTitleValue(value);
    button.setCanSubmit(
      value.trim() !== '' && content.contentValue.trim() !== ''
    );
  };

  const contentChange = (event) => {
    const value = event.target.value;
    content.setContentValue(value);
    button.setCanSubmit(
      value.trim() !== '' && content.titleValue.trim() !== ''
    );
  };

  return (
    <>
      <div className={styles.postLayout}>
        <div className={styles.header}>
          <span className={styles.title}>{title.label}</span>
          <Button
            disabled={button.disabled}
            label={button.label}
            onClick={button.onClick}
          />
        </div>
        <div className={styles.sectionTitle}>제목</div>
        <input
          placeholder='제목을 입력하세요'
          value={content.titleValue}
          onChange={titleChange}
          className={styles.titleInput}
        />
        <div className={styles.sectionTitle}>내용</div>
        <textarea
          placeholder='내용을 입력하세요 '
          value={content.contentValue}
          onChange={contentChange}
          className={styles.contentInput}
        />
      </div>
    </>
  );
}
