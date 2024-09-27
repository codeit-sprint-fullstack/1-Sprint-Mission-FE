import styles from '@/styles/ArticleFormFields.module.css';
import Image from 'next/image.js';
import tagRemoveIcon from '@/public/ic_tag_delete.png';

export default function TagsInput({ tags, setTags }) {
  const removeTags = (indexToRemove) => {
    const filter = tags.filter((el, index) => index !== indexToRemove);
    setTags(filter);
  };

  const addTags = (event) => {
    const inputValue = event.target.value;
    if (
      event.key === 'Enter' &&
      inputValue !== '' &&
      !tags.includes(inputValue)
    ) {
      setTags([...tags, inputValue]);
      event.target.value = '';
    }
  };

  return (
    <>
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
        {tags.map((tag, index) => (
          <li key={index} className={styles.hashtags}>
            <span className={styles.hashtagTitle}>{tag}</span>
            <Image
              src={tagRemoveIcon}
              onClick={() => removeTags(index)}
              alt='remove_tag'
              className={styles.removeIcon}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
