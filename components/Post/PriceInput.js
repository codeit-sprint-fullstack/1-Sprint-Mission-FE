import styles from '@/styles/ArticleFormFields.module.css';

export default function PriceInput({ values, onChange }) {
  return (
    <>
      <div className={styles.sectionTitle}>판매가격</div>
      <input
        name='price'
        placeholder='판매 가격을 입력해 주세요'
        type='number'
        value={values.price}
        onChange={onChange}
        className={styles.titleInput}
      />
    </>
  );
}
