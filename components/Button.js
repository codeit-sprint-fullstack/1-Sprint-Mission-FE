import styles from '@/components/Button.module.css';

export default function Button({ name }) {
  return <button className={styles.button}>{name}</button>;
}
