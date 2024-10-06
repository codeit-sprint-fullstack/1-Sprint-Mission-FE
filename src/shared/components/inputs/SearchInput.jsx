import Image from 'next/image';
import styles from '@shared/components/inputs/SearchInput.module.css';
import classNames from 'classnames';

export default function SearchInput({ page, ...props }) {
  const inputClass = classNames({
    [styles[page]]: page,
  });
  return (
    <div className={styles['search-container']}>
      <input className={inputClass} {...props} />
      <div className={styles['search-image']}>
        <Image src={'/search.svg'} fill />
      </div>
    </div>
  );
}
