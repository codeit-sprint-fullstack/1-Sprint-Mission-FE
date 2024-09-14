import styles from './Container.module.css';

// Container component
// 각 페이지의 너비를 설정한다.
// size가 존재하면 size의 값으로 padding 설정한다.
// size가 없으면 container.module.css에 설정된 padding 사이즈가 적용된다.

// export default function Container({ size, children }) {
//   return (
//     <div className={styles.container} style={size ? { padding: size } : {}}>
//       {children}
//     </div>
//   );
// }

export default function Container({ className = '', children }) {
  const classNames = `${styles.container} ${className}`;
  return <div className={classNames}>{children}</div>;
}
