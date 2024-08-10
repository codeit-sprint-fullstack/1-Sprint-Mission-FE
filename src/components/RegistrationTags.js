import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './RegistrationTags.module.css';

function RegistrationTags({ handleInputChange, initialValues, errors }) {
  const [tags, setTags] = useState(initialValues.tags);

  const removeTags = (indexToRemove) => {
    const filter = tags.filter((el, index) => index !== indexToRemove);
    setTags(filter);
  };

  const addTags = (event) => {
    const inputVal = event.target.value;
    if (inputVal.length <= 5) {
      if (
        event.key === 'Enter' &&
        inputVal !== '' &&
        !tags.includes(inputVal)
      ) {
        setTags([...tags, inputVal]);
        event.target.value = '';
      }
    }
  };

  return (
    <div>
      <p className={styles.font}>태그</p>
      <ul className={styles.tags}>
        <input
          className={errors.tags ? styles.errorTag : styles.input}
          name='tags'
          onChange={handleInputChange}
          onKeyUp={(e) => {
            {
              addTags(e);
            }
          }}
          placeholder='태그를 입력해 주세요'
        />
        {errors.tags && <p className={styles.error}>{errors.tags}</p>}
        <div className={styles.tagList}>
          {tags.map((tag, i) => (
            <li key={i} className={styles.tag}>
              <span>#{tag}</span>
              <span onClick={() => removeTags(i)}>
                <FontAwesomeIcon
                  className={styles.tagIcon}
                  icon={faCircleXmark}
                />
              </span>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}

export default RegistrationTags;
