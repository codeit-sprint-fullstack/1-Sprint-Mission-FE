import Image from 'next/image';
import styles from '@app/(no-layout)/login/page.module.css';
import Link from 'next/link';
import FormFooter from '@shared/components/Forms/FormFooter';
import LoginForm from '@shared/components/Forms/LoginForm';

export default function Login() {
  return (
    <div className={styles['container']}>
      <Link href={'/'}>
        <div className={styles['logo']}>
          <Image src={'/logo.svg'} fill />
        </div>
      </Link>
      <LoginForm />
      <FormFooter
        content={'판다마켓이 처음이신가요?'}
        linkContent={'회원가입'}
        path={'/signup'}
      />
    </div>
  );
}
