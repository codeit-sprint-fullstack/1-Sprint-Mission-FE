'use client';
import styles from '@shared/components/inputs/Input.module.css';
import classNames from 'classnames';
import Image from 'next/image';

/**type, label, name, option, placeholder, onChange, visibility */
export default function Input({ page, option, visibility, onClick, ...props }) {
  const inputClass = classNames({
    [styles[page]]: page,
  });

  const inputs = {
    textarea: <textarea className={inputClass} {...props} />,
    normal: <input className={inputClass} {...props} />,
    password: (
      <div className={styles[`password-container-${page}`]}>
        <input
          className={inputClass}
          type={visibility ? 'text' : 'password'}
          {...props}
        />
        {visibility ? (
          <div className={styles['visibility-on']} onClick={onClick}>
            <Image src={'/visibility-on.svg'} fill />
          </div>
        ) : (
          <div className={styles['visibility-off']} onClick={onClick}>
            <Image src={'/visibility-off.svg'} fill />
          </div>
        )}
      </div>
    ),
  };

  const input = inputs[option];

  return <div className={styles['input-container']}>{input}</div>;
}
