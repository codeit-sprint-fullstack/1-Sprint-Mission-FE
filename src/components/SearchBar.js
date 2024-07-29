import searchIcon from '../assets/ic_search.svg';
import './SearchBar.css';

export default function SearchBar({ search, setSearch, onClick }) {
  return (
    <div className='Search'>
      <img src={searchIcon} alt='search icon' className='search-icon' />
      <input
        placeholder='검색할 상품을 입력해주세요'
        name='search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        className='search-button'
        type='submit'
        onClick={() => {
          onClick();
        }}
      >
        상품 검색하기
      </button>
    </div>
  );
}
