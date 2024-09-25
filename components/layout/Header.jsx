import Nav from "./Nav";
import styles from "./Header.module.scss";
import Link from "next/link";
import Button from "../ui/Button";
import { usePathname } from "next/navigation";
import logo from "../../public/assets/logo.svg";
import Image from "next/image";
import { useAuth } from "@/context/AuthProvider";

export function LoginHeader() {
  return (
    <header className={styles.AuthHeader}>
      <Link href="/">
        <div className={styles.logo}>
          <Image src={logo} width={396} height={132} alt="panda market logo" />
        </div>
      </Link>
    </header>
  );
}

export default function Header() {
  const pathname = usePathname();
  const { user } = useAuth();
  const isLoginHeader = pathname.includes("/auth");

  if (isLoginHeader) {
    return <LoginHeader />;
  }

  if (user) {
    return;
  }

  const pages = [
    { label: "자유게시판", path: "/forum" },
    { label: "중고마켓", path: "/products" },
  ];
  return (
    <header className={styles.Header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link href="/">
            <div className={styles.logo}></div>
          </Link>
          <Nav links={pages} />
        </div>

        {!user && (
          <Button>
            <Link href="/auth/login">로그인</Link>
          </Button>
        )}
        {user && (
          <Link className={styles.userProfile} href="/my-page">
            <Image src={user.image} className={styles.userImg} />
            <span className={styles.userName}>{user.nickname}</span>
          </Link>
        )}
      </div>
    </header>
  );
}
