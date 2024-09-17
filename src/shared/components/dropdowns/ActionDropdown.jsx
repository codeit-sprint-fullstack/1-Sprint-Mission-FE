'use client';
import Image from 'next/image';
import styles from '@shared/components/dropdowns/ActionDropdown.module.css';
import { useState } from 'react';
import DeleteButton from '../Buttons/CRUDButtons/DeleteButton';
import { useCommentIdStore } from '@shared/store/article/commentId';
import ActionButton from '../Buttons/ActionButton';

export default function ActionDropdown({ id, option }) {
  const [dropdown, setDropdown] = useState(false);
  const { setCommentId } = useCommentIdStore();

  const toggle = () => {
    setDropdown(!dropdown);
    if (!dropdown) {
      setCommentId(id);
    }
  };

  return (
    <>
      <div className={styles['dropdown-container']}>
        <div className={styles['kebab-dropdown-image']} onClick={toggle}>
          <Image src={'/kebab-dropdown.svg'} fill />
        </div>
        {dropdown ? (
          <div className={styles['options']}>
            <ActionButton
              content={'수정하기'}
              style={'patch-button'}
              type={'article-patch'}
            />
            <DeleteButton
              content={'삭제하기'}
              type={'delete-button'}
              option={option}
            />
          </div>
        ) : null}
      </div>
    </>
  );
}
