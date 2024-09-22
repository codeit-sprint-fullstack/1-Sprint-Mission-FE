import styles from '@/styles/ArticleFormFields.module.css';
import Button from './Button.js';
import FileInput from '../components/FleaMarket/FileInput.js';

export default function FleaMarketForm({ title, button, content }) {
  const titleChange = (event) => {
    const value = event.target.value;
    content.setTitleValue(value);
    button.setCanSubmit(
      value.trim() !== '' &&
        content.contentValue.trim() !== '' &&
        content.priceValue.trim() !== ''
    );
  };

  const contentChange = (event) => {
    const value = event.target.value;
    content.setContentValue(value);
    button.setCanSubmit(
      value.trim() !== '' &&
        content.titleValue.trim() !== '' &&
        content.priceValue.trim() !== ''
    );
  };

  const priceChange = (event) => {
    const value = event.target.value;
    content.setPriceValue(value);
    button.setCanSubmit(
      value.trim() !== '' &&
        content.contentValue.trim() !== '' &&
        content.titleValue.trim() !== ''
    );
  };

  const tagsChange = (event) => {
    const value = event.target.value;
    content.setTagsValue(value);
  };

  const handleChange = (value) => {
    content.setImageValue(value);
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
        <div className={styles.sectionTitle}>상품명</div>
        <input
          placeholder='상품명을 입력해 주세요'
          value={content.titleValue}
          onChange={titleChange}
          className={styles.titleInput}
        />
        <div className={styles.sectionTitle}>상품 소개</div>
        <textarea
          placeholder='내용을 입력해 주세요 '
          value={content.contentValue}
          onChange={contentChange}
          className={styles.contentInput}
        />
        <div className={styles.sectionTitle}>이미지</div>
        <FileInput value={content.imageValue} onChange={handleChange} />
        <div className={styles.sectionTitle}>판매가격</div>
        <input
          placeholder='판매 가격을 입력해 주세요'
          type='number'
          value={content.priceValue}
          onChange={priceChange}
          className={styles.titleInput}
        />
        <div className={styles.sectionTitle}>태그</div>
        <input
          placeholder='태그를 입력해 주세요'
          value={content.tagsValue}
          onChange={tagsChange}
          className={styles.titleInput}
        />
      </div>
    </>
  );
}
