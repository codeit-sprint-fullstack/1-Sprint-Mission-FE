import Dropdown from './Dropdown.js';
import styles from './ProductListHeader.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function ProductListHeader({ performSearch, handleOrderbyChange, orderBy }) {
  const handleInputChange = (event) => {
    const newKeyword = event.target.value;
    performSearch(newKeyword);
  };

  return (
    <>
      <div className={styles.productHeader}>
        <p className={styles.text}>판매중인 상품</p>
        <div className={styles.productControls}>
          <FontAwesomeIcon
            className={styles.productControlsIcon}
            icon={faMagnifyingGlass}
          />
          <input
            name='search'
            type='text'
            onChange={handleInputChange}
            placeholder='검색할 상품을 입력해 주세요'
          />
          <button className={styles.productControlsButton} type='submit'>
            상품 등록하기
          </button>
          <Dropdown onOrderChange={handleOrderbyChange} sortOption={orderBy} />
        </div>
      </div>
    </>
  );
}

export default ProductListHeader;
