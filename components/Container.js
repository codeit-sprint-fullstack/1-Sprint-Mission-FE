import styles from './Container.module.css';

export default function Container({ size, children }) {
  return (
    <div className={styles.container} style={size ? { padding: size } : {}}>
      {children}
    </div>
  );
}
