import './searchform.css';
import searchBtn from '../../../assets/images/ic_search.png';
import { useState } from 'react';

function SearchForm({ setSearchQuery, setCurrentPage }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(inputValue);
    setCurrentPage(1);
  };

  return (
    <form className="searchForm" onSubmit={handleSubmit}>
      <img src={searchBtn} alt="searchBtn" className="searchBtn" onClick={handleSubmit} />
      <input type="text" placeholder="검색할 상품을 입력해주세요" className="searchInput" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
    </form>
  );
}

export default SearchForm;
