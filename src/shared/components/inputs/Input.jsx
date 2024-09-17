import styles from '@shared/components/inputs/Input.module.css';
import classNames from 'classnames';

export default function Input({ placeholder, type, onChange, label, name }) {
  const inputClass = classNames({
    [styles[`text-input-${label}`]]: type === 'text',
    [styles[`textarea-input-${label}`]]: type === 'textarea',
    [styles[`password-input-${label}`]]: type === 'password',
  });

  return (
    <div className={styles['input-container']}>
      {type === 'textarea' ? (
        <textarea
          name={name}
          className={inputClass}
          placeholder={placeholder}
          onChange={onChange}
        />
      ) : (
        <input
          name={name}
          type={type}
          className={inputClass}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}
    </div>
  );
}
