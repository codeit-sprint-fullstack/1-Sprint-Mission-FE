'use client';
import Image from 'next/image';
import styles from '@shared/components/dropdowns/ActionDropdown.module.css';
import { useState } from 'react';

export default function ActionDropdown(onClick) {
  const [dropdown, setDropdown] = useState(false);

  const handleDropdownClick = () => {
    if (dropdown) {
      setDropdown(false);
    } else setDropdown(true);
  };

  return (
    <>
      <div className={styles['dropdown-container']}>
        <div
          className={styles['kebab-dropdown-image']}
          onClick={handleDropdownClick}
        >
          <Image src={'/kebab-dropdown.svg'} fill />
        </div>
        {dropdown ? (
          <div className={styles['options']}>
            <button className={styles['patch']} onClick={onClick}>
              수정하기
            </button>
            <button className={styles['delete']} onClick={onClick}>
              삭제하기
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
}
