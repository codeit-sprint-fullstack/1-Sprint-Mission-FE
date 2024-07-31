import searchIcon from '../assets/ic_search.svg';
import './SearchBar.css';

export default function SearchBar({ searchValue, onChange }) {
  return (
    <div className='Search'>
      <img src={searchIcon} alt='search icon' className='search-icon' />
      <input
        placeholder='검색할 상품을 입력해주세요'
        name='search'
        value={searchValue}
        onChange={onChange}
      />
    </div>
  );
}
