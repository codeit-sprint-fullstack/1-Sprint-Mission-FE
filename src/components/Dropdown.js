import { useState } from 'react';
import styles from './Dropdown.module.css';
import MobileArrow from '../img/mobile_arrow.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

function Dropdown({ onOrderChange, sortOption }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sortOption, setSortOption] = useState('recent');

  const click = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleSortChange = (orderBy) => {
    onOrderChange(orderBy);
    setSortOption(orderBy);
  };

  return (
    <>
      <div onClick={click}>
        <div className={styles.control}>
          <p className={styles.controlText}>
            {sortOption === 'recent' ? '최신순' : '좋아요순'}
          </p>
          <FontAwesomeIcon className={styles.controlIcon} icon={faCaretDown} />
          <img
            src={MobileArrow}
            className={styles.arrowIcon}
            alt='드롭다운화살표'
          />
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
              className={styles.dropboxLast}
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
