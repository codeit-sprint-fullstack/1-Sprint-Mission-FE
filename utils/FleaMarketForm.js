import styles from '@/styles/ArticleFormFields.module.css';
import Button from './Button.js';
import FileInput from '../components/FleaMarket/FileInput.js';
import tagRemove from '@/public/ic_tag_delete.png';
import Image from 'next/image.js';

export default function FleaMarketForm({ title, button, content }) {
  const onChange = (name) => (event) => {
    const value = event.target.value;

    content.setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    button.setCanSubmit(
      content.values.title.trim() !== '' &&
        content.values.content.trim() !== '' &&
        content.values.price.trim() !== ''
    );
  };

  const removeTags = (indexToRemove) => {
    const filter = content.tags.filter((el, index) => index !== indexToRemove);
    content.setTags(filter);
  };

  const addTags = (event) => {
    const inputVal = event.target.value;
    if (
      event.key === 'Enter' &&
      inputVal !== '' &&
      !content.tags.includes(inputVal)
    ) {
      content.setTags([...content.tags, inputVal]);
      event.target.value = '';
    }
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
          name='title'
          placeholder='상품명을 입력해 주세요'
          value={content.values.title}
          onChange={onChange('title')}
          className={styles.titleInput}
        />
        <div className={styles.sectionTitle}>상품 소개</div>
        <textarea
          name='content'
          placeholder='내용을 입력해 주세요 '
          value={content.values.content}
          onChange={onChange('content')}
          className={styles.contentInput}
        />
        <div className={styles.sectionTitle}>이미지</div>
        <FileInput
          value={content.values.image}
          setValues={content.setValues}
          onChange={onChange('imges')}
          className={styles.fileInput}
        />
        <div className={styles.sectionTitle}>판매가격</div>
        <input
          name='price'
          placeholder='판매 가격을 입력해 주세요'
          type='number'
          value={content.values.price}
          onChange={onChange('price')}
          className={styles.titleInput}
        />
        <div className={styles.sectionTitle}>태그</div>
        <input
          className={styles.titleInput}
          type='text'
          onKeyUp={(e) => {
            {
              addTags(e);
            }
          }}
          placeholder='태그를 입력하세요'
        />
        <ul id='tags'>
          {content.tags.map((tag, index) => (
            <li key={index} className={styles.hashtags}>
              <span className={styles.hashtagTitle}>{tag}</span>
              <Image
                src={tagRemove}
                alt='remove_tag'
                className={styles.removeIcon}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
