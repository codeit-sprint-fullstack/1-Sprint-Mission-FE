import styles from '@/components/Button.module.css';

// Button component
// 각 페이지에서 사용되는 버튼
// prop으로 name과 size를 내려받는다.
// size는 inline style로 패딩에 적용된다. 값이 존재할 경우 버튼 크기를 변경한다.

export default function Button({ className = '', name, ...props }) {
  const classNames = `${styles.button} ${className}`;
  return (
    <button className={classNames} {...props}>
      {name}
    </button>
  );
}
