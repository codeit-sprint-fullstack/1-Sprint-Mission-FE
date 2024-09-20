'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@features/Nav.module.css';
import ActionButton from 'src/shared/components/Buttons/ActionButton';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav>
      <div className={styles.nav}>
        <div className={styles.container}>
          <div className={styles.links}>
            <Link href={'/'}>
              <Image
                src="/logo.svg"
                width={153}
                height={51}
                alt="판다마켓로고"
              />
            </Link>
            <div className={styles.article}>
              <Link
                href={'/articles'}
                className={
                  pathname === '/articles' ? styles.active : styles.inactive
                }
              >
                자유게시판
              </Link>
            </div>
            <div className={styles.market}>
              <Link href={'/'} className={styles.inactive}>
                중고마켓
              </Link>
            </div>
          </div>
          <ActionButton content={'로그인'} style={'login-button'} />
        </div>
      </div>
    </nav>
  );
}
