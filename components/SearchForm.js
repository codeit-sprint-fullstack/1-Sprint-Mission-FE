import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './SearchForm.module.css';
import Dropdown from './Dropdown';

export default function SearchForm({ onOrderChange }) {
  // SearchForm component
  // 검색 폼을 제공하는 컴포넌트
  // prop으로 initialValue를 받아 검색어의 초기값을 설정한다.
  // 검색어가 입력되면 state에 값이 업데이트되고, 폼이 제출될 때 해당 검색어를 포함한 상태로 게시판 페이지로 이동한다.(/freeboard?q=${query})
  // 검색어가 없을 경우, 게시판(/freeboard) 페이지로 이동한다.

  const router = useRouter();
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) {
      router.push('/freeboard');
      return;
    }
    router.push(`/freeboard?q=${value}`);
  };

  const handleOptionSelect = (selectedOption) => {
    const newOrder = selectedOption === '최신순' ? 'recent' : 'oldest';
    onOrderChange(newOrder); // 드롭다운에서 선택된 order 값 전달
  };

  const options = ['최신순', '오래된 순'];

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        className={styles.searchInput}
        name="q"
        value={value}
        placeholder="🔍︎ 검색할 상품을 입력해주세요"
        onChange={handleChange}
        autoComplete="off"
      />
      <Dropdown options={options} onOptionSelect={handleOptionSelect} />
    </form>
  );
}
