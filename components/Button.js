import styles from '@/components/Button.module.css';
import { checkCustomRoutes } from 'next/dist/lib/load-custom-routes';

// Button component
// 각 페이지에서 사용되는 버튼
// prop으로 name을 내려받는다.

export default function Button({ className = '', children, name, ...props }) {
  const classNames = `${styles.button} ${className}`;
  return (
    <button className={classNames} {...props}>
      {name ? name : children}
    </button>
  );
}
