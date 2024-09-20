import styles from './Textarea.module.css';

export default function Textarea({ className = '', ...props }) {
  const classNames = `${styles.textarea} ${className}`;
  return <input className={classNames} {...props} />;
}
