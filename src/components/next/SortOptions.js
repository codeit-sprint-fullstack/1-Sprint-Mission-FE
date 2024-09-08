import React from 'react';
import styles from './SortOptions.module.css'; // CSS 모듈로 변경

const SortOptions = ({ setSortOrder }) => {
  const handleChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <select onChange={handleChange} className={styles.sortOptions}> {/* CSS 모듈 방식으로 변경 */}
      <option value="recent">최신순</option>
      <option value="popular">인기순</option>
    </select>
  );
};

export default SortOptions;

