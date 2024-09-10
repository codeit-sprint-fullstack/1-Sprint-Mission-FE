import styles from '@/styles/Post.module.css';

export default function ArticleFormFields({
  setCanSubmit,
  titleValue,
  setTitleValue,
  contentValue,
  setContentValue,
}) {
  const titleChange = (event) => {
    const value = event.target.value;
    setTitleValue(value);
    setCanSubmit(value.trim() !== '' && contentValue.trim() !== '');
  };

  const contentChange = (event) => {
    const value = event.target.value;
    setContentValue(value);
    setCanSubmit(value.trim() !== '' && titleValue.trim() !== '');
  };

  return (
    <>
      <div className={styles.sectionTitle}>제목</div>
      <input
        placeholder='제목을 입력하세요'
        value={titleValue}
        onChange={titleChange}
        className={styles.titleInput}
      />
      <div className={styles.sectionTitle}>내용</div>
      <textarea
        placeholder='내용을 입력하세요 '
        value={contentValue}
        onChange={contentChange}
        className={styles.contentInput}
      />
    </>
  );
}
