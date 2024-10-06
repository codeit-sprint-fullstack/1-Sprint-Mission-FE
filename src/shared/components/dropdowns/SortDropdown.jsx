import Image from 'next/image';
import styles from '@shared/components/dropdowns/SortDropdown.module.css';

export default function SortDropdown({ content }) {
  return (
    <div className={styles['dropdown-container']}>
      <div className={styles['dropdown-content']}>
        {content}
        <div className={styles['dropdown-image']}>
          <Image src={'/arrow-down.svg'} fill />
        </div>
      </div>
    </div>
  );
}
