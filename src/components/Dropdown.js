import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import styles from './Dropdown.module.css';

import { useState } from 'react';

function Dropdown({ onOrderChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const click = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleSortChange = (orderBy) => {
    onOrderChange(orderBy);
  };

  return (
    <>
      <div onClick={click}>
        <div className={styles.control}>
          <p className={styles.controlText}>최신순</p>
          <FontAwesomeIcon className={styles.controlIcon} icon={faCaretDown} />
        </div>

        {isOpen && (
          <div className={styles.dropbox}>
            <div
              className={styles.dropboxFirst}
              onClick={() => handleSortChange('recent')}
              id='recent'
            >
              최신순
            </div>
            <div
              className={styles.dropboxTwice}
              onClick={() => handleSortChange('favorite')}
              value='favorite'
            >
              좋아요순
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Dropdown;
