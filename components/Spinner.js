import Image from 'next/image';
import spinnerImg from '@/public/spinner.svg';
import styles from './Spinner.module.css';

export default function Spinner({ className = '' }) {
  return (
    <div className={styles.spinnerContainer}>
      <Image
        className={`${styles.spinner} ${className}`}
        src={spinnerImg}
        width={45}
        height={45}
        alt="로딩 중...."
      />
    </div>
  );
}
