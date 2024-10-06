import Image from 'next/image';
import styles from '@app/(no-layout)/login/page.module.css';
import Link from 'next/link';
import FormFooter from '@shared/components/Forms/FormFooter';
import SignupForm from '@shared/components/Forms/SignupForm';

export default function Signup() {
  return (
    <div className={styles['container']}>
      <Link href={'/'}>
        <div className={styles['logo']}>
          <Image src={'/logo.svg'} fill />
        </div>
      </Link>
      <SignupForm />
      <FormFooter
        content={'이미 회원이신가요?'}
        linkContent={'로그인'}
        path={'/login'}
      />
    </div>
  );
}
