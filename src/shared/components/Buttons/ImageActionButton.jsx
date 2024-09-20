'use client';
import classNames from 'classnames';
import styles from '@shared/components/Buttons/ImageActionButton.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ImageActionButton({ content, type, disabled }) {
  const router = useRouter();

  const buttonClass = classNames({
    [styles['return-arrow-button']]: type === 'return', //목록으로 돌아가기
    [styles['disabled']]: disabled,
  });

  const handleGoBack = () => {
    router.back();
  };

  const Button = () => {
    if (type === 'return') {
      return (
        <button className={buttonClass} onClick={handleGoBack}>
          {content}
          <div className={styles['return-arrow']}>
            <Image src={'/return-arrow.svg'} fill />
          </div>
        </button>
      );
    } else {
      return (
        <button className={buttonClass} disabled={disabled} onClick={onClick}>
          {content}
        </button>
      );
    }
  };

  return <Button />;
}
