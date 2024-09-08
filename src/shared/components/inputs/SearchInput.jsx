import Image from 'next/image';
import styles from '@shared/components/inputs/SearchInput.module.css';

export default function SearchInput({ placeholder, onChange }) {
  return (
    <div className={styles['search-container']}>
      <input
        className={styles['search-input']}
        placeholder={placeholder}
        onChange={onChange}
      />
      <div className={styles['search-image']}>
        <Image src={'/search.svg'} fill />
      </div>
    </div>
  );
}
