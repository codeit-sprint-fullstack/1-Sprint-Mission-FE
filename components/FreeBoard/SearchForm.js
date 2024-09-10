import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import searchIcon from '@/public/ic_search.png';
import styles from '@/styles/SearchForm.module.css';
import Image from 'next/image';

export default function SearchForm({ keyword }) {
  const router = useRouter();
  const [value, setValue] = useState(keyword || '');

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!value) {
      router.push('/freeboard');
      return;
    }
    router.push(`/freeboard?keyword=${value}`);
  }

  useEffect(() => {
    setValue(keyword || '');
  }, [keyword]);

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.submit}>
        <Image src={searchIcon} alt='검색 아이콘' className={styles.icon} />
        <input
          name='keyword'
          value={value}
          onChange={handleChange}
          placeholder='검색어를 입력해 주세요'
          className={styles.searchInput}
        />
      </form>
    </>
  );
}
