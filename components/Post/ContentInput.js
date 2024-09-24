import styles from '@/styles/ArticleFormFields.module.css';

export default function ContentInput({ values, onChange }) {
  return (
    <>
      <div className={styles.sectionTitle}>상품 소개</div>
      <textarea
        name='content'
        placeholder='내용을 입력해 주세요 '
        value={values.content}
        onChange={onChange}
        className={styles.contentInput}
      />
    </>
  );
}
